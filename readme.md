# rocambole-strip-nglog

> Strip console statements from a [rocambole](https://github.com/millermedeiros/rocambole) AST


## Install

```
$ npm install --save rocambole-strip-nglog
```


## Usage

```js
const rocambole = require('rocambole');
const stripNgLog = require('rocambole-strip-nglog');

rocambole.moonwalk('if (true) { $log.debug("foo"); }', node => {
	stripNgLog(node);
}).toString();
//=> 'if (true) { void 0; }'
```

To prevent any side-effects, `$log.*` is replaced with `void 0` instead of being removed.


## License

MIT © [Gareth Oakley](http://gazoakley.com)
MIT © [Sindre Sorhus](http://sindresorhus.com)
