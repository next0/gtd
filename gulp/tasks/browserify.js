var browserify = require('browserify'),
    watchify = require('watchify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    sourcemaps = require('gulp-sourcemaps'),
    mold = require('mold-source-map'),
    bundleLogger = require('../utils/bundle-logger'),
    handleErrors = require('../utils/handle-errors'),
    source = require('vinyl-source-stream');

module.exports = function(gulp, config) {
    gulp.task('browserify', function() {
        var bundler = browserify({
            // required watchify args
            cache: {},
            packageCache: {},
            fullPaths: true,
            // the entry point of app
            entries: [config.dirs.src + '/js/' + config.pkg.name + '.js'],
            // file extentions to make optional in your requires
            extensions: ['.hbs'],
            // enable source maps
            debug: true
        });

        var bundle = function() {
            var e = {task: 'bundle'};

            // log when bundling starts
            bundleLogger.start(e);

            return bundler
                .bundle()
                // report compile errors
                .on('error', handleErrors)
                // transform source map path
                .pipe(mold.transformSourcesRelativeTo(config.dirs.base))
                // use vinyl-source-stream to make the stream gulp compatible.
                .pipe(source(config.pkg.name + '.js'))

                // read and update sourcemaps
                .pipe(streamify(sourcemaps.init({loadMaps: true})))

                    // uglify task
                    .pipe(streamify(uglify({preserveComments: 'some'})))
                    // add header comment
                    .pipe(streamify(header(config.banner, {pkg : config.pkg})))

                // write sourcemaps
                .pipe(streamify(sourcemaps.write(('./'))))

                // specify the output destination
                .pipe(gulp.dest(config.dirs.dist + '/js'))
                // log when bundling completes
                .on('end', bundleLogger.end.bind(null, e));
        };

        if (config.watching) {
            bundler = watchify(bundler);
            // rebundle with watchify on changes.
            bundler.on('update', bundle);
        }

        return bundle();
    });
};
