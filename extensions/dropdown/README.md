# Dropdown

ES6 class to handle dropdowns with accessibility (a11y) in mind.


## Getting Started

### Installation

You can install dropdown as part of base.extensions.

```bash
npm install @baianat/base.extensions

# or using yarn
yarn add @baianat/base.extensions
```

If you want the standalone version.

```bash
npm install @baianat/dropdown

yarn add @baianat/dropdown
```

### Include necessary files

``` html
<head>
  <link rel="stylesheet" href="dist/css/dropdown.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/dropdown.js"></script>
</body>
```

### HTML Layout

* `.dropdown`
  * `[data-base-dropdown]`
  * `.dropdown-menu`

``` html
<!-- add is-left, is-right or is-center -->
<!-- to style the dropdown position -->
<div class="dropdown">
  <!-- drop down button -->
  <a class="button" data-base-dropdown="#dropdown1">
    <svg class="icon">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </a>

  <!-- dropdown menu -->
  <div class="dropdown-menu"  id="dropdown1">
    <p>Awesome text!</p>
  </div>
</div>
```

Once you include the script file, it will search for an element with `[data-base-dropdown]` attribute and initialize new `Dropdown` instance.
Note: you add `[data-base-dropdown]` attribute to the button element and its value will serve as a CSS selector for the `.dropdown-menu`

### Initialize with JavaScript

If there's no element with `[data-base-dropdown]` attribute, you have to create a new `Dropdown` instance manually.

```js
const newDropdown = new Dropdown('#buttonSelector', '#menuSelector', options);
```

| OPTION | DEFAULT | DESCRIPTION |
| ------ | ------- | ----------- |
| menuVisible | 'is-visible' | class name for when the menu is visible |
| menuHidden | 'is-hidden' | class name for when the menu is hidden |
| elementActive | 'is-active' | class name for when the button is active |
| hideWhenClickOut | false | set `true` to close the menu when clicking outside of it |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
