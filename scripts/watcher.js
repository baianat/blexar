const { extensions } = require('./config');
const { stylusToCSS } = require('./styles');
const { buildScripts } = require('./extensions');
const fs = require('fs');
const bs = require('browser-sync').create();

const styleFiles = extensions.map(ext => {
  return {
    match: `${ext}/src/stylus/app.styl`,
    fn (event, file) {
      const app = fs.readFileSync(file, 'utf8');
      stylusToCSS(app, ext);
      bs.reload();
    }
  };
});

const scriptFiles = extensions.map(ext => {
  return {
    match: `${ext}/src/js/${ext}.js`,
    fn (event, file) {
      buildScripts('umd', ext);
      bs.reload();
    }
  };
});

const htmlFiles = extensions.map(ext => {
  return `${ext}/index.html`;
});

bs.init({
  server: true,
  files: [
    ...styleFiles,
    ...scriptFiles,
    ...htmlFiles
  ]
});

bs.reload();
