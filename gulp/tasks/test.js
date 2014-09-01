var karma = require('gulp-karma');

module.exports = function(gulp, config) {
    // source code tests
    gulp.task('test', function() {
        return gulp.src('./Try not. Do or do not. There is no try.')
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'watch'
            }));
    });
};
