# Loggy-Log

[![npm version](https://badge.fury.io/js/loggy-log.svg)](https://badge.fury.io/js/loggy-log)
[![npmVersion](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) 

Loggy-Log is a utility to easily integrate logs into your application. It will display more or less log depending on the level chosen.

## Install

```
$ yarn add loggy-log
```
or
```
$ npm install loggy-log
```

## Usage

### Set environement variable

To do this, simply create a file `.env` and instantiate the variable `LOG_LEVEL` to the desired value. The values supported are `TRACE`, `DEBUG`, `INFO`, `WARN` and `ERROR`.

```
LOG_LEVEL=INFO
```

By setting the level to `INFO`, you allow the logs of `INFO` and those above, i. e. `WARN` and `ERROR`

### Call log function

```js
const {error, log, info, debug, trace, warn} = require('loggy-log');

log('error', 'this is a log message');

// same call
error('this is a log message');

warn('this is a log message');
info('this is a log message');
debug('this is a log message');
trace('this is a log message');
// =>  with previous config, this script omit 'debug' and 'trace' functions
```

#### For functional use

The logs functions are tap so can be use in pipe. there is an exemple with [ramda](https://ramdajs.com/):

```js
const R = require('ramda');
const L = require('loggy-log');

const main = R.pipe(
  R.add(5),
  L.traceT('add call'),
  L.trace,
  R.multiply(4),
  L.traceT(`multiply call`),
  L.trace,
  L.infoT('process done'),
  info
);

L.info('process start');
main(2);
```


