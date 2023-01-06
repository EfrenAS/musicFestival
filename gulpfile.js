const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');


// Image
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif =  require('gulp-avif');

// Javascript

const terser = require('gulp-terser-js');

function css( done ) {
  const pluggins = [
    autoprefixer(),
    cssnano()
  ];

  src("src/scss/**/*.scss").pipe(sourcemaps.init())
                           .pipe(plumber())
                           .pipe(sass()) // Compile SASS file
                           .pipe(postcss(pluggins))
                           .pipe(sourcemaps.write('.'))
                           .pipe(dest("build/css")); // save into HardDisk
  done(); //Call notify toa Gulp when the it's the final
}

function imageMin( done ) {
  const options = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{png,jpg}').pipe(cache(imagemin()))
                                 .pipe(dest('build/img'));
  done();
}

function versionWebp( done ) {
  const options = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}').pipe(webp(options))
                               .pipe(dest('build/img'));
  done();
}

function versionAvif( done ) {
  const options = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{png,jpg}').pipe(avif(options))
                               .pipe(dest('build/img'));
  done();
}

function javascript ( done ) {
  src('src/js/**/*.js').pipe(sourcemaps.init())
                       .pipe( terser() )
                       .pipe(sourcemaps.write('.'))
                       .pipe( dest('build/js') );
  done();
}

function dev( done ) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.imageMin = imageMin;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev =  parallel(imageMin, versionWebp, versionAvif, javascript, dev);