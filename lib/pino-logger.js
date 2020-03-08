const pino = require('pino');

const PRETTY_PRINT = {
  prettyPrint: {
    colorize: true,
    translateTime: true,
    errorLikeObjectKeys: ['err', 'error'],
    errorProps: '',
    ignore: 'pid,hostname'
  }
};

const PINO_LEVEL = process.env.PINO_LEVEL || 'trace';

const PINO_CONFIG = {
  level: PINO_LEVEL
};

const pinoLogger = (name, fn = x => x) => {
  const classic = pino({
    ...PINO_CONFIG,
    ...PRETTY_PRINT,
    name
  });
  const custom = Object.create(classic);
  custom.debug = (...args) => classic.debug(...fn(args));
  custom.trace = (...args) => classic.trace(...fn(args));
  custom.warn = (...args) => classic.warn(...fn(args));
  custom.info = (...args) => classic.info(...fn(args));
  custom.error = (...args) => classic.error(...fn(args));
  return custom;
};

module.exports = {pinoLogger};
