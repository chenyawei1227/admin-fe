/*
* @Author: Rosen
* @Date:   2016-11-20 13:19:28
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-06-13 23:35:23
* 知识点：css单独打包、全局jquery引用、各种loader
*/

var webpack             = require('webpack');
var path                = require('path');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量, dev, (test), online
var WEBPACK_ENV            = process.env.WEBPACK_ENV || 'dev'; 

// webpack config
var config = {
    entry:{
        'app'       : ['./src/index.jsx']
    },
    externals:{
        '$'         :'window.jQuery',
        'jquery'    :'window.jQuery'
    },
    // path && publickPath
    output: {
        path        : __dirname + '/dist/',
        publicPath  : WEBPACK_ENV === 'online' ? '//s.mmall.com/admin_fe/dist/' : '/dist/',
        filename    : 'js/[name].js'
    },
    resolve: {
        alias: {
            node_modules    : path.join(__dirname, '/node_modules'),
            lib             : path.join(__dirname, '/src/lib'),
            util            : path.join(__dirname, '/src/util'),
            component       : path.join(__dirname, '/src/component'),
            service         : path.join(__dirname, '/src/service'),
            page            : path.join(__dirname, '/src/page'),
        }
    },
    module: {
        // noParse: [],
        rules: [
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback : 'style-loader'
                })
            },
            {test: /\.scss$/, loader: ExtractTextPlugin.extract({
                use: 'css-loader!sass-loader',
                fallback : 'style-loader'
            })},
            {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=20000&name=resource/[name].[ext]'},
            {test: /\.(string)$/, loader: 'html-loader' },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
        ]
    },
    /* 
      * 【新增】：webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面
      *  提出公共部分 
     */
    optimization:{
        runtimeChunk: false,
        splitChunks: {
           cacheGroups: {
              common: {
                    name: "vendors",
                    chunks: "all",
                    minChunks: 2
              }
           }
        }
     },
    plugins: [
        // 单独处理css
        new ExtractTextPlugin('css/[name].css'),
        // html 加载
        new HtmlWebpackPlugin({
            filename        : 'view/index.html',
            title           : '商Mall城 后台管理系统',
            template        : './src/index.html',
            favicon         : './favicon.ico',
            inject          : true,
            hash            : true,
            chunks          : ['vendors', 'app'],
            //chunksSortMode  : 'dependency',
            chunksSortMode  : 'none',
            minify          : {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
    ],
    /* 
      * 【新增】：在v1.0.1版本中新增了devServer的配置，用自带的代理就可以访问接口
      */
    // devServer: {
    //     port: 8086,
    //     proxy : {
    //         '/manage' : {
    //             target: 'http://localhost:8080/mmall_war',
    //             changeOrigin : true
    //         },
    //         '/user/logout.do' : {
    //             target: 'http://localhost:8080/mmall_war',
    //             changeOrigin : true
    //         }
    //     }
    // }
    devServer: {
        port: 8086,
        inline: true,
        proxy : {
           "**/*.do" : {
              target: "http://localhost:8080/mmall_war",
              changeOrigin : true
           }
        }
     }
};


module.exports = config;
