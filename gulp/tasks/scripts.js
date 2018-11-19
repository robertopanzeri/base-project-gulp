var gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', gulp.series('modernizr'), function(callback){ //gulp.series: dependencies that are run in order before the main task
    webpack(require('../../webpack.config'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }
       console.log(stats.toString());
       callback();
    });
});