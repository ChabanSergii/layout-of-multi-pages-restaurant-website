/* Use only recommended task version for good work */
const {src, dest}  = require('gulp');

/* Configs */
const path         = require('../config/path.js');

/* Plugins */
const svgSprite    = require('gulp-svg-sprite');


/* function sprite(done) {
    return src(path.svg.srcsvg, { encoding: false })
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest(path.svg.dest))
        .pipe(src(path.svg.srcsvg, { encoding: false }))
        .pipe(dest(path.svg.srcmin));
} */

/* SVG */
function sprite(done) {
  // Настройки для создания спрайта
  const config = {
    mode: {
      stack: {
        sprite: '../sprite.svg', // Путь для файла спрайта
        example: true // Генерация HTML примера
      }
    }
  };

  // Генерация stack и сохранение в первую папку
  src(path.svg.srcsvg, { encoding: false })
    .pipe(svgSprite(config))
    .pipe(dest(path.svg.srcmin)) // Папка для stack
    .on('end', () => {
      // Копирование спрайта в другую папку после создания
      src('app/images/sprite.svg', { allowEmpty: true })
        .pipe(dest(path.svg.dest)); // Папка для sprite
    });

  done();
}


module.exports = sprite;
