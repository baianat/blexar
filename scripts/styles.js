const fs = require('fs');
const chalk = require('chalk');
const stylus = require('stylus');
const uglifycss = require('uglifycss');
const autoprefixer = require('autoprefixer-stylus');
const mkdirpNode = require('mkdirp');

const { promisify } = require('util');

const mkdirp = promisify(mkdirpNode);
const isProduction = process.env.MODE === 'production';

async function buildStyles () {
try {
  console.log(chalk.cyan(`📦  Generating Stylesheets...`));
  const app = fs.readFileSync(`blexar.styl`, 'utf8');
  await mkdirp('dist');
  stylusToCSS(app);
} catch (err) {
  console.log(chalk.red(`📦 Errors While Generating...: ${err}...`));
}
}

function stylusToCSS (styl) {
  stylus(styl)
    .use(autoprefixer({ browsers: ['last 5 version'] }))
    .render((err, css) => {
      if (err) {
        throw err;
      }

      console.log(`${chalk.green('👍  blexar.css')}`);
      fs.writeFileSync('dist/blexar.css', css);

      if (!isProduction) return;
      const uglifiedCss = uglifycss.processString(css);
      fs.writeFileSync('dist/blexar.min.css', uglifiedCss);
    });
}

module.exports = { buildStyles };

buildStyles();
