const path = require('path');

const pack = require('../package');

module.exports = () => {
  // eslint-disable-next-line
  console.log(`\n# ${pack.name.toUpperCase()} TEST SETUP #`);

  // normalize timezone to UTC
  process.env.TZ = 'UTC';

  // fix dotenv-safe loading of example by setting the cwd
  process.chdir(path.resolve(path.join(__dirname, '..')));
};
