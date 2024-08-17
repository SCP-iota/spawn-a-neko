# Spawn a Neko!

This is a silly little JavaScript package to easily embed a widget on your website that lets users spawn [oneko](https://github.com/glreno/oneko)-like nekos the follow the pointer!

For an example of a site that includes the widget, see [my blog](https://scp-iota.github.io).

## Usage

### Include the CSS

You'll need to include the CSS in your page for this to work. Add this somewhere in your HTML `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SCP-iota/spawn-a-neko@master/style.css" type="text/css" crossorigin="anonymous" />
```

### Include the Script in HTML

Include this towards the end of your HTML's `<body>` element:

```html
<script src="https://cdn.jsdelivr.net/gh/SCP-iota/spawn-a-neko@master/spawn-a-neko.js"></script>
<script>
    SpawnANeko.start()
</script>
```

### Or Use with a JavaScript Bundler...

If you're using a JavaScript bundler like Webpack, you can get the `spawn-a-neko` package from NPM and include it in your site's code.

```bash
npm install spawn-a-neko
```

#### ...as an ES Module

```js
import { start } from "spawn-a-neko";

window.addEventListener('load', start);
```

#### ...or as a CommonJS Module

```js
require("spawn-a-neko").start();
```

## Advanced Usage

For more control over where the button gets added, you can use the `creatButton` function and `Button` class.

### With HTML-included Script

```js
const button = SpawnANeko.createButton();
new SpawnANeko.Button(button);
document.body.appendChild(button);
```

### With Bundled ES Module

```js
import { createButton, Button } from "spawn-a-neko";

const button = createButton();
new Button(button);
document.body.appendChild(button);
```

### With Bundled CommonJS Module

```js
const { createButton, Button } = require("spawn-a-neko");

const button = createButton();
new Button(button);
document.body.appendChild(button);
```