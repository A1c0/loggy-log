# Loggy-Log

[![npm version](https://badge.fury.io/js/loggy-log.svg)](https://badge.fury.io/js/loggy-log)
[![npmVersion](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) 

Loggy-log makes it easy to create logs in pipes (like in [ramda](https://ramdajs.com/)) based on a [pino](https://www.npmjs.com/package/pino) logger (formatted with [pino-pretty](https://www.npmjs.com/package/pino-pretty)) 

## Install

```
$ yarn add loggy-log
```
or
```
$ npm install loggy-log
```

## Usage

### Set offset of logs level

The values supported are `trace`, `debug`, `info`, `warn` and `error`.

```
PINO_LEVEL=info
```

you can do it easily with [dotenv](https://www.npmjs.com/package/dotenv)

By setting the level to `info`, you allow the logs of `info` and those above, i. e. `warn` and `error`

The default value is `trace`

### Set logger title

You can set your log title when require `loggy-log` module
```js
// test.js
const L = require('loggy-log')("Log Demo");
L.info('Initial message : %s')('hello world');
```

it will produce as result
```
[2020-02-22 13:13:42.196 +0000] INFO  (Log Demo): Initial message : hello world
```

But if you don't set a title, the default title is your filename:

```js
// test.js
const L = require('loggy-log')();
L.info('Initial message : %s')('hello world');
```

it will produce as result
```
[2020-02-22 13:13:42.196 +0000] INFO  (test): Initial message : hello world
```


### Utilisation

The logs functions are tap so can be use in pipe. there is an example with [ramda](https://ramdajs.com/):

```js
const R = require('ramda');
const L = require('loggy-log')();

const main = R.pipe(
  L.info('Processing start'),
  L.debug('Initial value : %d'),
  R.add(5),
  L.debug('Add value : %d'),
  R.multiply(4),
  L.debug('Multiply value : %d'),
  R.objOf('data'),
  L.info('Final Object : %o')
);

main(2);
```

```
[2020-02-22 15:22:03.139 +0000] INFO  (test): Processing start
[2020-02-22 15:22:03.142 +0000] DEBUG (test): Initial value : 2
[2020-02-22 15:22:03.142 +0000] DEBUG (test): Add value : 7
[2020-02-22 15:22:03.142 +0000] DEBUG (test): Multiply value : 28
[2020-02-22 15:22:03.143 +0000] INFO  (test): Final Object : {"data":28}
```

But if you want to use the classic Pino logger, you can get it with `L.getPino()`

```js
const L = require('loggy-log')();
const pino = L.getPino();
const a = 1;
const b = 2;
const c = a + b;
pino.info('%d + %d = %d', a, b, c);
```

```
[2020-02-22 15:23:55.207 +0000] INFO  (test): 1 + 2 = 3
```

### Exposed functions

##### `error, warn, info, debug, trace`

`a -> a -> a`

Takes a, logs it, and returns a 

##### Note about  `log`

Got the same methods as before, but take another argument, placed first, which is the log level.

### Extra feature

I thought than print object in log could be interesting but I found it difficult to read an object logged with "%o". So I created a new data type with "%fo". I will print out object using [json-colorizer](https://www.npmjs.com/package/json-colorizer) with option `{ pretty: true }`
So for exemple:

```js
const R = require('ramda');
const L = require('loggy-log')();

const main = R.pipe(
  L.info('Processing start'),
  L.debug('Initial value : %d'),
  R.add(5),
  L.debug('Add value : %d'),
  R.multiply(4),
  L.debug('Multiply value : %d'),
  R.objOf('data'),
  L.info('Final Object : \n%fo')
);

main(2);
```

the result will be like that
```shell
[2020-03-08 16:12:46.142 +0000] INFO  (test): Processing start
[2020-03-08 16:12:46.150 +0000] DEBUG (test): Initial value : 2
[2020-03-08 16:12:46.150 +0000] DEBUG (test): Add value : 7
[2020-03-08 16:12:46.151 +0000] DEBUG (test): Multiply value : 28
[2020-03-08 16:12:46.153 +0000] INFO  (test): Final Object : 
{
  "data": 28
}
```
