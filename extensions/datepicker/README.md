# Datepicker(WIP)

ES6 date picker extension for Base framework.

## Getting Started

### Installation

You can install datepicker as part of base.extensions.

```bash
npm install @baianat/base.extensions

# or using yarn
yarn add @baianat/base.extensions
```

If you want the standalone version.

```bash
npm install @baianat/datepicker

yarn add @baianat/datepicker
```

### Include necessary files

``` html
<head>
  <link rel="stylesheet" href="dist/css/datepicker.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/datepicker.js"></script>
</body>
```

### HTML Layout

You need an input element to output the date value on it.

``` html
<input id="myDate">
```

### Create the Datepicker

You now need to create a new `Datepicker` instance.

```js
const myDate = new Datepicker('#myDate', { settings });
```

| OPTION | DEFAULT | DESCRIPTION |
| ------ | ------- | ----------- |
| `dateFormat` | 'YYYY-MM-DD' | string that represents the output date format |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
