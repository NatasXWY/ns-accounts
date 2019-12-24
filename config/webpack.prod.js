const merge                   = require('webpack-merge');
const common                  = require('./webpack.common.js');
const {CleanWebpackPlugin}    = require('clean-webpack-plugin');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const UglifyJsPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const darkTheme               = require('@ant-design/dark-theme');

module.exports = merge(common, {
    mode         : 'production',
    devtool      : 'source-map',
    plugins      : [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename : 'assets/css/[name].[chunkhash:8].css',
            // chunkFilename: 'css/[name]-[id].[chunkhash:8].css',
        }),
    ],
    optimization : {
        minimizer : [
            new UglifyJsPlugin({
                cache         : true,
                parallel      : false,
                sourceMap     : false,
                uglifyOptions : {
                    output : {
                        ascii_only : true
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        // splitChunks:{
        //     minChunks: 2,
        //     cacheGroups: {
        //         vendor: {
        //             name: 'vendor',
        //             chunks: 'initial',
        //             test: /[\\/]node_modules[\\/]/
        //         }
        //     }
        // }
    },
    module       : {
        rules : [
            {
                test    : /\.scss$/,
                exclude : /node_models/,
                use     : [
                    {
                        loader  : MiniCssExtractPlugin.loader,
                        options : {}
                    },
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
                test : /\.css$/,
                use  : [
                    {
                        loader  : MiniCssExtractPlugin.loader,
                        options : {}
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test : /\.less$/,
                use  : [
                    {
                        loader  : MiniCssExtractPlugin.loader,
                        options : {}
                    },
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
    },
    performance  : {
        hints : false
    }
});
