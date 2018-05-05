var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: "./index.js",
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    resolve: { alias: { 'vue': 'vue/dist/vue.js' } },
    plugins: [
    //     new BrowserSyncPlugin({
    //       host:'localhost', // 实时监听，webpack -w 可以实时更新硬盘中的文件js，css
    //       port:8080,
    //       file:'',
    //       server:{
    //         baseDir:'./'
    //       }
    //     }),
    //     new ExtractTextPlugin("index.css"),
    new VueLoaderPlugin(),
    ], // 独立打包样式文件
    module: {
        rules: [
         { test: /\.css$/, loader: "style-loader!css-loader"},
         { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" },
         { test: /\.vue$/, loader: "vue-loader"}, // 所有.vue结尾的文件，使用vue-loader
        ]
    }
};