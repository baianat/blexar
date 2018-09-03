const { buildStyles } = require('./styles');
const { buildScripts } = require('./extensions');
const bs = require('browser-sync').create();

bs.watch('*/**/*.html').on('change', bs.reload);

bs.watch('*/**/*.styl', function (event, file) {
    if (event === 'change') {
      buildStyles();
      bs.reload();
    }
});

bs.watch('*/**/src/*.js', function (event, file) {
  if (event === 'change') {
    const fileName = file.match(/(\w+).js$/)[1];
    buildScripts('umd', fileName);
    console.log(fileName);
    bs.reload();
  }
});

bs.init({
  server: true
});
