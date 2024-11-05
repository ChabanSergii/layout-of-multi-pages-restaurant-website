// faviconTasks.js
const gulp                = require('gulp');
const realFavicon         = require('gulp-real-favicon');
const fs                  = require('fs');
const glob                = require('glob');

// Configs
const paths               = require('../config/path.js');
const FAVICON_DATA_FILE   = './config/faviconData.json';


// Генерация фавиконок

function generateFavicon(done) {
  realFavicon.generateFavicon({
    masterPicture: './app/images/favicon/g.svg',
    dest: paths.favicon.dest,
    iconsPath: '',
    design: {
      ios: { pictureAspect: 'noChange' },
      desktopBrowser: {},
      windows: { pictureAspect: 'noChange', backgroundColor: '#da532c', onConflict: 'override' },
      androidChrome: { pictureAspect: 'noChange', themeColor: '#ffffff', manifest: { name: 'My App', display: 'standalone' } },
      safariPinnedTab: { pictureAspect: 'blackAndWhite', threshold: 60, themeColor: '#5bbad5' }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, done);
}

// Внедрение HTML кода фавиконок в HTML файлы

function injectFaviconMarkup(done) {
  // Проверяем наличие файла faviconData.json
  if (!fs.existsSync(FAVICON_DATA_FILE)) {
    console.log("РАНО ЕЩЕ ДЕЛАТЬ ИНЪЕКЦИИ");
    done(); // Завершаем задачу
    return;
  }

  // Ищем все HTML-файлы в каталоге dist
  const htmlFiles = glob.sync('dist/*.html');

  // Проверяем, есть ли хоть один HTML-файл
  if (htmlFiles.length === 0) {
    console.log("РАНО ЕЩЕ ДЕЛАТЬ ИНЪЕКЦИИ: HTML файлы не найдены");
    done(); // Завершаем задачу
    return;
  }

  // Если faviconData.json и HTML-файлы существуют, выполняем инъекцию
  return gulp.src(htmlFiles)
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('dist'))
    .on('end', done); // Сигнализируем о завершении
}


//Проверка на устаревшую фавиконку
function checkForFaviconUpdate(done) {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, (err) => {
    if (err) throw err;
  });
  done();
}

// Экспорт функций для использования в gulpfile.js
module.exports = {
  generateFavicon,
  injectFaviconMarkup,
  checkForFaviconUpdate
};
