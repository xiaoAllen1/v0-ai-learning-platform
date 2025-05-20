import fs from "fs"
import path from "path"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

// Function to get all mini courses
async function getMiniCourses() {
  try {
    const filePath = path.join(process.cwd(), "mini-courses", "index.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading course index:", error)
    return []
  }
}

export default async function MiniCoursesPage() {
  const courses = await getMiniCourses()

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Mini Courses</h1>
        <p className="text-muted-foreground mb-8">
          Short, beginner-friendly lessons designed to teach one AI concept at a time.
        </p>

        {courses.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No courses available at the moment. Check back soon!</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {courses.map((course: { slug: string; title: string }) => (
              <Card key={course.slug} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {course.title}
                  </CardTitle>
                  <CardDescription>A concise introduction to {course.title.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Link href={`/mini-courses/${course.slug.replace(".md", "")}`} passHref>
                    <Button>Start Learning</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
