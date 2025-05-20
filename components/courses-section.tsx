"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { BookOpen, Code, Newspaper } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CoursesSection() {
  const { t } = useLanguage()

  const courses = [
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: t("courses.mini.title"),
      description: t("courses.mini.description"),
      status: t("courses.mini.status"),
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: t("courses.tutorials.title"),
      description: t("courses.tutorials.description"),
      status: t("courses.tutorials.status"),
    },
    {
      icon: <Newspaper className="h-10 w-10 text-primary" />,
      title: t("courses.digest.title"),
      description: t("courses.digest.description"),
      status: t("courses.digest.status"),
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border/50 transition-all hover:shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{course.icon}</div>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70 text-sm">{course.description}</CardDescription>
              </CardContent>
              <CardFooter>
                {index === 0 ? (
                  <Link href="/mini-courses">
                    <Button size="sm">Explore Courses</Button>
                  </Link>
                ) : (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {course.status}
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
