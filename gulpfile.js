var gulp = require('gulp'),
    pkg = require('./package.json'),
    tasks = require('fs').readdirSync('./gulp/tasks/'),
    config = {};

config.pkg = pkg;

config.dirs = {
    base: __dirname,
    src: './src',
    dist: './dist'
};

config.banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

tasks.map(function(task) {
    return require('./gulp/tasks/' + task)(gulp, config);
});
