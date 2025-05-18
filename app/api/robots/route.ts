import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "robots.txt")
    const robotsContent = fs.readFileSync(filePath, "utf8")

    return new NextResponse(robotsContent, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate robots.txt" }, { status: 500 })
  }
}
