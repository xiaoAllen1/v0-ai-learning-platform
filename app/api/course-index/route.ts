import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "mini-courses", "index.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading course index:", error)
    return NextResponse.json({ error: "Failed to load course index" }, { status: 500 })
  }
}
