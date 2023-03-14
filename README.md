# custom-tauri-titlebar

Hassle-free custom titlebars for any Tauri application.

# Instalation

```sh
# TODO
```

# Configuration
Inside of *tauri.conf.json*
```json
"tauri": {
    "allowList": {
        ...
        "window": {
            "all": false,
            "startDragging": true,
            ...
        }
    }
    ...
    "windows": [
        {
            "decorations": false,
            ...
        }
    ]
}
```