'use strict';

const parseStr = require('parse-string-for-tags'),
	Vinyl = require('vinyl'),
	through2 = require('through2');

module.exports = function (tags = ['script']) {
	const files = {};

	return through2.obj((data, encoding, cb) => {
		if (!data.isBuffer()) return cb(null, data); // pass-through

		parseStr({source: data.contents.toString(), tags}, (attrs, content) => {
			const file = attrs['data-file'];
			if (file) {
				files[file] = files[file] || '';
				files[file] += content;
			}
		});

		cb();
	}, function (cb) {
		Object.entries(files).forEach(([file, contents]) => {
			this.push(new Vinyl({
				cwd: process.cwd(),
				path: file,
				contents: new Buffer.from(contents)
			}));
		});
		cb();
	});
};