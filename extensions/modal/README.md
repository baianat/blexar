# Dropdown

ES6 modal extension for Base framework.

## Getting Started

### Installation

You can install modal as part of base.extensions.

```bash
npm install @baianat/base.extensions

# or using yarn
yarn add @baianat/base.extensions
```

If you want the standalone version.

```bash
npm install @baianat/modal

yarn add @baianat/modal
```

### Include necessary files

``` html
<head>
  <!-- if you are using base.framework -->
  <link rel="stylesheet" href="@baianat/base.framework/dist/css/base.css">

  <!-- if you want only modal stylesheet -->
  <link rel="stylesheet" href="@baianat/modal/dist/css/modal.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/modal.js"></script>
</body>
```

### HTML Layout

* `.modal-container`
  * `.modal`
    * `.modal-header`
      * `.modal-dismiss`
      * `.modal-title`
    * `.modal-body`
      * `.modal-icon`
    * `.modal-footer`

``` html
<button class="button is-primary" data-base-modal="#modal01">Show the modal</button>

<div class="modal-container is-hidden" id="modal01">
  <div class="modal">
    <div class="modal-panel">
        <a class="modal-dismiss">X</a>
      <div class="modal-header">
        <h2 class="modal-title">Hi I'm a modal</h2>
      </div>
      <div class="modal-body">
        <p>Awesome content</p>
      </div>
      <div class="modal-footer">
        <a class="button is-green" href="">Ok</a>
        <a class="button is-red is-inverse" href="">Cancel</a>
      </div>
    </div>
  </div>
</div>
```

Once you include the script file, it will search for an element with `[data-base-modal]` attribute and initialize a new `Modal` instance
Note: you add `[data-base-modal]` attribute to the button element and its value will serve as a CSS selector for the `.modal` itself

### JavaScript

If there's no element with `[data-base-modal]` attribute, you have to create a new `Modal` instance manually.

```js
const newModal = new Modal('#modalSelector', '#buttonSelector');
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
