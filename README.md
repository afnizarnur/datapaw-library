# Datapaw Library

A collection of data templates for Datapaw Figma Plugin.

## Structure

```
datapaw-library/
├── data/
│   ├── multi-variable/     # Multi-variable data
│   ├── json/              # JSON data
│   ├── string/            # String data
│   ├── number/            # Number data
│   ├── percent/           # Percentage data
│   ├── image/             # Image data
│   ├── date-time/         # Date & Time data
│   ├── currency/          # Currency data
│   └── fake-data/         # Fake data
└── README.md
```

## Adding New Data

1. Choose the appropriate category folder in `data/`
2. Create a new JSON file with a descriptive name (e.g., `user-profile.json`)
3. Follow this structure:

```json
{
  "name": "Template Name",
  "description": "Brief description of what this template provides",
  "category": "category-name",
  "isFeatured": false,
  "author": {
    "name": "Your Name",
    "githubUsername": "your-github-username"
  },
  "tags": ["tag1", "tag2"],
  "data": {
    // Template data structure based on category
  }
}
```

### Category-specific Data Structures

#### Multi-variable
```json
{
  "data": {
    "variables": [
      {
        "name": "Variable Name",
        "type": "string|number|percent|image|date-time|currency",
        "data": {
          // Type-specific data structure
        }
      }
    ]
  }
}
```

#### String
```json
{
  "data": {
    "textItems": ["item1", "item2"],
    "orderType": "Random|AsEntered|ReverseOrder"
  }
}
```

#### Number
```json
{
  "data": {
    "min": "0",
    "max": "100",
    "decimalPlaces": "0",
    "useSeparator": true
  }
}
```

#### Percent
```json
{
  "data": {
    "min": "0",
    "max": "100",
    "decimalPlaces": "0"
  }
}
```

#### Image
```json
{
  "data": {
    "images": [
      {
        "url": "image-url",
        "name": "image-name"
      }
    ],
    "orderType": "Random|AsEntered|ReverseOrder"
  }
}
```

#### Date & Time
```json
{
  "data": {
    "format": "MM/DD/YYYY",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  }
}
```

#### Currency
```json
{
  "data": {
    "min": "0",
    "max": "1000",
    "decimalPlaces": "2",
    "currency": "USD",
    "useSeparator": true
  }
}
```

## Contributing

1. Fork the repository
2. Create your template in the appropriate category folder
3. Test the template with Datapaw Figma Plugin
4. Submit a pull request

## Guidelines

1. Use clear, descriptive names for your template files
2. Include relevant tags for better searchability
3. Test your template data before submitting
4. Keep descriptions concise but informative
5. Update the modifiedAt date when making changes

## License

MIT License - see LICENSE file for details 