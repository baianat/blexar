# Table

Advanced data table extension for Blexar framework.

## Getting Started

### Installation

You can install table as part of all blexar's extensions.

```bash
npm install @blexar/extensions

# or using yarn
yarn add @blexar/extensions
```

If you want the standalone version.

```bash
npm install @blexar/table

yarn add @blexar/table
```

### Include necessary files

``` html
<head>
  <!-- include blexar framework stylesheet -->
  <link rel="stylesheet" href="dist/css/blexar.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/table.js"></script>
</body>
```

### HTML markup

Here's an ordinary table markup with the class `.table`

``` html
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Info</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>

  <tfoot>
    ...
  </tfoot>

  <tbody>
    ...
  </tbody>
</table>
```

### Create a new table instance

using default settings

``` javascript
  new Table('.table');
```

using custom settings

``` javascript
  new Table('.table', {
    fixedHeader: true,
    pagination: true,
    sortable: true,
    editable: true,
    density: false,
    perPage: 10
  });
```

### Settings

| PROPERTIES   | DEFAULT  | DESCRIPTION                                                  |
| ------------ | -------- | ------------------------------------------------------------ |
| fixedHeader  | false    | indicates whether the table header is fixed during scrolling |
| pagination   | true     | enables pages pagination                                      |
| sortable     | true     | enables the ability to sort columns                           |
| editable     | false    | enables the user to edit table cells                          |
| density      | false    | shows rows density control buttons                            |
| perPage      | 10       | how many rows is shown per page                              |

### Working with custom events

You can listen to events to notify you when data changes

``` javascript
  const table = document.querySelector('.table');

  table.addEventListener('beforeEdit', (e) => {
    console.log(e.detail)
  });

  table.addEventListener('afterEdit', (e) => {
    console.log(e.detail)
  });
```

### Events

| DEFAULT    | DESCRIPTION                                   |
| ---------- | --------------------------------------------- |
| beforeEdit | fires when clicking on an input and starts to edit it |
| afterEdit  | fires after blurring out of the input              |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
