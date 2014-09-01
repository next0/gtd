module.exports = function(gulp, config) {
    gulp.task('watch', ['pre-watch', 'browser-sync'], function() {
        // gulp/tasks/browserify.js handles js recompiling with watchify
        // gulp/tasks/browser-sync.js automatically reloads any files that change within the directory it's serving from
        gulp.watch(config.dirs.src + '/less/**', ['less']);
        gulp.watch(config.dirs.src + '/**/*.html', ['copy']);
    });
};
