const { src, dest } = require('gulp');
const csso          = require('gulp-csso'); // Правильный импорт gulp-csso
const uglify        = require('gulp-uglify-es').default; // Исправленный импорт gulp-uglify-es


// Пути к файлам
const paths = {
    leafletCSS: 'node_modules/leaflet/dist/leaflet.css',
    leafletJS: 'node_modules/leaflet/dist/leaflet.js',
    dist: {
        css: 'dist/css',
        js: 'dist/js',
    }
};


// Обработка CSS
function buildLeafletCSS() {
    return src(paths.leafletCSS)
        .pipe(csso()) // Минифицируем CSS с использованием gulp-csso
        .pipe(dest(paths.dist.css)); // Сохраняем в папку dist
}


// Обработка JS
function buildLeafletJS() {
    return src(paths.leafletJS, { sourcemaps: true }) // Включаем sourcemaps
        .pipe(uglify()) // Минифицируем JS
        .pipe(dest(paths.dist.js, { sourcemaps: '.' })); // Сохраняем JS с картами
}


// Экспорт функций для использования в gulpfile.js
module.exports = {
    buildLeafletCSS,
    buildLeafletJS,
};
