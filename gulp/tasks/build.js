//rename all 'dist' occurrences to 'docs' to be able to publish to GitHub Pages
var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
del = require('del'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init ({
        notify: false,//hide notification label on the browser about browserSync actions
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('deleteDistFolder', function () {
    return del('./dist');
});

gulp.task('copyGeneralFiles', function() {// other files needed, not part of my app (e.g. Wordpress files)
    var pathsToCopy = [
        './src/**/*',
        '!./app/**/*.html',
        '!./src/assets/images/**',
        '!./src/assets/styles/**',
        '!./src/assets/scripts/**',
        '!./src/temp/**',
        '!./src/temp'
    ]
    return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', function() {
    return gulp.src(['./src/assets/images/**/*', '!./src/assets/images/icons', '!./src/assets/images/icons/**/*'])// ! excludes
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('usemin', function () {
    return gulp.src('./src/index.html')
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}],
        js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', gulp.series('icons', 'deleteDistFolder', gulp.parallel('copyGeneralFiles', 'optimizeImages', gulp.series('styles', gulp.series('modernizr', 'scripts'), 'usemin'))));