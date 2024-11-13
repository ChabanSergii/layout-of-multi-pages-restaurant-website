/* Use only recommended task version for good work */
const {src, dest}  = require('gulp');

/* Configs */
const path         = require('../config/path.js');

/* Plugins */
const svgSprite    = require('gulp-svg-sprite');
const plumber      = require('gulp-plumber');


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
function sprite() {
  const config = {
    mode: {
      stack: {
        sprite: '../sprite.svg', // Путь для файла спрайта
        example: true // Генерация HTML примера
      }
    }
  };

  // Генерация stack и сохранение в первую папку
  return src(path.svg.srcsvg, { encoding: false })
    .pipe(plumber({
      errorHandler(err) {
        console.error("Ошибка при создании SVG-спрайта:", err);
        this.emit('end'); // Завершить поток
      }
    }))
    .pipe(svgSprite(config))
    .pipe(dest(path.svg.srcmin)) // Папка для stack
    .on('end', () => {
      // Копирование спрайта в другую папку после создания
      src('app/images/sprite.svg', { allowEmpty: true })
        .pipe(dest(path.svg.dest)); // Папка для sprite
    });
}


module.exports = sprite;
