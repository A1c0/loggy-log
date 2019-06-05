const R = require('ramda');

const {winstonLogger} = require('../lib/winston-logger');

const levelTable = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'];

const isBeforeThan = R.curry((level, x) =>
  R.pipe(
    R.toUpper,
    R.of,
    R.prepend(x),
    R.map(R.indexOf(R.__, levelTable)),
    R.apply(R.lte)
  )(level)
);

const isLevelOk = R.curry((level, process) =>
  R.pathSatisfies(isBeforeThan(level), ['env', 'LOG_LEVEL'])(process)
);

const log = R.curry((level, message) =>
  R.when(isLevelOk(level), () => winstonLogger.log(level, message))(process)
);

const trace = log('trace');

const debug = log('debug');

const info = log('info');

const warn = log('warn');

const error = log('error');

module.exports = {trace, debug, info, warn, error, log};
