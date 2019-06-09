# Gulp HTML Tags To Files

Takes the contents of a Vinyl File Buffer and parses it for html tags and saves the innerHTML of those tags into a separate file based on the tag's `data-file` attribute. If the matched html tag does not have the `data-file` attribute, it will be ignored. The content of the matched tags are saved to a Vinyl File based on the location defined by the `data-file` attribute. Multiple instances of the same `data-file` will get merged in the order that their buffers are passed in the stream. It is these newly created Vinyl Files that then get passed on to the stream, and everything else is ignored after this package is run.

## API

<b><code>tags2Files(tags = ['script'], filterCb(content = '', attrs = {}) => {})</code></b>

Gulp HTML Tags To Files takes one optional argument

### tags

(array|string) All the tag names to look for in a string. Example: ['script', 'style']. If you are only looking for one tag, you can enter just that tag as a string and it will be converted to an array for you. So, for example `'style'` will be converted to `['style']` automatically. Defaults to `['script']`.

### filterCb

(function) An optional callback that takes in the content string and the attributes object and returns back the filtered content.

## Usage

``` js

var tags2Files = require('gulp-tags-to-files');

gulp.task('assets', function () {
	return gulp.src('./src/**/*.js')
		.pipe(tags2Files(['script', 'style']))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('javascript', function () {
	return gulp.src('./src/**/*.js')
		.pipe(tags2Files('script', (content, attrs) => {
			const encapsulate = typeof attrs['data-encapsulate'] === 'undefined' || !['0', 'false', 'no'].includes(attrs['data-encapsulate'].toLowerCase());
			return encapsulate ? `(function () { \n ${content} \n })();` : content;
		}))
		.pipe(gulp.dest('./dist/'));
});


```
