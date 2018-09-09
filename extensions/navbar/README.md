# Navbar

An adaptive navbar extension for Blexar framework, that moves navbar elements to a dropdown menu based on pre-set priorities.

## Getting Started

### Installation

You can install navbar as part of all blexar's extensions.

```bash
npm install @blexar/extensions

# or using yarn
yarn add @blexar/base.extensions
```

If you want the standalone version.

```bash
npm install @blexar/navbar

yarn add @blexar/navbar
```

### Include necessary files

``` html
<head>
  <!-- include blexar framework stylesheet -->
  <link rel="stylesheet" href="dist/css/blexar.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/navbar.js"></script>
</body>
```

### HTML Layout

* `.navbar`
  * `.dropdown[data-nav-dropdown]`
    * `.navbar-item[data-nav-button]`
    * `.dropdown-menu[data-nav-menu]`
  * `[data-nav-items]`
    * `.navbar-item[data-nav-priority]`
    * `.navbar-item[data-nav-priority]`
    * ...

```html
<nav class="navbar is-fixed" id="navbar">

  <!-- dropdown to add navbar items -->
  <div class="dropdown is-left" data-nav-dropdown>
    <a class="navbar-item" data-nav-button>
      <svg class="icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          />
        </svg>
      </svg>
    </a>
    <div class="dropdown-menu" data-nav-menu></div>
  </div>

  <div class="navbar-start" data-nav-items>
    <a class="navbar-item" data-nav-priority="high">Home</a>
    <a class="navbar-item" >About</a>
    <a class="navbar-item" data-nav-priority="medium">Company</a>
    <a class="navbar-item">Products</a>
    <div data-nav-priority="low" class="navbar-item dropdown">
      <a>More</a>
      <ul class="dropdown-menu">
        <li><a class="navbar-item">sub menu 1</a></li>
        <li><a class="navbar-item">sub menu 2</a></li>
      </ul>
    </div>
    <a class="navbar-item">Even more</a>
    <a class="navbar-item">The End</a>
  </div>
</nav>
```

create a new `Navbar` instance using JavaScript

```javascript
  new Navbar('#main-navbar');
```

### customization

There are three levels of priorities, based on which, the items are moved from the navbar to the dropdown menu. Low priority items are moved first outside the navbar.

You can define the priorities using the `data-nav-priority` attribute

```HTML
<ul class="navbar-items"  data-nav-items>
  <li data-nav-priority="high">
    <a class="navbar-item" href="">Home</a>
  </li>
  <li data-nav-priority="low">
    <a class="navbar-item"  href="">About</a>
  </li>
  <li data-nav-priority="medium">
    <a class="navbar-item"  href="">Company</a>
  </li>
  <li>
    <a class="navbar-item" href="">Products</a>
  </li>
</ul>
```

> Note that if you didn't define a priority for an item, it will be set as low priority
