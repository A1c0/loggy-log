const colorize = require('json-colorizer');
const R = require('ramda');

const stringify = R.pipe(
  R.converge(JSON.stringify, [R.identity, R.keys, R.always(2)]),
  R.flip(colorize)({pretty: true})
);

module.exports = {stringify};
