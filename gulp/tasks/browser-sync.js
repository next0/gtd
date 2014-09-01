var browserSync = require('browser-sync');

module.exports = function(gulp, config) {
    gulp.task('browser-sync', ['build'], function() {
        browserSync.init([config.dirs.dist + '/**'], {
            server: {
                baseDir: [config.dirs.dist]
            },
            watchOptions: {
                debounceDelay: 1000
            },
            port: 8888
        });
    });
};
