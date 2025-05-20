import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Course Not Found</h2>
      <p className="text-muted-foreground mb-8">Sorry, we couldn't find the course you're looking for.</p>
      <Link href="/mini-courses" passHref>
        <Button>Back to Courses</Button>
      </Link>
    </div>
  )
}
