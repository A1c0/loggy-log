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

/**
 * Print a log message
 * @param level The level of the log
 * @param message A log message
 */
const log = R.curry((level, message) =>
  R.when(isLevelOk(level), () => winstonLogger.log(level, message))(process)
);

/**
 * Print a trace log message
 * @param {String} message A log message
 */
const trace = log('trace');

/**
 * Print a trace log message
 * @param {String} message A log message
 */
const debug = log('debug');

/**
 * Print a trace log message
 * @param {String} message A log message
 */
const info = log('info');

/**
 * Print a trace log message
 * @param {String} message A log message
 */
const warn = log('warn');

/**
 * Print a trace log message
 * @param {String} message A log message
 */
const error = log('error');

module.exports = {trace, debug, info, warn, error, log};
