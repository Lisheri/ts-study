const HtmlWebpackPlugin = require("html-webpack-plugin") // 清理一些指定的文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 指定一个编译的模型
const path = require("path")

// 使用node模块
module.exports = {
    // 项目编译的入口文件
    // * 入口起点指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。
    // * 进入入口起点后，webpack会找出有哪些模块和库是入口起点(直接或间接)依赖的
    // * 可以指定一个或多个入口起点
    // * 默认值是/src/index.js
    entry: "./src/index.ts",

    // * output属性告诉webpack在哪里输入它所创建的bundle，以及如何命名这些文件。主要输入文件的默认值是./dist/main.js
    // * output.path告诉webpack bundle想要bundle生成在哪里，output.filename告诉webpack bundle 生成的文件叫什么名字
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // 配置一些对指定文件的处理
    // 匹配后缀为ts或tsx的文件
    // 使用exclude来排除一些文件
    // * webpack只能理解JavaScript和JSON文件，这是webpack开箱可用的自带能力。
    // * loader让webpack能够去处理其他类型的文件，并将他们转换为有效模块，以供应用程序使用，以及被添加到依赖图中
    module: {
        // * 在rules中必须包含两个属性，一个是test，一个是use
        // ? test属性，识别出哪些文件会被转换
        // ? use属性，定义出在进行转换时，应该使用哪个loader
        rules: [
            {
                // ! 注意，使用正则匹配文件，不能添加引号，不带引号表示匹配任何以.xxx结尾的文件，带了引号表示匹配具有绝对路径'.xxx'的单个文件
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    // 这个参数就可以在webpack中获取到了
    devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
    devServer: {
        // 这个本地开发环境运行时是基于哪个文件夹作为根目录
        contentBase: './dist',
        // 当你有错误的时候在控制台打出来
        stats: 'errors-only',
        // 不启动压缩
        compress: false,
        host: 'localhost',
        port: "8081"
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist']
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html'
        })
    ]
}