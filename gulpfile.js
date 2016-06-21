//
//  Helpful Resources:
//  https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
//  http://blog.webbb.be/use-jekyll-with-gulp/
//
//
//  Required Plugins
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    childProcess = require('child_process'),
    concat       = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sassdoc      = require('sassdoc'),
    uglify       = require('gulp-uglify');

//
//  Messages
var messages     = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

//
//  Jekyll Build
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return childProcess.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

//
//  Jekyll Rebuild
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
});

//
//  Jekyll Serve
gulp.task('browser-sync', ['sass', 'sass_export', 'scripts', 'jekyll-build'], function() {
    browserSync.init({
        server: '_site',
        notify: true
    });
});

//
//  Sass Compile
gulp.task('sass', function() {
    gulp.src('./_sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers:  ['last 2 versions'],
            cascade:   false
        }))
        //  .pipe(cssnano({
        //      discardComments: { removeAll: true }
        //  }))
        .pipe(gulp.dest('./_includes'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//
//  Sass Compile
gulp.task('sass_export', function() {
    gulp.src('./export/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers:  ['last 2 versions'],
            cascade:   false
        }))
        //  .pipe(cssnano({
        //      discardComments: { removeAll: true }
        //  }))
        .pipe(gulp.dest('./export/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//
//  Sass Docs
gulp.task('sassdoc', function() {
    gulp.src('./_sass/**/*.scss')
        .pipe(sassdoc({
            dest: './_docs',
        }))
});

//
//  Scripts
gulp.task('scripts', function() {
    gulp.src([
        './js/jquery.js',
        './js/tether.js',
        './js/bootstrap.js',
        './js/clipboard.min.js',
        './js/functions.js',
        './js/nav.js',
        './js/scrollbar.js',
        './js/slide.js',
        './js/sticky.js',
        './js/init.js'
    ])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./_includes/'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./_includes/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//
//  Watch
gulp.task('watch', function () {
    gulp.watch('./_sass/**/*.scss', ['sass']);
    gulp.watch('./export/**/*.scss', ['sass_export']);
    gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch(
        [
            './*.html',
            './_includes/*',
            './_layouts/*',
            './_mockups/*',
            './_objects-bootstrap/*',
            './_objects-utilities/*',
            './_pages/*',
            './_posts/*',
            './js/*'
        ], [
            'jekyll-rebuild'
        ]);
});

//
//  Production
gulp.task('production', ['sass', 'sassdoc', 'scripts', 'jekyll-build']);

//
//  Default
gulp.task('default', ['browser-sync', 'watch']);
