# Datapaw Library

A collection of ready-to-use data for the Datapaw Figma plugin. This repository contains various data types that can be used in your design mockups.

## Data Types

The library currently supports the following data types:

- **String**: Text data like names, titles, descriptions
- **Number**: Numeric data with configurable ranges and formats
- **Percent**: Percentage values with optional formatting
- **Currency**: Monetary values with currency symbols
- **Date-Time**: Date and time values in various formats
- **JSON**: Structured data in JSON format
- **Multiple**: Combined data types for complex use cases
- **Image**: Image data from URLs or frames

## Directory Structure

```
datapaw-library/
├── data/                 # Data directory
│   ├── string/           # String data
│   ├── number/           # Number data
│   ├── percent/          # Percentage data
│   ├── currency/         # Currency data
│   ├── date-time/        # Date and time data
│   ├── json/             # JSON data
│   ├── image/            # Image data
│   └── multiple/         # Multi-variable data
```

## Contributing

We welcome contributions! Here's how you can add new data:

1. Fork this repository
2. Create a new branch: `git checkout -b add-new-data`
3. Add your data in the appropriate directory
4. Submit a pull request

### Data Structure

Each data file should be a JSON file with the following structure:

```json
{
  "name": "Data Name",
  "description": "Brief description of the data",
  "category": "data-type",
  "isFeatured": boolean,
  "data": {
    // Data type specific configuration
  },
  "tags": ["tag1", "tag2"]
}
```

### Data Type Configurations

#### String Data
```json
{
  "data": {
    "textItems": ["item1", "item2", "item3"],
    "orderType": "Random" | "AsEntered" | "ReverseOrder",
    "prefix": "",
    "suffix": ""
  }
}
```

#### Number Data
```json
{
  "data": {
    "min": "0",
    "max": "100",
    "decimalPlaces": "2",
    "useSeparator": boolean,
    "prefix": "",
    "suffix": ""
  }
}
```

#### Percent Data
```json
{
  "data": {
    "min": "0",
    "max": "100",
    "decimalPlaces": "0",
    "useSeparator": boolean,
    "prefix": "",
    "suffix": ""
  }
}
```

Example use cases:
- Progress indicators (0-100%, no decimals)
- Test scores (60-100%, one decimal)
- Completion rates (0-100%, no decimals)

#### Date-Time Data
```json
{
  "data": {
    "dateFormat": "yyyy-MM-dd HH:mm",
    "orderType": "Random" | "Sequential" | "ReverseOrder",
    "prefix": "",
    "suffix": ""
  }
}
```

Available date formats:
- Full formats: `"EEEE, d MMMM yyyy"` (Thursday, 12 October 2024)
- Standard dates: `"yyyy-MM-dd"` (2024-03-20)
- With time (24h): `"yyyy-MM-dd HH:mm"` (2024-03-20 15:30)
- With time (12h): `"yyyy-MM-dd hh:mm a"` (2024-03-20 03:30 PM)
- Time only: `"HH:mm"` (15:30) or `"hh:mm a"` (03:30 PM)

#### JSON Data
For direct input:
```json
{
  "data": {
    "sourceType": "direct",
    "content": "stringified JSON data",
    "orderType": "Random" | "AsEntered" | "ReverseOrder"
  }
}
```

For URL source:
```json
{
  "data": {
    "sourceType": "url",
    "url": "URL to JSON file",
    "orderType": "Random" | "AsEntered" | "ReverseOrder"
  }
}
```

Example use cases:
- User profiles with nested data
- Product catalogs with specifications
- Settings configurations
- API response mockups

Source types:
- **Direct**: JSON content is provided directly in the `content` field. Useful for static data or when you want to include the data within the library.
- **URL**: JSON data is fetched from a URL specified in the `url` field. Useful for dynamic data or when the data is too large to include directly.

#### Image Data
```json
{
  "data": {
    "images": [
      {
        "url": "image-url",
        "name": "image-name"
      }
    ],
    "orderType": "Random" | "AsEntered" | "ReverseOrder",
    "sourceType": "uploaded" | "frame"
  }
}
```

#### Multiple Data
```json
{
  "name": "Example Multi-Variable Data",
  "description": "Example showing different data types in multi-variable",
  "category": "multiple",
  "isFeatured": false,
  "tags": ["example", "multi-variable"],
  "data": {
    "variables": [
      {
        "id": "string-var",
        "name": "productName",
        "dataType": "string",
        "config": {
          "textItems": ["Product A", "Product B", "Product C"],
          "orderType": "Random",
          "prefix": "",
          "suffix": ""
        }
      },
      {
        "id": "number-var",
        "name": "quantity",
        "dataType": "number",
        "config": {
          "min": "1",
          "max": "100",
          "decimalPlaces": "0",
          "useSeparator": true,
          "prefix": "",
          "suffix": " units"
        }
      },
      {
        "id": "percent-var",
        "name": "discount",
        "dataType": "percent",
        "config": {
          "min": "10",
          "max": "50",
          "decimalPlaces": "0",
          "useSeparator": false,
          "prefix": "",
          "suffix": "% off"
        }
      },
      {
        "id": "currency-var",
        "name": "price",
        "dataType": "currency",
        "config": {
          "min": "9.99",
          "max": "99.99",
          "decimalPlaces": "2",
          "useSeparator": true,
          "currency": "USD",
          "symbolPosition": "before",
          "useSymbol": true
        }
      },
      {
        "id": "date-var",
        "name": "lastUpdated",
        "dataType": "date-time",
        "config": {
          "dateFormat": "yyyy-MM-dd HH:mm",
          "orderType": "Random",
          "prefix": "Updated: ",
          "suffix": ""
        }
      }
    ]
  }
}
```

Multi variable data allows you to define multiple variables with different data types in a single content. Each variable can be configured independently with its own settings.

Each variable object has the following fields:
- `id`: Unique identifier for the variable
- `name`: Variable name (used as the layer name prefix)
- `dataType`: Type of data ("string", "number", "percent", "currency", "date-time", "image")
- `config`: Configuration object specific to the data type (see individual data type sections for config options)

#### Google Sheets Data
```json
{
  "data": {
    "url": "https://docs.google.com/spreadsheets/d/...",
    "orderType": "Random" | "AsEntered" | "ReverseOrder"
  }
}
```

Example use cases:
- Product catalogs with multiple columns (name, price, description)
- User databases with structured information
- Content management for text and data
- Dynamic data that needs frequent updates

Requirements:
- The Google Sheets document must be publicly accessible
- The first row should contain column headers
- Each column represents a different data field
- Each row represents a single data entry

Example sheet structure:
```
| Name     | Email            | Role      | Department |
|----------|------------------|-----------|------------|
| John Doe | john@example.com | Developer | Engineering|
| Jane Doe | jane@example.com | Designer  | Design     |
```

### Pull Request Guidelines

When submitting a PR, please ensure:

1. Your data follows the correct structure for its type
2. The data name is descriptive and unique
3. The description clearly explains the data's purpose
4. Tags are relevant and help in searching
5. The `isFeatured` flag is set appropriately (use sparingly)
6. All values are properly formatted as strings where required

### Example PR Description

```markdown
## New Data: [Data Name]

**Data Type:** [string/number/percent/etc]
**Purpose:** Brief explanation of what this data is for

### Data Details
- Name: [name]
- Description: [description]
- Featured: [yes/no]
- Tags: [list of tags]

### Use Cases
- Example use case 1
- Example use case 2

### Testing
- [ ] Verified JSON structure
- [ ] Tested in Datapaw plugin
- [ ] Checked for duplicate data
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

## Multi Variable Data

Multi variable data allows you to define multiple variables with different data types in a single content. Each variable can be configured independently with its own settings.

### Structure

```json
{
  "name": "Random Chat",
  "description": "Random chat messages with names",
  "category": "multiple",
  "isFeatured": false,
  "tags": ["chat", "messages", "multi-variable"],
  "data": {
    "variables": [
      {
        "id": "unique-id-1",
        "name": "name",
        "dataType": "string",
        "config": {
          "textItems": [
            "Prabowo Subianto",
            "Megawati Soekarnoputri",
            "Anies Baswedan"
          ],
          "orderType": "AsEntered",
          "prefix": "",
          "suffix": ""
        }
      },
      {
        "id": "unique-id-2",
        "name": "chat",
        "dataType": "string",
        "config": {
          "textItems": [
            "Td liat berita politik di tv, malah ngantuk gw wkwk",
            "Prabowo mau nyapres lg, emg dia ga capek ya",
            "Ganjar tuh rambut putihnya makin ikonik bgt ga sih wkwk"
          ],
          "orderType": "Random",
          "prefix": "",
          "suffix": ""
        }
      }
    ]
  }
}
```

### Fields

- `name`: The name of the content
- `description`: A brief description of the content
- `category`: Must be "multiple"
- `isFeatured`: Whether the content should be featured
- `tags`: Array of relevant tags
- `data.variables`: Array of variable objects

### Variable Object

Each variable object has the following fields:
- `id`: Unique identifier for the variable
- `name`: Variable name (used as the layer name prefix)
- `dataType`: Type of data ("string", "number", "percent", "image", "date-time", "currency")
- `config`: Configuration object specific to the data type

### Example Use Cases

1. Chat Messages:
   - Name variable for sender names
   - Message variable for chat content
   - Can be used to generate realistic chat interfaces

2. Product Data:
   - Name variable for product names
   - Price variable for product prices
   - Description variable for product descriptions

3. User Profiles:
   - Name variable for user names
   - Age variable for user ages
   - Bio variable for user descriptions

### Order Types

- `Random`: Items are selected randomly
- `AsEntered`: Items are selected in the order they were entered
- `ReverseOrder`: Items are selected in reverse order 