const gulp = require('gulp');
// const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// Static server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./docs"
        }
    });
    gulp.watch("./src/**/*.{html,njk}", ['nunjucks']);
    gulp.watch("./src/**/*.css", ['autoprefixer']);
    gulp.watch("./docs/**/*.{html,css}").on('change', browserSync.reload);
});

gulp.task('autoprefixer', function () {
    return gulp.src('./src/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('docs'))
})

gulp.task('nunjucks', function () {
    return gulp.src('src/**/*.{html,njk}')
        .pipe(plumber({
            // Notify on error
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp Error",
                    message: "Error: <%= error.message %>",
                    sound: "Bottle",
                    onLast: true
                })(err);
                this.emit('end');
            }
        }))
        .pipe(nunjucksRender({
            path: ['src/'] // String or Array
        }))
        .pipe(gulp.dest('docs'));
});

// Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("app/scss/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("docs"))
//         .pipe(browserSync.stream());
// });

gulp.task('copy', function () {
    return gulp.src('./src/**/*.{svg,png,jpg,jpeg,gif,json,js}')
        .pipe(gulp.dest('docs'))
})

gulp.task('default', ['serve']);
gulp.task('build', ['nunjucks', 'autoprefixer', 'copy'])