const {src, dest, watch} = require("gulp")
const sass = require("gulp-sass")(require('sass'))
const plumber = require('gulp-plumber')


function css( done ) {
  src("src/scss/**/*.scss").pipe(plumber())
                           .pipe(sass()) // Compile SASS file
                           .pipe(dest("build/css")) // save into HardDisk
  done() //Call notify toa Gulp when the it's the final
}

function dev( done ) {
  watch("src/scss/**/*.scss", css)

  done()
}

exports.css = css
exports.dev = dev