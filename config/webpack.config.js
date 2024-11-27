const config = {
    mode: 'production',
    entry: {
        index: './app/js/index.js',
        custom_select: './app/js/custom_select.js',
        video_player: './app/js/video-player.js',
        view_more: './app/js/view-more.js',
        scrollToTop: './app/js/scrollToTop.js',
        form_validation: './app/js/form-validation.js',
        /* bootstrapMin: './node_modules/bootstrap/dist/js/bootstrap.min.js', */
        /* new-page-name: './app/js/new-page-name.js', */
    },
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
              test:/\.css$/,
              use: ['style-loader', 'css-loader'],
            },
        ],
    },
};

module.exports = config;
