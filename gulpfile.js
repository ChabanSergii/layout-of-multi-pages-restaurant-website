/* Use only recommended task version for good work */
const {src, dest, watch, parallel, series} = require('gulp');
const browserSync                          = require('browser-sync').create();


/* Configs */
const path          = require('./config/path.js');
const app           = require('./config/app.js');
/* const gp = require("gulp-load-plugins")(); useful plugin for minify code */


/* Plugins */
const clear         = require('./gulp/clear.js');
const pug           = require('./gulp/pug.js');
const page          = require('./gulp/page.js');
const fonts         = require('./gulp/fonts.js');
const images        = require('./gulp/images.js');
const sprite        = require('./gulp/svg.js');
const css           = require('./gulp/css.js');
const scss          = require('./gulp/scss.js');
const scripts       = require('./gulp/scripts.js');
const avifimg       = require('./gulp/avif.js');
const fontsToCSS    = require('./gulp/fontsToCSS.js');
const fontsToSASS   = require('./gulp/fontsToSASS.js');
const processVideos = require('./gulp/video.js');
const todo          = require('gulp-todo');
const { generateFavicon, injectFaviconMarkup, checkForFaviconUpdate } = require('./gulp/favicon.js');


// Creating TODO.md
function todoFinder() {
  return src([path.js.todo, path.scss.todo, path.page.todo])
      .pipe(todo({
          fileName: 'TODO.md',       // Название файла со списком задач
          verbose: true              // Показывать в консоли список найденных TODO
      }))
      .pipe(dest(path.app));         // Сохранение в корне проекта
};


/* Launching tasks based on changes */
function watching() {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
    /* watch([path.css.watch], css).on('all', browserSync.reload) */
    watch([path.img.watch], images).on('all', browserSync.reload)
    watch([path.svg.watch], sprite).on('all', browserSync.reload)
    watch([path.video.watch], processVideos).on('all', browserSync.reload)
    watch([path.fonts.watch], fonts).on('all', browserSync.reload)
    watch([path.js.watch], scripts).on('all', browserSync.reload)
    watch([path.page.app]).on('change', browserSync.reload)                 /* for pug and page tasks */
    watch([path.page.components, path.page.watch], page).on('all', browserSync.reload)
    watch([path.scss.watch], scss).on('all', browserSync.reload)
    watch([path.js.todo, path.scss.todo, path.page.todo], todoFinder)
    /* If use PUG */
    /* watch([path.pug.watch], pug).on('all', browserSync.reload) */
}


/* Constructor */
function building() {
    return src([
        'app/css/*.css',
        'app/js/*.min.js',
    ], {base : './app'})
        .pipe(dest('./dist'))
}


/* If use CSS */
/* const build = series(
    clear,
    parallel(page, css, scripts, sprite, images, fonts, fontsToCSS, processVideos),
    series(generateFavicon, injectFaviconMarkup, checkForFaviconUpdate),
    parallel(building),
); */

const build = series(
    clear,
    parallel(page, scss, scripts, sprite, images, fonts, fontsToSASS, processVideos),
    series(injectFaviconMarkup, checkForFaviconUpdate),
    parallel(building),
    todoFinder,
);

const dev   = series(
    build,
    parallel(watching)
);


/* Tasks */
exports.css           = css;
exports.scss          = scss;
exports.images        = images;
exports.avifimg       = avifimg;
exports.sprite        = sprite;
exports.generateFavicon          = generateFavicon;
exports.injectFaviconMarkup      = injectFaviconMarkup;
exports.checkForFaviconUpdate    = checkForFaviconUpdate;
exports.fonts         = fonts;
exports.fontsToCSS    = fontsToCSS;
exports.fontsToSASS   = fontsToSASS;
exports.page          = page;
exports.pug           = pug;
exports.building      = building;
exports.scripts       = scripts;
exports.watching      = watching;
exports.clear         = clear;
exports.processVideos = processVideos;
exports.todoFinder    = todoFinder;

/* Project assembly */
/* gulp // gulp --production */
/* npm start // npm run build // npm run deploy*/
exports.default  = app.isProd
    ? build
    : dev;

