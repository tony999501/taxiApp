var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',
    entry : {
        app:'./src/app.js',
        vue: [
            'vue',
            'vue-router'
        ],
        lib:[
            'future-js',
            'axios'
        ],
        eleme:[
            'element-ui'
        ]
    },
    output:{
        // path : path.resolve(__dirname,'./taxiAdmin'),
        path : path.resolve(__dirname,'./taxiAdmin'),
        filename:'[name].js',
         //publicPath:'https://www.camclaim.cn/img/taxiAdmin/'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib','vue','app','eleme'],
            minChunks:Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //js压缩，发布时启用
        new webpack.optimize.UglifyJsPlugin({
           minimize: true,
           compress: {
                warnings: false
            }
        }),
        //发布时增加文件名hash
        new ExtractTextPlugin('css/style.css'),
        new  HtmlWebpackPlugin({
            template :'./index.html'
        })
    ],
    module:{
        rules:[
            { 
                test: /\.vue$/,
                use:[
                    {
                        loader: 'vue-loader',
                        options:{
                           loaders:{
                                scss:'style-loader!css-loader!sass-loader'
                           }
                        }
                    }
                ]
            },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test:   /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader?resolve url'
            },
            {
                test : /\.scss$/,
                use:[
                    {loader:'style-loader'},
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    },
                    {loader:'postcss-loader'},
                    {loader:'sass-loader'}
                ]
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=img/[name].[ext]'},
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'url-loader'
            },
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
            {
                test: /vue-scroller.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ 
                    use:[
                        'css-loader',
                        'postcss-loader'
                    ]
                }),
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
}