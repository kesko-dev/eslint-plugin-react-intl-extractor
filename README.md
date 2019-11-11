# ESLint React Intl extractor

This **ESLint plugin** will:

- Report duplicate messageIds with different defaultMessages.
- Collect and dump messageIds and defaultMessages into a target **dir**/**locale**.json file.

## Configuration

Provide ```dir``` and ```locale``` to enable storing of extracted locale data.

```json
{
  "rules": {
    "react-intl-extractor/message-collector": [
        "error",
        {
          "dir": "src/translations",
          "locale": "en"
        }
    ]
  }
}
```

## TODO

Tests need some work.
