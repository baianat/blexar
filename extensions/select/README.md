# Select

ES6 Select extension for Base framework

[example](https://baianat.github.io/select/)

## How to use

### Install

using npm/yarn

```bash
npm install @baianat/select

yarn add @baianat/select
```

### Include necessary files

``` html
<head>
  <!-- you should include one of the following stylesheets-->

  <!-- if you use the standalone version -->
  <link rel="stylesheet" href="dist/css/select.css">

  <!-- if you use base.framework -->
  <link rel="stylesheet" href="dist/css/base.css">
</head>
<body>
    ...
    <!-- include javaScript file -->
    <script type="text/javascript" src="dist/js/select.js"></script>
</body>
```

### Create select element

There are two ways to get your `Select` data source, from HTML select markup or pass them as an array of values to data object.

#### From HTML select markup

```html
<select name="" id="select-1" >

  <optgroup label="group-1">
    <option value="value-1">option-1</option>
    <option value="value-2">option-2</option>
  </optgroup>

  <optgroup label="group-2">
    <option value="value-3">option-3</option>
    <option value="value-4">option-4</option>
  </optgroup>

</select>

<script>
  const newSelect1 = new Select('#select-1');
</script>
```

#### Passing values to data object

```html
<select name="" id="select-2">

<script>
   const newSelect2 = new Select('#select-2', {
      data: [{
        text: 'Italy',
        value: 'IT'
      }, {
        text: 'USA',
        value: 'USA'
      }, {
        text: 'France',
        value: 'fr'
      }, {
        text: 'Egypt',
        value: 'EG'
      }]
    });
</script>
```

To enable multiple mode you can add `multiple` to select element

```html
<select name="" id="select" multiple>
```

or set multiple to `true`

```javaScript
const newSelect = new Select('#select', {
  multiple: true
});
```

### Settings

| Properties | Default | Description                      |
| :--------: | :-----: | :------------------------------: |
| data       | null    | generate the options values      |
| multiple   | false   | enable/disable multiple mode     |

### Methods

You can call method on `Select` instance.

```javascript
const newSelect = new Select('#select');

newSelect.showMenu();
```

| Method         | Argument        | Description |
| :------------: | :-------------: | :---------: |
| `menuShow`     |                 | show select options menu |
| `menuHide`     |                 | hide select options menu |
| `menuToggle`   |                 | toggle options menu visibility |
| `selectOption` | [Object] option | select option |
| `updateLabels` |                 | (in multiple mode only) update the labels |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
