var gutil = require('gulp-util'),
    prettyHrtime = require('pretty-hrtime'),
    startTime;

module.exports = {
    start: function(e) {
        var task = e && e.task;
        startTime = process.hrtime();
        gutil.log('Starting', '\'' + gutil.colors.cyan(task) + '\'...');
    },

    end: function(e) {
        var task = e && e.task,
            taskTime = process.hrtime(startTime),
            time = prettyHrtime(taskTime);

        gutil.log(
            'Finished', '\'' + gutil.colors.cyan(task) + '\'',
            'after', gutil.colors.magenta(time)
        );
    }
};
