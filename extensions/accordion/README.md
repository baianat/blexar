# Accordion

Accordion extension for Blexar framework.

## Getting Started

### Installation

You can install accordion as part of all blexar's extensions

```bash
npm install @blexar/extensions

# or using yarn
yarn add @blexar/base.extensions
```

If you want the standalone version

```bash
npm install @blexar/accordion

# or using yarn
yarn add @blexar/accordion
```

### Include necessary files

``` html
<head>
  <!-- include blexar framework stylesheet -->
  <link rel="stylesheet" href="dist/css/blexar.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/accordion.js"></script>
</body>
```

### HTML Layout

* `.accordion`
  * `.accordion-item`
    * `.accordion-title`
    * `.accordion-body`
  * `.accordion-item`
  * ...

``` html
<ul class="accordion" id="myAccordion">
  <li class="accordion-item is-active">
    <a class="accordion-title">Title 1</a>
    <div class="accordion-body">
      <p> Awesome content! </p>
    </div>
  </li>

  <li class="accordion-item">
    <a class="accordion-title">Title 2</a>
    <div class="accordion-body">
      <p> Awesome content! </p>
    </div>
  </li>

  ...

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

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)