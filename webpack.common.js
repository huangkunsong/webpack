const path = require("path");
const webpack = require("webpack");
const HtmlwebpackPlugin = require("html-webpack-plugin");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    // 基础目录,entry 和 module.rules.loader相对此路径解析
    context : __dirname,
    //设置模块解析
    resolve : {
        //对引用的模块起别名,直接使用别名引用模块
        alias : {
        
        },
        //引入文件时可以不指定后缀,自动解析的扩展后缀.
        extensions : [".js", ".jsx", ".json"],
        //设置引入模块的搜索地址
        modules : [path.resolve("src"), "node_modules"]
    },
    //防止将某些 import 的包(package)打包到 bundle 中
    // 而是在运行时(runtime)再去从外部获取这些扩展依赖
    externals : {
        /*//从全局获取jquery
        jquery : "$",*/
    },
    entry : {
        index : path.resolve("src/js/index.js"),
    },
    module : {
        //设置忽略解析的文件,支持正则
        /*noParse : [""],*/
        rules : [
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
        //打包自动构建对应的html,可使用html-webpack-template配置生成的html模板
        new HtmlwebpackPlugin({
            title : "build",
        }),
        //提取所有打包公共部分
        new CommonsChunkPlugin("vendor"),
    ],
};

