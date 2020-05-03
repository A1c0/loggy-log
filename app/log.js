const R = require('ramda');
const {getFileName} = require('./get-filename');

const {pinoLogger} = require('../lib/pino-logger');
const {stringify} = require('../lib/stringlify');

const upgradeArgValues = R.pipe(
  R.over(R.lensIndex(0), R.match(/%[a-z]+/g)),
  R.juxt([R.head, R.tail]),
  R.transpose,
  R.map(
    R.pipe(
      R.when(
        R.propSatisfies(R.includes('%fo'), 0),
        R.over(R.lensIndex(1), stringify)
      ),
      R.last
    )
  )
);

const upgradeArg = R.pipe(
  R.juxt([
    R.pipe(
      R.head,
      R.replace('%fo', '%s')
    ),
    upgradeArgValues
  ]),
  R.unnest
);

const isNeedArgs = R.includes('%');

const getLoggerDependsOnMessage = R.curry((level, message, arg) =>
  R.ifElse(isNeedArgs, R.flip(R.invoker(2, level))(arg), R.invoker(1, level))(
    message
  )
);

const logger = R.curry((moduleName, argsFn, level, message, arg) =>
  R.pipe(
    R.curry(R.flip(R.binary(R.apply)))([moduleName, argsFn]),
    getLoggerDependsOnMessage(level, message, arg),
    R.always(arg)
  )(pinoLogger)
);

const getRealModuleName = R.cond([
  [R.is(String), R.identity],
  [R.T, getFileName]
]);

const initLogger = module => {
  const realModuleName = getRealModuleName(module);
  const logFn = logger(realModuleName, upgradeArg);
  return {
    log: logFn,
    error: logFn('error'),
    warn: logFn('warn'),
    info: logFn('info'),
    debug: logFn('debug'),
    trace: logFn('trace'),
    getPino: () => pinoLogger(realModuleName, upgradeArg)
  };
};

module.exports = initLogger;
