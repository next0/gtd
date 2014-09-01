var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

module.exports = function(gulp, config) {
    gulp.task('lint', function() {
        return gulp.src(config.dirs.src + '/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(stylish, {verbose: true}));
    });
};
