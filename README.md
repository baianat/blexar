# Blexar

**A solid base to establish your favorite websites with user experience in mind.**

Inspired by the user's own experience needs, we decided to implement a design system to serve as a solid basis for very simple, yet elegant websites to deliver a complexity-free environment.

## Main Features

* Works well with SVG out of the box.
* Offers some of the simplistic UI elements out there.
* Intelligent grid system based on Flex-box.
* Built using Stylus preprocessor.
* User-friendly documentation with editable code snippets.

## Getting Started

### Installation

Using npm

```bash
npm install blexar --save
#or using yarn
yarn add blexar
```

### HTML Layout

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- blexar -->
    <link rel="stylesheet" href="./blexar/dist/css/blexar.css">
  </head>
  <body>

  ...

  </body>
</html>
```

### Webpack Configuration

Add the following rule to the Webpack configuration file

```javascript
{
  test: /.styl$/,
  loader: 'style-loader!css-loader!stylus-loader?resolve url'
}
```

### Working with styles

In your main styling file `app.styl`, before including the Base main file, make sure to add the needed variables, according to your customization preferences.

```CSS
$margin = 2px
$red    = #E13C31
@import "~blexar"
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
