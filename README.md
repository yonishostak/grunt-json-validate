# grunt-json-validate
Grunt task to validate JSON files against schemas, using [jsonschema](https://github.com/tdegrunt/jsonschema)

## Usage
In your gruntfile:
```javascript
jsonvalidate: {
    target: {
        options: { },
        files: [
            {
                options: { },
                schema: 'path/to/root.schema.json',
                refs: [
                    'path/to/referenced/**/*.schema.json'
                ],
                src: 'path/to/**/*.json'
            }
        ]
    }
}
```

Apply `schema` and all schemas in the `refs` paths to `src` JSON files.
Options are passed to jsonschema validator. Each target can have its global options, and an options object specific to a files group (these are merged, local overriding global).

