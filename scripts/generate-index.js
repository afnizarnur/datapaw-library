#!/usr/bin/env node

/**
 * Generate Index Script for datapaw-library
 *
 * This script analyzes all data files in the repository
 * and creates a single index file that can be served statically.
 * This eliminates the need for multiple GitHub API calls.
 */

const fs = require("fs")
const path = require("path")

// Load environment variables from .env file if it exists (optional)
try {
  require("dotenv").config({ path: path.join(__dirname, "../.env") })
} catch (error) {
  // dotenv not installed, continue without it
}

const DATA_DIR = path.join(__dirname, "../data")

// Normalize authors to only include username and avatarUrl
function normalizeAuthors(fileAuthors, commitAuthor) {
  const fromFiles = Array.isArray(fileAuthors)
    ? fileAuthors
        .map((author) => {
          const username = author.githubUsername || author.login
          if (!username) return null
          return {
            githubUsername: String(username),
            avatarUrl:
              author.avatarUrl || `https://github.com/${String(username)}.png`,
          }
        })
        .filter(Boolean)
    : []

  if (fromFiles.length > 0) return fromFiles
  return commitAuthor ? [commitAuthor] : []
}

async function getFileMetadata(filePath) {
  // Get file stats for basic metadata
  const stats = fs.statSync(filePath)

  // Build repo relative path for GitHub API query
  const relativePath = path.relative(DATA_DIR, filePath)
  const githubPath = `data/${relativePath}`

  try {
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      throw new Error("GITHUB_TOKEN environment variable not set")
    }

    // Get file commits to find creation and last modification dates
    const commitsUrl = `https://api.github.com/repos/afnizarnur/datapaw-library/commits?path=${encodeURIComponent(
      githubPath
    )}&per_page=100`

    const response = await fetch(commitsUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Datapaw-Index-Generator",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const commits = await response.json()
    if (!Array.isArray(commits) || commits.length === 0) {
      throw new Error("No commits found for file")
    }

    // Last commit (most recent modification)
    const lastCommit = commits[0]
    const modifiedAt = lastCommit.commit?.author?.date

    // First commit (creation) - commits are in reverse chronological order
    const firstCommit = commits[commits.length - 1]
    const createdAt = firstCommit.commit?.author?.date

    const login = firstCommit.author?.login || "unknown"
    const avatarUrl =
      firstCommit.author?.avatar_url ||
      (login !== "unknown" ? `https://github.com/${login}.png` : "")

    const commitAuthor =
      login === "unknown"
        ? undefined
        : {
            githubUsername: login,
            avatarUrl,
          }

    return {
      createdAt,
      modifiedAt,
      size: stats.size,
      commitAuthor,
    }
  } catch (error) {
    // Fallback to file system timestamps only
    const createdAt =
      stats.birthtime.getTime() > 0 ? stats.birthtime : stats.ctime
    const modifiedAt = stats.mtime

    return {
      createdAt: createdAt.toISOString(),
      modifiedAt: modifiedAt.toISOString(),
      size: stats.size,
    }
  }
}

async function processImageDirectory(dirPath) {
  const results = []
  const dirName = path.basename(dirPath)

  try {
    const files = fs.readdirSync(dirPath)

    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        // Look for JSON file in the directory
        const jsonFile = files.find((f) => f.endsWith(".json"))
        if (jsonFile) {
          const jsonPath = path.join(dirPath, jsonFile)
          const fileData = JSON.parse(fs.readFileSync(jsonPath, "utf8"))
          const metadata = await getFileMetadata(jsonPath)

          // Update image URLs to be relative to the JSON file location
          if (fileData.data?.images) {
            fileData.data.images = fileData.data.images.map((image) => ({
              ...image,
              url: `${dirName}/${image.url}`,
            }))
          }

          results.push({
            id: `${dirName}-${Date.now()}`, // Generate unique ID
            name: fileData.name?.trim() || "",
            description: fileData.description?.trim() || "",
            datatype: fileData.datatype,
            isFeatured: fileData.isFeatured || false,
            authors: normalizeAuthors(fileData.authors, metadata.commitAuthor),
            metadata: {
              createdAt: metadata.createdAt,
              modifiedAt: metadata.modifiedAt,
            },
            githubUrl: `https://github.com/afnizarnur/datapaw-library/blob/main/data/image/${dirName}/${jsonFile}`,
            data: fileData.data,
            tags: (fileData.tags || []).map((tag) => tag.trim()),
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error processing image directory ${dirPath}:`, error.message)
  }

  return results
}

async function generateIndex() {
  console.log("🚀 Starting index generation...")

  try {
    const allData = []

    // Get all data directories
    const dataDirs = fs.readdirSync(DATA_DIR)

    for (const dirName of dataDirs) {
      const dirPath = path.join(DATA_DIR, dirName)
      const stat = fs.statSync(dirPath)

      if (!stat.isDirectory()) continue

      console.log(`📁 Processing ${dirName}...`)

      try {
        const files = fs.readdirSync(dirPath)

        if (dirName === "image") {
          // Special handling for image directories
          const imageData = await processImageDirectory(dirPath)
          allData.push(...imageData)
        } else {
          // Regular handling for other data types
          const jsonFiles = files.filter((file) => file.endsWith(".json"))

          for (const jsonFile of jsonFiles) {
            try {
              console.log(`  📄 Processing ${jsonFile}...`)

              const filePath = path.join(dirPath, jsonFile)
              const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"))
              const metadata = await getFileMetadata(filePath)

              allData.push({
                id: `${dirName}-${jsonFile.replace(".json", "")}`,
                name: fileData.name?.trim() || "",
                description: fileData.description?.trim() || "",
                datatype: fileData.datatype,
                isFeatured: fileData.isFeatured || false,
                authors: normalizeAuthors(
                  fileData.authors,
                  metadata.commitAuthor
                ),
                metadata: {
                  createdAt: metadata.createdAt,
                  modifiedAt: metadata.modifiedAt,
                },
                githubUrl: `https://github.com/afnizarnur/datapaw-library/blob/main/data/${dirName}/${jsonFile}`,
                data: fileData.data,
                tags: (fileData.tags || []).map((tag) => tag.trim()),
              })
            } catch (error) {
              console.error(`  ❌ Error processing ${jsonFile}:`, error.message)
            }
          }
        }
      } catch (error) {
        console.error(
          `❌ Error processing directory ${dirName}:`,
          error.message
        )
      }
    }

    // Create the index object
    const index = {
      generatedAt: new Date().toISOString(),
      totalItems: allData.length,
      data: allData,
      categories: [...new Set(allData.map((item) => item.datatype))],
      featured: allData.filter((item) => item.isFeatured),
    }

    // Write to file
    const outputPath = path.join(__dirname, "../index.json")
    fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))

    console.log(`✅ Index generated successfully!`)
    console.log(`📊 Total items: ${allData.length}`)
    console.log(`📁 Categories: ${index.categories.join(", ")}`)
    console.log(`⭐ Featured items: ${index.featured.length}`)
    console.log(`📄 Output: ${outputPath}`)

    return index
  } catch (error) {
    console.error("❌ Failed to generate index:", error.message)
    process.exit(1)
  }
}

// Run the script
generateIndex().catch((error) => {
  console.error("❌ Failed to generate index:", error)
  process.exit(1)
})
