# Range slider

Range slider extension with gradient color range for Blexar framework.

## Getting Started

### Installation

You can install slider as part of all blexar's extensions.

```bash
npm install @blexar/extensions

# or using yarn
yarn add @blexar/extensions
```

If you want the standalone version.

```bash
npm install @blexar/slider

yarn add @blexar/slider
```

### Include necessary files

``` html
<head>
  <!-- include blexar framework stylesheet -->
  <link rel="stylesheet" href="dist/css/blexar.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/slider.js"></script>
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
