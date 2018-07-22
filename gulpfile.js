const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
    gulp.watch("./src/**/*.css").on('change', browserSync.reload);
});

gulp.task('autoprefixer', function() {
    return gulp.src('./src/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('docs'))
})

gulp.task('copy', function() {
    return gulp.src('./src/**/*.{html,svg,png,jpg,gif,json,js}')
        .pipe(gulp.dest('docs'))
})

gulp.task('default', ['serve']);
gulp.task('build', ['autoprefixer', 'copy'])