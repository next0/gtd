var notify = require('gulp-notify');

module.exports = function() {
    var _this = this,
        args = Array.prototype.slice.call(arguments);

    // send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(_this, args);

    // keep gulp from hanging on this task
    _this.emit('end');
};
