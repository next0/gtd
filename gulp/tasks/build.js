module.exports = function(gulp, config) {
    gulp.task('build', ['lint', 'browserify', 'less', 'copy']);
};
