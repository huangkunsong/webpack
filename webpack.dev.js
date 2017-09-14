const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const webpack = require("webpack");
//模块热部署,entry中的filename不能使用chunkhash
const HostModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

module.exports = merge(commonConfig, {
    devtool : "inline-source-map",
    devServer : {
        contentBase : "./dist_dev",
        //热模块
        hot : true,
        //启动gzip压缩
        compress : true,
    },
    output : {
        filename : "[name].js",
        path : path.resolve(__dirname, "dist_dev"),
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    "style-loader",
                    "css-loader",
                ],
                exclude : /node_modules/,
            },
        ],
    },
    plugins : [
        //每次打包清空dist目录
        new CleanWebpackPlugin("dist_dev"),
        new HostModuleReplacementPlugin(),
    ],
});

