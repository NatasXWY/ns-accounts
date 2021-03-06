const path      = require('path');
const merge     = require('webpack-merge');
const common    = require('./webpack.common.js');
const webpack   = require('webpack');
const darkTheme = require('@ant-design/dark-theme');

module.exports = merge(common, {
    mode      : 'development',
    devtool   : 'inline-source-map',
    devServer : {
        contentBase : path.resolve(__dirname, '../dist'),
        hot         : true,
        port        : 9000,
        overlay     : {
            warnings : false,
            errors   : true
        }
    },
    plugins   : [
        new webpack.HotModuleReplacementPlugin(),   //启用HMR,配合server的hot
    ],
    module    : {
        rules : [
            {
                test : /\.scss$/,
                exclude : /node_models/,
                use  : [
                    'style-loader',
                    {
                        loader  : 'css-loader',
                        options : {
                            modules : {
                                localIdentName : '[path][name]--[local]--[hash:base64:5]'
                            },
                        }
                    },
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test    : /\.css$/,
                use     : [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test : /\.less$/,
                use  : [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                    {
                        loader  : 'less-loader',
                        options : {modifyVars : darkTheme}
                    }
                ]
            }
        ]
    }
});
