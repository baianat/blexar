# Datepicker(WIP)

Datepicker extension for Blexar framework.

## Getting Started

### Installation

You can install datepicker as part of all blexar's extensions.

```bash
npm install @blexar/extensions

# or using yarn
yarn add @blexar/base.extensions
```

If you want the standalone version.

```bash
npm install @blexar/datepicker

yarn add @blexar/datepicker
```

### Include necessary files

``` html
<head>
  <!-- include blexar framework stylesheet -->
  <link rel="stylesheet" href="dist/css/blexar.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/datepicker.js"></script>
</body>
```

### HTML Layout

You need an input element to output the date value on it.

``` html
<input id="myDate" class="input datepicker">
```

### Create the Datepicker

You now need to create a new `Datepicker` instance.

```js
const myDate = new Datepicker('#myDate'[, settings ]);
```

| OPTION | DEFAULT | DESCRIPTION |
| ------ | ------- | ----------- |
| `dateFormat` | 'dd/MM/yyyy' | string that represents the output date format |
| `days` | ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] | array of days name to display in calender |
| `dateFormat` | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] | array of months names to display in months selector |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
