/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');
const gulp              = require('gulp');


/* Configs */
const paths             = require('../config/path.js');
const path              = require('path');
const fs                = require('fs'); // Модуль для работы с файловой системой


/* Plugins */
const ffmpeg            = require('fluent-ffmpeg');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Video */
function processVideos(done) {
  // Проверяем, существует ли папка для вывода, и создаем её, если нет
  if (!fs.existsSync(paths.video.dest)) {
    fs.mkdirSync(paths.video.dest, { recursive: true });
  }

  gulp.src(paths.video.src)
    .on('data', (file) => {
      const baseName = path.basename(file.path, path.extname(file.path)); // Имя файла без расширения
      ffmpeg(file.path)
        .output(path.join(paths.video.dest, `${baseName}.mp4`)) // Вывод MP4
        .outputOptions(['-vf scale=1280:720']) // Масштабируем видео для MP4
        .output(path.join(paths.video.dest, `${baseName}.webm`)) // Вывод WebM
        .outputOptions(['-vf scale=1280:720']) // Масштабируем видео для WebM
        .output(path.join(paths.video.dest, `${baseName}.ogv`)) // Вывод OGV
        .outputOptions(['-vf scale=1280:720']) // Масштабируем видео для OGV
        /* .size('1280x720')
        .videoBitrate('1000k') */
        .on('end', () => console.log(`Обработано видео: ${baseName} в нескольких форматах`))
        .on('error', (err) => console.error(`Ошибка: ${err.message}`))
        .run();
    });
  done();
}


module.exports = processVideos;
