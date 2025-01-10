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
```json
{
  "data": {
    "content": "stringified JSON data",
    "orderType": "Random" | "AsEntered" | "ReverseOrder"
  }
}
```

Example use cases:
- User profiles with nested data
- Product catalogs with specifications
- Settings configurations
- API response mockups

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
  "data": {
    "variables": [
      {
        "name": "Variable Name",
        "dataType": "string" | "number" | "percent" | "image" | "date-time" | "currency",
        "config": {
          // Configuration specific to the data type
        }
      }
    ]
  }
}
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