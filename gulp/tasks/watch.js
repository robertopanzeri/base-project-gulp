var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

    browserSync.init ({
        notify: false,//hide notification label on the browser about browserSync actions
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("./src/**/*.html").on('change', browserSync.reload);

    gulp.watch('./src/assets/styles/**/*.css', gulp.series('styles', 'cssInject'));
    
    gulp.watch('./src/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts', 'scriptsRefresh'));

});

gulp.task('cssInject', function(){
    return gulp.src('./src/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function(done){
    browserSync.reload();
    done();
});
