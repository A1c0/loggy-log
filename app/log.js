const R = require('ramda');
const {winstonLogger} = require('../lib/winston-logger');

const levelTable = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'];

process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'INFO';

const ezLog = R.curry((m, l) => winstonLogger.log(l, '%o', m));

const isBeforeThan = R.curry((level, x) =>
  R.pipe(
    R.toUpper,
    R.of,
    R.prepend(x),
    R.map(R.indexOf(R.__, levelTable)),
    R.apply(R.lte)
  )(level)
);

const isLevelOk = R.converge(isBeforeThan, [
  R.identity,
  R.always(process.env.LOG_LEVEL)
]);

const logIfLevelOK = (level, message, obj) =>
  R.pipe(
    R.when(isLevelOk, ezLog(message)),
    R.always(obj)
  )(level);

const log = R.curry((level, message) => logIfLevelOK(level, message, message));

const logT = R.curry((level, message, obj) =>
  logIfLevelOK(level, message, obj)
);

const trace = log('trace');
const debug = log('debug');
const info = log('info');
const warn = log('warn');
const error = log('error');

const traceT = logT('trace');
const debugT = logT('debug');
const infoT = logT('info');
const warnT = logT('warn');
const errorT = logT('error');

module.exports = {
  log,
  trace,
  debug,
  info,
  warn,
  error,
  logT,
  traceT,
  debugT,
  infoT,
  warnT,
  errorT
};
