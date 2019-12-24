const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry   : {
        app : './src/Application.js',
    },
    plugins : [
        new HtmlWebpackPlugin({
            title    : 'webpack 4 production',
            template : './src/index.html',
            filename : 'index.html'
        }),
    ],
    output  : {
        filename : 'js/[name].[hash:8].js',
        path     : path.resolve(__dirname, '../dist')
    },
    resolve : {
        extensions : ['.js', '.css', '.scss', '.less', '.woff2']
    },
    module  : {
        rules : [
            {
                test    : /\.js$/,
                use     : 'babel-loader',
                exclude : path.resolve(__dirname, '../node_modules'),
                include : path.resolve(__dirname, '../src')
            },
            {
                test    : /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader  : 'url-loader',
                include : path.resolve(__dirname, '../src/assets'),
                options : {
                    limit : 1024,
                    name  : 'assets/fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test    : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader  : 'url-loader',
                exclude : /fonts?/,
                options : {
                    limit : 4096,
                    name  : 'assets/images/[name].[hash:7].[ext]'
                }
            },
            {
                test    : /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader  : 'url-loader',
                options : {
                    limit : 4096,
                    name  : 'assets/media/[name].[hash:7].[ext]'
                }
            },
        ]
    }
};
