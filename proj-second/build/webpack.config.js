const HtmlWebpackPlugin = require("html-webpack-plugin") // 清理一些指定的文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 指定一个编译的模型

// 使用node模块
module.exports = {
    // 项目编译的入口文件
    entry: "./src/index.ts",
    output: {
        filename: "main.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // 配置一些对指定文件的处理
    // 匹配后缀为ts或tsx的文件
    // 使用exclude来排除一些文件
    module: {
        rules: [
            {
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