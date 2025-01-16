<div align="center">
  <a href="https://github.com/afnizarnur/context">
    <img src="https://github.com/user-attachments/assets/33309367-deda-45d6-9990-8148da575ef6" width="60">
  </a>
</div>

<h1 align="center">Datapaw Library</h1>
<p align="center">A collection of ready-to-use data for the Datapaw Figma plugin powered by the community.</p>

## Getting Started

1. Install [Datapaw Figma Plugin](https://www.figma.com/community/plugin/1434312636542908147/datapaw-google-sheets-json-string-currency-number-fake-data-and-more)
2. Open the plugin and navigate to the Library tab
3. Browse through the available data types and use them in your designs

## Supported Data Types

The Datapaw library includes the following ready-to-use data types:

1. **Multi Variable** - Pre-configured data combinations for complex design needs
2. **JSON** - Ready-to-use JSON data structures
3. **Google Sheets** - Sample Google Sheets configurations and templates
4. **String** - Curated lists of text data
5. **Number** - Pre-configured numeric data sets
6. **Date & Time** - Sample date and time formats
7. **Image** - Collection of design-ready images

Each data type in this library is carefully curated and ready to use in your Figma designs through the Datapaw plugin's Library tab.

## File Structure

The library follows this structure:
```
data/
├── string/          # String data files
├── number/          # Number data files
├── date-time/       # Date and time data files
├── multiple/        # Multi-variable data files
├── json/            # JSON data files
├── google-sheets/   # Google Sheets configurations
└── image/           # Image collections
    └── collection-name/
        ├── collection-name.json
        └── [image files]
```

## Contributing

Datapaw Library is powered by the community! We welcome contributions that help designers create better mockups with realistic data. To contribute:

1. Fork this repository
2. Add your data to the appropriate folder in `/data`
3. Create a pull request with a clear description of your contribution

### Data Criteria

To maintain quality and usefulness, contributed data should meet these criteria:

- [ ] **Realistic & Professional** - data should be realistic and appropriate for professional design mockups
- [ ] **Well-Structured** - follow the existing folder structure and file naming conventions
- [ ] **Clean & Safe** - no sensitive, personal, offensive, or copyrighted content
- [ ] **Properly Formatted** - data should be properly formatted according to its type (JSON for structured data)
- [ ] **Well-Documented** - include a clear description of the data and its intended use
- [ ] **Reasonable Size** - keep file sizes reasonable (max 5MB for images, 1MB for other types)

> [!IMPORTANT]
> Contributions containing sensitive, personal, offensive, or copyrighted content will be rejected.

## Examples

Here are examples of how to structure data for each type:

### String Data
The `orderType` field accepts: "Random" (default), "AsEntered", or "ReverseOrder"

```json
{
  "name": "Button Labels",
  "description": "A collection of common button labels and call-to-action text",
  "datatype": "string",
  "isFeatured": false,
  "data": {
    "textItems": [
      "Get Started",
      "Learn More",
      "Sign Up Now"
    ],
    "orderType": "Random",
    "prefix": "",
    "suffix": ""
  },
  "tags": [
    "buttons",
    "cta",
    "ui"
  ]
}
```

### Number Data
```json
{
  "name": "Ratings",
  "description": "Rating scores from 1 to 5 with one decimal place",
  "datatype": "number",
  "isFeatured": false,
  "data": {
    "min": "1",
    "max": "5",
    "decimalPlaces": "1",
    "useSeparator": false,
    "prefix": "",
    "suffix": " ⭐"
  },
  "tags": ["rating", "score", "stars", "review"]
}
```

### Date & Time Data
The `orderType` field accepts: "Sequential" (chronological), "Random", or "ReverseOrder"

```json
{
  "name": "Calendar Events",
  "description": "Full date formats perfect for calendar events and schedules",
  "datatype": "date-time",
  "isFeatured": false,
  "data": {
    "dateFormat": "EEEE, MMMM d, yyyy",
    "orderType": "Sequential",
    "prefix": "",
    "suffix": ""
  },
  "tags": [
    "calendar",
    "events",
    "schedule"
  ]
}
```

### Multi Variable Data
For string variables, the `orderType` field accepts: "Random" (default), "AsEntered", or "ReverseOrder"

```json
{
  "name": "E-commerce Product",
  "description": "Product details with name, price, rating, and stock information",
  "datatype": "multiple",
  "isFeatured": false,
  "tags": ["product", "e-commerce", "multi-variable", "shop"],
  "data": {
    "variables": [
      {
        "id": "product-name",
        "name": "productName",
        "dataType": "string",
        "config": {
          "textItems": [
            "AirFlow Pro Wireless Earbuds",
            "ZenBook Ultra Laptop"
          ],
          "orderType": "Random",
          "prefix": "",
          "suffix": ""
        }
      },
      {
        "id": "product-price",
        "name": "price",
        "dataType": "number",
        "config": {
          "min": "29.99",
          "max": "999.99",
          "decimalPlaces": "2",
          "useSeparator": true,
          "prefix": "$",
          "suffix": ""
        }
      }
    ]
  }
}
```

### JSON Data
The data can be provided in two ways:
- Use `sourceType: "url"` with a `url` field pointing to a JSON file
- Use `sourceType: "direct"` with a `content` field containing stringified JSON data (use [JSON Stringify Online](https://jsonformatter.org/json-stringify-online) to convert your JSON)

The `orderType` field accepts: "Random" (default), "AsEntered", or "ReverseOrder"

```json
{
  "name": "Global Airport Directory",
  "description": "A comprehensive dataset of airports worldwide, including their locations and details.",
  "datatype": "json",
  "isFeatured": false,
  "data": {
    "sourceType": "url",
    "url": "https://example.com/airports.json",
    "orderType": "Random"
  },
  "tags": ["airports", "global", "locations", "travel"]
}
```

Example with direct content:
```json
{
  "name": "Simple User List",
  "description": "A list of users with basic information",
  "datatype": "json",
  "isFeatured": false,
  "data": {
    "sourceType": "direct",
    "content": "[{\"id\":1,\"name\":\"John Doe\",\"role\":\"Designer\"},{\"id\":2,\"name\":\"Jane Smith\",\"role\":\"Developer\"}]",
    "orderType": "Random"
  },
  "tags": ["users", "people", "directory"]
}
```

### Google Sheets Data
The `orderType` field accepts: "Random" (default), "AsEntered", or "ReverseOrder"

```json
{
  "name": "Retro User Avatars",
  "description": "An extensive collection of user profiles featuring avatars inspired by the vibrant styles of the 1980s and 1990s",
  "datatype": "google-sheets",
  "isFeatured": false,
  "data": {
    "url": "https://docs.google.com/spreadsheets/d/your-sheet-id/edit?usp=sharing",
    "orderType": "AsEntered"
  },
  "tags": [
    "user profiles",
    "retro avatars",
    "data collection"
  ]
}
```

> [!NOTE]
> For Google Sheets data, make sure your sheet is publicly accessible with "Anyone with the link can view" permission.

### Image Data
Place all image files in the same folder as the JSON file. The `url` field should be the filename of the image.

```json
{
  "name": "Rad Faces - Retro Character Avatars",
  "description": "A collection of nostalgic character avatars from the 80s and 90s featuring iconic characters from movies, TV shows, and pop culture.",
  "datatype": "image",
  "isFeatured": false,
  "data": {
    "images": [
      {
        "url": "aeon-flux.jpg",
        "name": "Aeon Flux"
      },
      {
        "url": "akira.jpg",
        "name": "Akira"
      }
    ]
  },
  "tags": ["avatars", "retro", "characters", "90s"]
}
```

## FAQ

### What should I do if a data source is not working?
- For JSON URLs that become inaccessible, please [create an issue](https://github.com/afnizarnur/datapaw-library/issues) with the data name and URL
- For Google Sheets, make sure the sheet is publicly accessible with "Anyone with the link can view" permission
- For image files, check if all images referenced in the JSON file exist in the same folder

### How do I report a problem with the data?
1. Check if the issue is already reported in the [Issues tab](https://github.com/afnizarnur/datapaw-library/issues)
2. If not, create a new issue with:
   - Data type and name
   - Description of the problem
   - Steps to reproduce the issue
   - Expected behavior

### Can I update existing data?
Yes! If you find outdated or incorrect data:
1. Fork the repository
2. Make your changes
3. Submit a pull request with a clear description of the updates

### How do I suggest new data types?
Use the [Issues tab](https://github.com/afnizarnur/datapaw-library/issues) to suggest new data types. Include:
- Description of the data type
- Use cases and examples
- Any specific formatting requirements

## License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details. 