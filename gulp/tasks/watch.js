var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function () {

    browserSync.init({
        notify: false, //hide notification label on the browser about browserSync actions
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function () {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function () {
        gulp.start('scriptsRefresh');
    });

});

gulp.task('cssInject', gulp.series('styles'), function () { //gulp.series: dependencies that are run in order before the main task
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', gulp.series('scripts'), function () { //gulp.series: dependencies that are run in order before the main task
    browserSync.reload();
});

/* Gulp 4 dependencies/task execution example
gulp.task('default',
    gulp.series('clean', gulp.parallel('scripts', 'styles'),
        function () {
            alert("fdgdf");
        })
);
*/
/* Gulp 3 dependencies/task execution
gulp.task('scriptsRefresh', ['scripts'], function () {//[dependencies that are run in order before the main task]
    browserSync.reload();
});
gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});
*/