/* eslint-disable no-unused-vars */
const path = require("path");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context : __dirname, // entry 和 module.rules.loader相对次路径解析
    devtool : "inline-source-map",
    devServer : {
        contentBase : "dist",
    },
    resolve : {
        /*modules : [
            "node_modules",
            path.resolve(__dirname, "js"),
        ],
        extensions : [".js", ".json", ".jsx", ".css"],
        alias : {
            b : path.resolve(__dirname, "js/t/b.js"),
        },*/
    },
    
    
    externals : [], //不打包这些模块
    stats : "normal",  //控制打包时输出的信息
    entry : {
        index : "./src/js/index.js",
    },
    output : {
        filename : "[name].[chunkhash].js",
        path : path.resolve(__dirname, "dist"),
        sourceMapFilename : "sourcemaps/[name].map", //devtool : "source-map" 起作用
        /*publicPath : "/aaa/",*/   //输出解析文件的目录
        chunkFilename : "[chunkhash].js",
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    "style-loader",
                    "css-loader",
                ],
                /*include : [
                    path.resolve(__dirname, "app"),
                ],
                exclude : [
                    path.resolve(__dirname, "app/demo-files"),
                ],*/
                //test配置正则匹配,include和exclude配置绝对路径,exclude优先test和include
            },
            {
                test : /\.(png|jpg|gif)$/,
                use : [
                    {
                        loader : "url-loader",
                        options : {
                            limit : 8192,
                        },
                    },
                ],
            },
        ],
    },
    plugins : [
        //每次打包清空dist目录
        new CleanWebpackPlugin(["dist"]),
        //打包自动构建对应的html,可使用html-webpack-template配置生成的html模板
        new HtmlwebpackPlugin({
            title : "test output index",
        }),
        //提取所有打包公共部分
        new Webpack.optimize.CommonsChunkPlugin("vendor"),
    ],
};

