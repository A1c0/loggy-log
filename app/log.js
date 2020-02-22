const R = require('ramda');
const {getFileName} = require('./get-filename');

const {pinoLogger} = require('../lib/pino-logger');

const isNeedArgs = R.includes('%');

const getLoggerDependsOnMessage = R.curry((level, message, arg) =>
  R.ifElse(isNeedArgs, R.flip(R.invoker(2, level))(arg), R.invoker(1, level))(
    message
  )
);

const logger = R.curry((moduleName, level, message, arg) =>
  R.pipe(
    R.curry(R.flip(R.binary(R.call)))(moduleName),
    getLoggerDependsOnMessage(level, message, arg),
    R.always(arg)
  )(pinoLogger)
);

const initLogger = moduleName => {
  const data = getFileName();
  const realModuleName = moduleName || data;
  const logFn = logger(realModuleName);
  return {
    log: logFn,
    error: logFn('error'),
    warn: logFn('warn'),
    info: logFn('info'),
    debug: logFn('debug'),
    trace: logFn('trace'),
    getPino: () => pinoLogger(realModuleName)
  };
};

module.exports = initLogger;
