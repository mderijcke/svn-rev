const getSvnRev = require(".")

getSvnRev("https://src.chromium.org/svn/")
	.then((rev) => console.log(rev))
	.catch((err) => {
		console.error(err.stack || err)
		process.exit(1)
	})
