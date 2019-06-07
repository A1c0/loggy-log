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

const logIfLevelOK = (level, message) =>
  R.tap(() =>
    R.when(isLevelOk(level), () => winstonLogger.log(level, message))(process)
  );

const log = R.curry((level, message) => logIfLevelOK(level, message)(message));

const logTapMessage = R.curry((level, message, obj) =>
  logIfLevelOK(level, message)(obj)
);

const trace = log('trace');
const debug = log('debug');
const info = log('info');
const warn = log('warn');
const error = log('error');

const traceTapMessage = logTapMessage('trace');
const debugTapMessage = logTapMessage('debug');
const infoTapMessage = logTapMessage('info');
const warnTapMessage = logTapMessage('warn');
const errorTapMessage = logTapMessage('error');

module.exports = {
  trace,
  debug,
  info,
  warn,
  error,
  log,
  logTapMessage,
  traceTapMessage,
  debugTapMessage,
  infoTapMessage,
  warnTapMessage,
  errorTapMessage
};
