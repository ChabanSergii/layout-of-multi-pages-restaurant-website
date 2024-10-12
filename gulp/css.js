/* Use only recommended task version for good work */
const {src, dest}       = require('gulp');


/* Configs */
const path              = require('../config/path.js');
const app               = require('../config/app.js');


/* Error notification */
const plumber           = require('gulp-plumber');
const notify            = require('gulp-notify');


/* Plugins */
const concat            = require('gulp-concat');
const cssimport         = require('gulp-cssimport')
const autoprefixer      = require('gulp-autoprefixer');         /* !!! use only 8.0.0 !!! */
const csso              = require('gulp-csso');
const size              = require('gulp-size');                 /* !!! use only 4.0.1 !!! */
const rename            = require('gulp-rename');
const cssMedia          = require('gulp-group-css-media-queries');
const webpCss           = require('gulp-webp-css');
const replace           = require('gulp-replace');


/* CSS */
function css() {
    return src([path.css.src], { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "CSS",
                message: error.message
            }))
        }))
        .pipe(concat("main.css"))
        .pipe(cssimport())
        .pipe(autoprefixer())
        .pipe(cssMedia())
        .pipe(size({ title: "main.css" }))
        .pipe(
			replace(
				/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
				'$1$2$3$4$6$1'
			)
		)
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))

        /* Minify css */
        .pipe(rename({ suffix: ".min" }))
        .pipe(csso())
        .pipe(size({ title: "main.min.css" })) 
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))

        
        /* .pipe(dest(path.css.srcapp, { sourcemaps: app.isDev })) */
}


module.exports = css;