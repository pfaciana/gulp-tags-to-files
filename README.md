# Gulp HTML Tags To Files

Takes the contents of a Vinyl File Buffer and parses it for html tags and saves the innerHTML of those tags into a separate file based on the tag's `data-file` attribute. If the matched html tag does not have the `data-file` attribute, it will be ignored.

## API

<b><code>tags2Files(tags = ['script'])</code></b>

Gulp HTML Tags To Files takes one optional argument

### tags

(array|string) All the tag names to look for in a string. Example: ['script', 'style']. If you are only looking for one tag, you can enter just that tag as a string and it will be converted to an array for you. So, for example `'style'` will be converted to `['style']` automatically. Defaults to `['script']`.



## Usage

``` js

var tags2Files = require('gulp-tags-to-files');

gulp.task('javascript', function () {
	return gulp.src('./src/**/*.js')
		.pipe(tags2Files(['script', 'style']))
		.pipe(gulp.dest('./dist/'));
});


```
