# svn-rev

SVN revision fetcher in native ES6, no process spawning.

## Example

```js
const getSvnRev = require("svn-rev")

getSvnRev("https://src.chromium.org/svn/")
	.then((rev) => console.log(rev))
	.catch((err) => {
		console.error(err.stack || err)
		process.exit(1)
	})
```

## License

MIT
