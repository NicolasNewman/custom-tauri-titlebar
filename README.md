# custom-tauri-titlebar

**THIS PACKAGE IS CURRENTLY IN ALPHA DEVELOPMENT**

Hassle-free custom titlebars for any Tauri application.

## Instalation

```sh
npm i custom-tauri-titlebar
```

## Setup

Inside of _tauri.conf.json_, make sure the following properties are set:

```yaml
'tauri': { 'allowList': { 'window': {
                        'startDragging': true, # if "window.all" is false
                    }, 'globalShortcut': {
                        'all': true, # if shortcuts are used
                    } }, 'windows': [{ 'decorations': false }] }
```

## Usage

```ts
import Titlebar from 'custom-tauri-titlebar';

const titlebar = new Titlebar({ background: '#aaaaaa', color: '#ffffff' });
titlebar.addTitle('My Application');
titlebar.addIcon({ type: 'src', data: 'https://api.iconify.design/ph:globe-hemisphere-west-bold.svg' });
titlebar.addButton('btn-close', { type: 'html', data: '<p>X</p>' }, () => {});
```

## Styling

Default styles are inserted into the head when the Titlebar constructor is invoked. If customization is needed, these styles can be extended upon through your own stylesheets. The class name of the Titlebar container is as provided by the `className` field to the constructor. If no class name was given, then the default of `titlebar` is used.

Assuming the default class name is used, the following class names can be used to target specific elements within the Titlebar:

```css
.titlebar-section {
}
.titlebar-button {
}
.titlebar-icon {
}
.titlebar-title {
}
```

If a higher specificity is needed to overwrite default properties, the selector `.{className} .{className}-{component}` can be used.

Additionally, the following utility classes are provided:

```css
.titlebar-vh {
	height: calc(100vh - {titlebar.height}px);
} /* Sets the height to the viewport height minus the height of the titlebar (provided on initialization)*/
```
