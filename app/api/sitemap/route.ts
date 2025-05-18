import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "sitemap.xml")
    const sitemapContent = fs.readFileSync(filePath, "utf8")

    return new NextResponse(sitemapContent, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate sitemap" }, { status: 500 })
  }
}
