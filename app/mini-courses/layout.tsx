import type React from "react"
import Link from "next/link"

export default function MiniCoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link href="/" className="font-mono text-lg font-bold">
            AI<span className="text-primary">Dev</span>Hub
          </Link>
          <Link href="/mini-courses" className="text-foreground/70 hover:text-primary transition-colors">
            Mini Courses
          </Link>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="py-6 border-t border-border/40">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/50">
          © {new Date().getFullYear()} AIDevHub. Built by engineers, for engineers.
        </div>
      </footer>
    </div>
  )
}
