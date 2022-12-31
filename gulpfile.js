const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

// Image
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif =  require('gulp-avif');

function css( done ) {
  src("src/scss/**/*.scss").pipe(plumber())
                           .pipe(sass()) // Compile SASS file
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

function dev( done ) {
  watch("src/scss/**/*.scss", css);
  done();
}

exports.css = css;
exports.imageMin = imageMin;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev =  parallel( imageMin, versionWebp, versionAvif, dev);