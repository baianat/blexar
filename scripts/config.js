const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const { version } = require('../package.json');

module.exports = {
  extensions: [
    'dropdown',
    'slider',
    'accordion',
    'modal',
    'navbar',
    'select',
    'switcher',
    'table'
  ],
  script: {
    banner:
    `/**
    * v${version}
    * (c) ${new Date().getFullYear()} Baianat
    * @license MIT
    */`,
    uglifyOptions: {
      toplevel: true,
      compress: true,
      mangle: true
    },
    inputOptions: {
      plugins: [
        replace({ __VERSION__: version }),
        babel(),
        resolve()
      ]
    }
  }
};
