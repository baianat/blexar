const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js').minify;
const chalk = require('chalk');
const mkdirpNode = require('mkdirp');

const { rollup } = require('rollup');
const { script, extensions } = require('./config');
const { promisify } = require('util');

const mkdirp = promisify(mkdirpNode);
const isProduction = process.env.MODE === 'production';

async function buildScripts (format, ext) {
  console.log(chalk.cyan(`📦  Generating ${format} ${ext}...`));

  // get the rollup bundle.
  const bundle = await rollup({
    input: `extensions/${ext}/src/${ext}.js`,
    ...script.inputOptions
  });

  // pass the desired output config
  const { code } = await bundle.generate({
    format: format,
    name: `${ext.charAt(0).toUpperCase()}${ext.slice(1)}`,
    banner: script.banner
  });

  let fileName = `${ext}${format === 'es' ? '.esm' : ''}.js`;
  let filePath = path.join(`extensions/${ext}/dist/`, fileName);

  await mkdirp(`extensions/${ext}/dist/`);
  // write the un-minified code.
  fs.writeFileSync(filePath, code);
  console.log(chalk.green(`👍  ${fileName}`));

  // write the minified code.
  if (!isProduction || format !== 'umd') return;
  filePath = path.join(`extensions/${ext}/dist/`, `${ext}.min.js`);
  fs.writeFileSync(filePath, uglify(code, script.uglifyOptions).code);
}

extensions.forEach(ext => {
  buildScripts('es', ext);
  buildScripts('umd', ext);
});

module.exports = { buildScripts };
