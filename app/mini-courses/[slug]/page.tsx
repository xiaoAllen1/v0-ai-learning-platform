import fs from "fs"
import path from "path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseContent } from "@/components/course-content"

// Function to get all mini courses
async function getMiniCourses() {
  const filePath = path.join(process.cwd(), "mini-courses", "index.json")
  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading index file: ${filePath}`, error)
    return []
  }
}

// Function to get a specific course by slug
async function getCourseBySlug(slug: string) {
  const courses = await getMiniCourses()

  // Find the course in the index
  const course = courses.find(
    (c: { slug: string }) => c.slug === `${slug}.md` || c.slug === slug || c.slug.replace(".md", "") === slug,
  )

  if (!course) {
    return null
  }

  // Ensure the file path has the .md extension
  const fileName = course.slug.endsWith(".md") ? course.slug : `${course.slug}.md`
  const filePath = path.join(process.cwd(), "mini-courses", fileName)

  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    return {
      ...course,
      content: fileContents,
    }
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error)

    // Try alternative path if the first attempt fails
    try {
      // If the first attempt failed and the slug doesn't have .md, try without it
      if (fileName.endsWith(".md")) {
        const alternativeFilePath = path.join(process.cwd(), "mini-courses", course.slug)
        const alternativeFileContents = fs.readFileSync(alternativeFilePath, "utf8")
        return {
          ...course,
          content: alternativeFileContents,
        }
      }
    } catch (alternativeError) {
      console.error(`Error reading alternative file path: ${alternativeError}`)
    }

    return null
  }
}

export async function generateStaticParams() {
  const courses = await getMiniCourses()

  return courses.map((course: { slug: string }) => ({
    slug: course.slug.replace(".md", ""),
  }))
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug)
  const courseIndex = await getMiniCourses()

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/mini-courses" passHref>
            <Button variant="ghost" className="pl-0">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>

        <Suspense fallback={<div>Loading course content...</div>}>
          <CourseContent course={course} courseIndex={courseIndex} />
        </Suspense>
      </div>
    </div>
  )
}
