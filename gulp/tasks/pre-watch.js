module.exports = function(gulp, config) {
    gulp.task('pre-watch', function() {
        config.watching = true;
    });
};
