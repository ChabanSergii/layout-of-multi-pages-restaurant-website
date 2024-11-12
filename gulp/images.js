/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js');
const app               = require('../config/app.js');


/* Plugins */
const webp              = require('gulp-webp');                 /* !!! use only 4.0.1 !!! */
const imagemin          = require('gulp-imagemin');             /* !!! use only 7.1.0 !!! {encoding: false} !!!*/
const newer             = require('gulp-newer');                /* exclude re-conversion */
const clean             = require('gulp-clean');
const gulpIf            = require('gulp-if');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Images */
function images() {
  // Обработка форматов, отличных от .webp
  src(path.img.src, { encoding: false })
      .pipe(plumber({
          errorHandler: notify.onError(error => ({
              title: "Images",
              message: error.message
          }))
      }))
      .pipe(newer(path.img.dest))
      .pipe(gulpIf(file => !file.extname.endsWith('.webp'), imagemin(app.imagemin))) // Оптимизация не для .webp
      .pipe(dest(path.img.dest));

  // Обработка .webp изображений
  return src(path.img.src, { encoding: false })
      .pipe(plumber({
          errorHandler: notify.onError(error => ({
              title: "WebP Images",
              message: error.message
          }))
      }))
      .pipe(newer(path.img.dest))
      .pipe(webp({
          quality: 90,
          method: 6
      }))
      .pipe(dest(path.img.dest));
}


module.exports = images;
