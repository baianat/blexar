# Range slider

ES6 range slider with gradient color range.
ES6 range slider extension with gradient color range for Base framework.

## Getting Started

### Installation

You can install the slider as part of base.extensions.

```bash
npm install @baianat/base.extensions

# or using yarn
yarn add @baianat/base.extensions
```

If you want the standalone version.

```bash
npm install @baianat/slider

yarn add @baianat/slider
```

### Include necessary files

``` html
<head>
  <link rel="stylesheet" href="dist/css/slider.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/slider.js"></script>
</body>
```

### HTML Layout

You need an input element to print the output value in it.

``` html
<input id="slider-1">

<script>
  let mySlider1 = new Slider('#slider-1', {
    gradient: ['#FFE344', '#38E4B7'],
    min: 0,
    max: 100,
    step: 1,
    value: 60
  });
</script>
```

You can also add value, min, max and step values using input attributes.

``` html
<input id="slider-2"  min="-10" max="10" value="0" step="1">

<script>
  let mySlider2 = new Slider('#slider-2');
</script>
```

### Settings

| PROPERTIES | DEFAULT | DESCRIPTION                         |
| ---------- | ------- | ----------------------------------- |
| gradient   | null    | slider gradient colors array        |
| classes    | null    | classes to add to range slider      |
| colorCode  | false   | show color code instead of value    |
| editable   | false   | can input the slider value directly |
| label      | true    | show/hide value label               |
| min        | 0       | minimum slider value                |
| max        | 10      | maximum slider value                |
| step       | 1       | limit the increments value          |
| value      | 0       | start value                         |

### Methods

You can call method on `Slider` instance.

```js
const mySlider = new Slider('#slider');
mySlider.selectColor('#ff00ff');
```

| METHOD | ARGUMENT | DESCRIPTION |
| ------ | -------- | ----------- |
| `update` | [Number] value, [Bool] mute | change the slider current value |
| `newGradient` | [Array] newGradient | change the current slider gradient|

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
