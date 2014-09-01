module.exports = function(gulp, config) {
    gulp.task('copy', function() {
        return gulp.src(config.dirs.src + '/**/*.html')
            .pipe(gulp.dest(config.dirs.dist));
    });
};
