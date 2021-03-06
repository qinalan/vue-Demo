const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';
const devServer = {
    port: 8080,
    host: 'localhost',
    open: true,
    hotOnly: true,
    overlay: {
        errors: true
    },
    historyApiFallback: {
        index: '/index.html'
    },
    proxy: {
        '/user': {
            target: 'http://localhost:3000/',
            changeOrigin: true
        }
    }
};

const defaultPlugins = [
    new VueLoaderPlugin(),
    new HtmlPlugin({
        template: path.join(__dirname, 'template.html')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? "'development'" : "'production'"
        }
    })
];

let config;

if (isDev) {
    config = merge(baseConfig, {
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ]),
        devtool: '#cheap-module-eval-source-map'
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/main.js')
        },
        output: {
            filename: '[name].js'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        name: 'commons',
                        chunks: 'initial',
                        minSize: 0,
                        minChunks: 2,
                        maxInitialRequests: 5
                    },
                    vendor: {
                        test: /node_module/,
                        name: 'vendor',
                        chunks: 'initial',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            runtimeChunk: true
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({
                // filename: '[name].[contenthash:8].css'
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ])
    });
}

module.exports = config;
