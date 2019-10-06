# Switcher

Switcher extension to add a dragging behavior to the Blexar framework switcher component.

## Getting Started

### Installation

You can install switcher as part of all blexar's extensions.

```bash
npm install @blexar/extensions

# or using yarn
yarn add @blexar/extensions
```

If you want the standalone version.

```bash
npm install @blexar/switcher

yarn add @blexar/switcher
```

### Include necessary files

``` html
<head>
  <!-- include blexar framework stylesheet -->
  <link rel="stylesheet" href="dist/css/blexar.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/switcher.js"></script>
</body>
```

### HTML Layout

* `.switcher`
  * `.switcher-input`
  * `.switcher-body`
    * `.switcher-handle`

``` html
<div class="switcher">
   <input id="switcher" type="checkbox" checked="checked" class="switcher-input">
   <label for="switcher" class="switcher-body">
      <span class="switcher-handle"></span>
  </label>
</div>
```

Once you include the script file, it will search for an element with `.switcher` class and adds the dragging behavior to it.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
