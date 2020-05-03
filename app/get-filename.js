const stackTrace = require('stack-trace');
const path = require('path');
const R = require('ramda');

const getFileNameMethod = R.invoker(0, 'getFileName');

const isInternalPath = R.anyPass([
  R.includes('internal'),
  R.includes('node_modules')
]);

const getTrace = R.pipe(
  R.invoker(0, 'get'),
  R.map(getFileNameMethod),
  R.reject(isInternalPath),
  R.drop(2)
);

const getFileName = (stackLevel = 0) => {
  const trace = getTrace(stackTrace);
  const fullPath = trace[stackLevel] || 'undefined';
  return path.basename(fullPath).replace(/(?:\.)(?:.*)/gm, '');
};

module.exports = {getFileName};
