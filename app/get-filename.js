const stackTrace = require('stack-trace');
const path = require('path');

const getFileName = () => {
  const fullPath = stackTrace.get()[2].getFileName();
  return path.basename(fullPath).replace(/(?:\.)(?:.*)/gm, '');
};

module.exports = {getFileName};
