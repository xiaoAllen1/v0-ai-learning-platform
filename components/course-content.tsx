"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm" // Fixed import
import rehypeRaw from "rehype-raw"
import { Card } from "@/components/ui/card"

interface Course {
  slug: string
  title: string
  content: string
}

interface CourseIndex {
  slug: string
  title: string
}

interface CourseContentProps {
  course: Course
  courseIndex?: CourseIndex[]
}

export function CourseContent({ course, courseIndex = [] }: CourseContentProps) {
  const [localCourseIndex, setLocalCourseIndex] = useState<CourseIndex[]>(courseIndex)
  const [processedContent, setProcessedContent] = useState(course.content)
  const [mermaidLoaded, setMermaidLoaded] = useState(false)
  const articleRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handle URL fragment for scrolling to section
  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash

    if (hash) {
      // Remove the # character
      const id = hash.substring(1)

      // Add a slight delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          // Scroll to the element
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams, processedContent])

  // Handle click on internal anchor links
  const handleInternalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()

      // Get the target ID
      const id = href.substring(1)

      // Update the URL with the hash
      window.history.pushState({}, "", `${pathname}${href}`)

      // Add a slight delay to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }

  // Initialize mermaid
  useEffect(() => {
    let isMounted = true

    const initializeMermaid = async () => {
      if (typeof window === "undefined") return

      try {
        // Dynamically import mermaid to avoid SSR issues
        const mermaidModule = await import("mermaid").catch((err) => {
          console.error("Failed to load mermaid:", err)
          return null
        })

        if (!isMounted || !mermaidModule) return

        const mermaid = mermaidModule.default

        mermaid.initialize({
          startOnLoad: false, // We'll manually render
          theme: "neutral",
          securityLevel: "loose",
        })

        setMermaidLoaded(true)

        // Small delay to ensure DOM is ready
        setTimeout(() => {
          if (!isMounted) return

          try {
            mermaid
              .run({
                querySelector: ".mermaid",
              })
              .catch((err) => {
                console.warn("Non-critical mermaid rendering error:", err)
              })
          } catch (err) {
            console.warn("Non-critical mermaid rendering error:", err)
          }
        }, 300)
      } catch (err) {
        console.error("Error initializing mermaid:", err)
      }
    }

    initializeMermaid()

    return () => {
      isMounted = false
    }
  }, [processedContent])

  // Fetch course index and process content
  useEffect(() => {
    // If courseIndex is provided as a prop, use it directly
    if (courseIndex.length > 0) {
      setLocalCourseIndex(courseIndex)
      setProcessedContent(linkConcepts(course.content, courseIndex))
      return
    }

    // Otherwise fetch it from the API
    const fetchCourseIndex = async () => {
      try {
        const response = await fetch("/api/course-index")
        if (!response.ok) {
          throw new Error(`Failed to fetch course index: ${response.status}`)
        }
        const data = await response.json()
        setLocalCourseIndex(data)

        // Process content to link concepts
        if (data.length > 0) {
          setProcessedContent(linkConcepts(course.content, data))
        }
      } catch (error) {
        console.error("Error fetching course index:", error)
      }
    }

    fetchCourseIndex()
  }, [course.content, courseIndex])

  // Function to link concepts in the content
  const linkConcepts = (content: string, index: CourseIndex[]) => {
    // Find the "Linked Concepts" section
    const linkedConceptsMatch = content.match(/## Linked Concepts.*?\n([\s\S]*?)(?=\n##|$)/i)

    if (!linkedConceptsMatch || !linkedConceptsMatch[1]) {
      return content
    }

    const linkedConceptsSection = linkedConceptsMatch[0]
    const concepts = linkedConceptsMatch[1]
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.replace(/^[*-]\s*/, "").trim())

    // Create a modified section with links
    let modifiedSection = linkedConceptsSection

    concepts.forEach((concept) => {
      const matchingCourse = index.find((course) => course.title.toLowerCase() === concept.toLowerCase())

      if (matchingCourse) {
        const slug = matchingCourse.slug.replace(".md", "")
        const link = `[${concept}](/mini-courses/${slug})`
        // Replace the concept with a link, being careful about formatting
        modifiedSection = modifiedSection.replace(new RegExp(`([*-]\\s*)${concept}`, "i"), `$1${link}`)
      }
    })

    // Replace the original section with the modified one
    return content.replace(linkedConceptsSection, modifiedSection)
  }

  // Process anchor links in markdown to create proper HTML IDs
  useEffect(() => {
    // Add IDs to all headings and named anchors after the content is rendered
    const addIdsToHeadings = () => {
      // Find all headings
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      headings.forEach((heading) => {
        if (!heading.id) {
          // Create an ID from the heading text
          const id = heading.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove special chars
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .trim()

          if (id) heading.id = id
        }
      })

      // Find all named anchors and create corresponding IDs
      const namedAnchors = document.querySelectorAll("a[name]")
      namedAnchors.forEach((anchor) => {
        const name = anchor.getAttribute("name")
        if (name) {
          anchor.id = name
        }
      })
    }

    // Run after a short delay to ensure content is rendered
    const timer = setTimeout(addIdsToHeadings, 500)
    return () => clearTimeout(timer)
  }, [processedContent])

  // Custom renderer for code blocks to handle mermaid
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "")

      if (!inline && match && match[1] === "mermaid") {
        return (
          <div className="my-6">
            {mermaidLoaded ? (
              <div className="mermaid">{String(children).replace(/\n$/, "")}</div>
            ) : (
              <div className="p-4 bg-muted rounded-md text-center">
                <p className="text-muted-foreground">Loading diagram...</p>
              </div>
            )}
          </div>
        )
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    pre({ children }: any) {
      return <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4">{children}</pre>
    },
    table({ children }: any) {
      return (
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">{children}</table>
        </div>
      )
    },
    thead({ children }: any) {
      return <thead className="bg-muted">{children}</thead>
    },
    th({ children }: any) {
      return <th className="border px-4 py-2 text-left">{children}</th>
    },
    td({ children }: any) {
      return <td className="border px-4 py-2">{children}</td>
    },
    a({ node, children, href, ...props }: any) {
      // Handle in-page anchor links
      if (href?.startsWith("#")) {
        return (
          <a
            href={href}
            className="text-primary hover:underline"
            onClick={(e) => handleInternalLinkClick(e, href)}
            {...props}
          >
            {children}
          </a>
        )
      }

      // Handle internal navigation links
      if (href?.startsWith("/")) {
        return (
          <Link href={href} className="text-primary hover:underline" {...props}>
            {children}
          </Link>
        )
      }

      // Handle external links
      return (
        <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      )
    },
    h1({ children, ...props }: any) {
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
          {children}
        </h1>
      )
    },
    h2({ children, ...props }: any) {
      return (
        <h2 className="text-2xl font-bold mt-8 mb-4" {...props}>
          {children}
        </h2>
      )
    },
    h3({ children, ...props }: any) {
      return (
        <h3 className="text-xl font-bold mt-6 mb-3" {...props}>
          {children}
        </h3>
      )
    },
    p({ children }: any) {
      return <p className="my-4">{children}</p>
    },
    ul({ children }: any) {
      return <ul className="list-disc pl-6 my-4">{children}</ul>
    },
    ol({ children }: any) {
      return <ol className="list-decimal pl-6 my-4">{children}</ol>
    },
    li({ children }: any) {
      return <li className="my-1">{children}</li>
    },
    hr() {
      return <hr className="my-8 border-t border-border" />
    },
    blockquote({ children }: any) {
      return <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    },
  }

  return (
    <Card className="p-6 md:p-8">
      <article ref={articleRef} className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
          {processedContent}
        </ReactMarkdown>
      </article>
    </Card>
  )
}
