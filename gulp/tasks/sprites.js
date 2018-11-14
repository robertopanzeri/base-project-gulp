var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename')
del = require('del');

var config = {
    mode: {
        css: { // Activate the «css» mode, files are created in a 'css' subfolder
            sprite: "sprite.svg", // Sprite path and name
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function () {
    return del(['./app/dist/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function () {//beginClean is a dependency, so it will be run first. When beginClean is done, then createSprite is run
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/dist/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function () {//createSprite is a dependency, so it will be run first. When createSprite is done, then copySpriteGraphic is run
    return gulp.src('./app/dist/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function () {//createSprite is a dependency, so it will be run first. When createSprite is done, then copySpriteCSS is run
    return gulp.src('./app/dist/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {//copySpriteGraphic and copySpriteCSS are dependencies, so they will be run first. When they are done, then endClean is run
    return del('./app/dist/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
