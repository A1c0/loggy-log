const colorize = require('json-colorizer');
const {decycle} = require('json-decycle');
const stringify = require('json-stringify-pretty-compact');
const R = require('ramda');

const getJSON = x => JSON.parse(JSON.stringify(x, decycle()));

const prettier = R.pipe(getJSON, stringify, colorize);

module.exports = {stringify: prettier};
