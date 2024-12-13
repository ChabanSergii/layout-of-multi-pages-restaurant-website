const {src, dest} = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const path = require('../config/path.js');

function sprite() {
  const config = {
    mode: {
      stack: {
        sprite: '../sprite.svg', // Path to the sprite file
        example: true // Generate an HTML example
      }
    },
    shape: {
      transform: [
        {
          svgo: {
            plugins: [
              {
                name: 'removeAttrs',
                params: {
                  attrs: '(fill|stroke)', // Remove fill and stroke by default
                }
              }
            ]
          }
        }
      ],
      meta: file => {
        // Skip removing attributes for files starting with "decor"
        const fileName = file.match(/[^/\\]+$/)[0]; // Extract file name
        if (/^decor/i.test(fileName)) {
          return {removeAttrs: false};
        }
        return {};
      }
    }
  };

  // Generate stack sprite and save it in the first folder
  return src(path.svg.srcsvg, {encoding: false})
    .pipe(
      plumber({
        errorHandler(err) {
          console.error('SVG sprite creation error:', err);
          this.emit('end'); // End the stream
        }
      })
    )
    .pipe(svgSprite(config))
    .pipe(dest(path.svg.srcmin)) // Folder for the stack sprite
    .on('end', () => {
      // Copy sprite to another folder after creation
      src(`${path.svg.srcmin}/sprite.svg`, {allowEmpty: true})
        .pipe(dest(path.svg.dest)); // Destination folder for the sprite
    });
}

module.exports = sprite;
