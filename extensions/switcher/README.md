# Switcher

ES6 extension to add a dragging behavior to the Base framework switcher component.

## Getting Started

### Installation

You can install switcher as part of base.extensions.

```bash
npm install @baianat/base.extensions

# or using yarn
yarn add @baianat/base.extensions
```

If you want the standalone version.

```bash
npm install @baianat/switcher

yarn add @baianat/switcher
```

### Include necessary files

``` html
<head>
  <!-- if you are using base.framework -->
  <link rel="stylesheet" href="@baianat/base.framework/dist/css/base.css">

  <!-- if you want only switcher stylesheet -->
  <link rel="stylesheet" href="@baianat/switcher/dist/css/switcher.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/switcher.js"></script>
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
