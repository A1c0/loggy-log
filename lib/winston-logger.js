const winston = require('winston');
const chalk = require('chalk');
const moment = require('moment');
const R = require('ramda');

const chooseColor = R.cond([
  [R.equals('trace'), R.always(chalk.gray)],
  [R.equals('debug'), R.always(chalk.magenta)],
  [R.equals('info'), R.always(chalk.blue)],
  [R.equals('warn'), R.always(chalk.yellow)],
  [R.equals('error'), R.always(chalk.red)],
  [R.T, R.always(chalk.white)]
]);

const timestamp = () => `[${moment().format('HH:mm:ss')}]`;

const myLevels = {
  trace: 0,
  debug: 0,
  info: 0,
  warn: 0,
  error: 0
};

const myFormat = winston.format.printf(({level, message}) => {
  const color = R.pipe(
    R.toLower,
    chooseColor
  )(level);

  return R.pipe(
    R.toUpper,
    R.of,
    R.prepend(R.call(timestamp)),
    R.map(color),
    R.append(message),
    R.join(' ')
  )(level);
});

const winstonLogger = winston.createLogger({
  format: myFormat,
  levels: myLevels,
  transports: [new winston.transports.Console()]
});

module.exports = {winstonLogger};
