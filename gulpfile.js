const gulp = require('gulp');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import');
const htmlPartial = require('gulp-html-partial');
const clean = require('gulp-clean');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const spritesmith = require('gulp.spritesmith');
const isProd = process.env.NODE_ENV === 'prod';

const htmlFile = [
    'src/*.html'
]

function html() {
    return gulp.src(htmlFile)
        .pipe(htmlPartial({
            basePath: 'src/templates'
        }))
        .pipe(gulpIf(isProd, htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('dist'));
}

function css() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: ['last 4 version']
        }), cssnano()]))
        .pipe(gulpIf(isProd, cssmin()))
        .pipe(gulp.dest('dist/assets/css'));
}

function js() {
    return gulp.src('src/js/lib/*.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('core.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest('dist/assets/js'));
}

function jsmain() {
    return gulp.src('src/js/main.js')
        .pipe(jsImport({
            hideConsole: true
        }))
        .pipe(concat('main.js'))
        .pipe(gulpIf(isProd, uglify()))
        .pipe(gulp.dest('dist/assets/js'));
}

function img() {
    return gulp.src('src/images/**/*')
        .pipe(gulpIf(isProd, imagemin()))
        .pipe(gulp.dest('dist/assets/images'));
}

function serve() {
    browserSync.init({
        open: true,
        server: './dist'
    });
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}


function watchFiles() {
    gulp.watch('src/**/*.html', gulp.series(html, browserSyncReload));
    gulp.watch('src/**/*.scss', gulp.series(css, browserSyncReload));
    gulp.watch('src/**/*.js', gulp.series(jsmain, browserSyncReload));
    gulp.watch('src/images/**/*.*', gulp.series(img));
    // return;
}

function del() {
    return gulp.src('dist/*', {
            read: false
        })
        .pipe(clean());
}

function cssSprites() {
    var spriteData = gulp.src('src/images/sprite-input/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../images/sprite.png',
      }));
      spriteData.img.pipe(gulp.dest('dist/assets/images'));
      spriteData.css.pipe(gulp.dest('src/sass/layout'));
}


exports.css = css;
exports.html = html;
exports.js = js;
exports.del = del;
exports.jsmain = jsmain;
exports.cssSprites = cssSprites;
exports.serve = gulp.parallel(html, css, jsmain, js, img, watchFiles, serve, cssSprites);
exports.default = gulp.series(del, html, jsmain, css, js, img);