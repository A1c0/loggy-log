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

const pinoLogger = name =>
  pino({
    ...PINO_CONFIG,
    ...PRETTY_PRINT,
    name
  });

module.exports = {pinoLogger};
