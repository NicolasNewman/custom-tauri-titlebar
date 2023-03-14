# custom-tauri-titlebar

Hassle-free custom titlebars for any Tauri application.

# Instalation

```sh
# TODO
```

# Configuration
Inside of *tauri.conf.json*, make sure the following properties are set:
```yaml
"tauri": {
    "allowList": {
        "window": {
            "startDragging": true, # if "window.all" is false
        }
    }
    "windows": [
        {
            "decorations": false,
        }
    ]
}
```