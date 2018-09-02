# Accordion

ES6 accordion extension for Base framework.

## Getting Started

### Installation

You can install accordion as part of base.extensions

```bash
npm install @baianat/base.extensions

# or using yarn
yarn add @baianat/base.extensions
```

If you want the standalone version

```bash
npm install @baianat/accordion

# or using yarn
yarn add @baianat/accordion
```

### Include necessary files

``` html
<head>
  <link rel="stylesheet" href="dist/css/accordion.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/accordion.js"></script>
</body>
```

### HTML Layout

* `.accordion`
  * `.accordion-item`
    * `.accordion-title`
      * `.accordion-icon`
    * `.accordion-body`
  * `.accordion-item`
    * ...

``` html
<ul class="accordion" id="myAccordion">
  <li class="accordion-item is-active">
    <a class="accordion-title">
      <span class="accordion-icon"></span>
      Title 1
    </a>
    <div class="accordion-body">
      <p> Awesome content! </p>
    </div>
  </li>

  <li class="accordion-item is-active">
    <a class="accordion-title">
      <span class="accordion-icon"></span>
      Title 2
    </a>
    <div class="accordion-body">
      <p> Awesome content! </p>
    </div>
  </li>

  <li class="accordion-item is-active">
    <a class="accordion-title">
      <span class="accordion-icon"></span>
      Title 3
    </a>
    <div class="accordion-body">
      <p> Awesome content! </p>
    </div>
  </li>
</ul>
```

If you want the clean version of accordion add `.is-clean` class to main div

```html
  <ul class="accordion is-clean" id="myAccordion">
    ...
  </ul>
```

### Make it work

One last step is to call create new accordion

```js
  let myAccordion = new Accordion('#myAccordion');
```

You can use the static method `Accordion.create` to search for all accordions in the page and create a new instant of it.

```js
  Accordion.create();
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
