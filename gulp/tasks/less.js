var less = require('gulp-less'),
    csso = require('gulp-csso'),
    header = require('gulp-header'),
    autoprefixer = require('gulp-autoprefixer');

module.exports = function(gulp, config) {
    gulp.task('less', function() {
        return gulp.src(config.dirs.src + '/less/main.less')
            .pipe(less({
                paths: config.dirs.src + '/less'
            }))
            .pipe(autoprefixer('last 2 versions', 'ie >= 10'))
            .pipe(csso())
            .pipe(header(config.banner, {pkg : config.pkg}))
            .pipe(gulp.dest(config.dirs.dist + '/css'));
    });
};
