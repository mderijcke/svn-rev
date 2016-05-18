const request = require("request")
const parseString = require("xml2js").parseString

function requestPromise(opts) {
	return new Promise((resolve, reject) => {
		request(opts, (err, res, body) => {
			if (err) {
				reject(err)
				return
			}

			if (res.statusCode === 401) {
				reject(new Error("Unauthorized"))
				return
			}

			resolve(body)
		})
	})
}

function parseXml(xml) {
	return new Promise((resolve, reject) => {
		parseString(xml, (err, result) => {
			if (err) {
				reject(err)
				return
			}

			resolve(result)
		})
	})
}

function getSvnRev(url, username, password) {
	var opts = {
		method: "PROPFIND",
		uri: url,
		headers: {
			Depth: 1,
		},
		body: '<?xml version="1.0" encoding="utf-8"?><propfind xmlns="DAV:"><prop><version-name /></prop></propfind>',
	}

	if (username || password) {
		opts.auth = {
			user: username,
			pass: password,
			sendImmediately: true,
		}
	}

	var promise = requestPromise(opts)
		.then((body) => parseXml(body))
		.then((obj) => obj["D:multistatus"]["D:response"][0]["D:propstat"][0]["D:prop"][0]["lp1:version-name"][0])

	return promise
}

module.exports = getSvnRev
