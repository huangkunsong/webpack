/* eslint-disable no-unused-vars */
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const UglifyJSPlagin = require("uglifyjs-webpack-plugin");
//提取css为单独文件,不支持热部署
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = webpack.DefinePlugin;
const HashedModuleIdsPlugin = webpack.HashedModuleIdsPlugin;
module.exports = merge(commonConfig, {
    devtool : "source-map",
    output : {
        filename : "[name].[chunkhash].js",
        path : path.resolve(__dirname, "dist_prod"),
        //devtool : "source-map" 起作用
        sourceMapFilename : "sourcemaps/[name].map",
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ExtractTextPlugin.extract({
                    fallback : "style-loader",
                    use : "css-loader",
                }),
            },
        ],
    },
    plugins : [
        //每次打包清空dist目录
        new CleanWebpackPlugin("dist_prod"),
        new HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename : "style.[chunkhash].css",
            //从所有引用模块中提取,默认只从初始模块提取,使用CommonsChunkPlugin必须指定true
            allChunks : true
        }),
        new UglifyJSPlagin(),
        new DefinePlugin({
            "process.env" : {
                "NODE_ENV" : JSON.stringify("production"),
            },
        }),
    ],
});

