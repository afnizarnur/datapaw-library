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

const DATA_DIR = path.join(__dirname, "../data")

function getFileMetadata(filePath) {
  // Get file stats for basic metadata
  const stats = fs.statSync(filePath)
  return {
    createdAt: stats.birthtime.toISOString(),
    modifiedAt: stats.mtime.toISOString(),
    size: stats.size,
  }
}

function processImageDirectory(dirPath) {
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
          const metadata = getFileMetadata(jsonPath)

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
            authors: fileData.authors || [
              {
                name: "Datapaw",
                githubUsername: "afnizarnur",
                avatarUrl: "https://github.com/afnizarnur.png",
              },
            ],
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

function generateIndex() {
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
          const imageData = processImageDirectory(dirPath)
          allData.push(...imageData)
        } else {
          // Regular handling for other data types
          const jsonFiles = files.filter((file) => file.endsWith(".json"))

          for (const jsonFile of jsonFiles) {
            try {
              console.log(`  📄 Processing ${jsonFile}...`)

              const filePath = path.join(dirPath, jsonFile)
              const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"))
              const metadata = getFileMetadata(filePath)

              allData.push({
                id: `${dirName}-${jsonFile.replace(".json", "")}`,
                name: fileData.name?.trim() || "",
                description: fileData.description?.trim() || "",
                datatype: fileData.datatype,
                isFeatured: fileData.isFeatured || false,
                authors: fileData.authors || [
                  {
                    name: "Datapaw",
                    githubUsername: "afnizarnur",
                    avatarUrl: "https://github.com/afnizarnur.png",
                  },
                ],
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
generateIndex()
