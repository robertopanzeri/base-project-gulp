var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {// generates a version of modernizr that checks only for the features requested, by parsing the code of the 'src' files provided
   return gulp.src(['./src/assets/styles/**/*.css', './src/assets/scripts/**/*.js']) 
   .pipe(modernizr({
       "options" : [
           "setClasses"
       ]
   }))
   .pipe(gulp.dest('./src/temp/scripts/'));
});