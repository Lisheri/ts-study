const HtmlWebpackPlugin = require("html-webpack-plugin") // 指定一个编译的模型
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 清理一些指定的文件夹
const Webpack = require('webpack')
const path = require("path")

// 使用node模块
module.exports = {
    // ! chunk并不是bundle，chunk表示在打包过程中，一堆module的集合，而bundle是chunk构建完成后，生成的结果代码块
    // ! 一个打包路径就会形成一个chunk
    // ! 出了入口entry就会产生chunk
    // ? 无论是用字符串的entry还是数组的entry，都只会产生一个chunk
    // ? 但如果使用对象entry，有几个入口，就必须要几个出口，并且产生几个chunk，生成几个bundle，其中entry的key就作为chunk的名称

    // ! 异步加载模块也会产生chunk
    // ? 有时候只有一个入口，但是出口不仅有一个filename还有一个chunkFilename，在异步加载模块的时候，chunkFilename就是为异步加载的chunk命名

    // ! 代码分割，也会产生chunk



    // 项目编译的入口文件
    // * 入口起点指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。
    // * 进入入口起点后，webpack会找出有哪些模块和库是入口起点(直接或间接)依赖的
    // * 可以指定一个或多个入口起点
    // * 默认值是/src/index.js

    // TODO 单个入口简写, entry: string | [string]
    // TODO 如果向entry传递一个数组，将创建一个多主入口，可以一次注入多个依赖文件，并且将他们的依赖导向(graph)到一个chunk
    // TODO 只有一个字符串表示是单个入口
    // entry: "./src/index.ts",
    
    // 对象语法, entry: { <entryChunkName> string | [string] }
    // 有几个入口，就要对应几个出口
    entry: {
        app: './src/app.ts',
        adminApp: './src/adminApp.ts'
    },

    // * output属性告诉webpack在哪里输入它所创建的bundle，以及如何命名这些文件。主要输入文件的默认值是./dist/main.js
    // * output.path告诉webpack bundle想要bundle生成在哪里，output.filename告诉webpack bundle 生成的文件叫什么名字
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].main.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    // TODO 通过CLI使用loader
    // webpack --module-bind pug-loader --module-bind 'css=style-loader!css-loader'
    // 这会对.jade(模板引擎)文件使用pug-loader并且对.css文件使用style-loader和css-loader

    // TODO 内敛方式使用loader
    // import Styles from 'style-loader!css-loader?modules!./style.css';
    // ? 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)
    // ? 使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）
    // ? 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders

    // TODO 配置方式使用loader
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
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less?$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss?$/,
                use: ['style-loader', 'css-loader', 'scss-loader']
            }
        ]
    },
    // 这个参数就可以在webpack中获取到了
    devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
    devServer: {
        // 这个本地开发环境运行时是基于哪个文件夹作为根目录
        contentBase: path.resolve(__dirname, 'src'),
        // 当你有错误的时候在控制台打出来
        stats: 'errors-only',
        // 对所有模块执行gzip压缩
        compress: true,
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist']
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html'
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],
    // 模式
    // * 通过选择development, production或者是none中的一个，来设置mode参数，可以启用webpack内置在相应环境下的优化，默认值为production
    mode: "production",
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'dist'), // 指定托管的根目录
    //     hot: true,
    //     open: true, // 是否自动打开浏览器
    //     port: 3000, // 设置自动打开的端口号
    //     compress: true, // 对所有模块执行gzip压缩

    // },
    
    // 由于 JavaScript 即可以编写服务端代码也可以编写浏览器代码，所以 webpack 提供了多种部署 target，你可以在 webpack 的配置选项中进行设置。
    // target: "node"
    // * 上述示例中，target为node，webpack将在类Node.js环境编译代码。(使用node.js的require加载chunk，而不加载任何内置模块，如fs或path)
    // target默认为web

    // 虽然 webpack 不支持 向 target 属性传入多个字符串，但是可以通过设置两个独立配置，来构建对 library 进行同构


    // ! runtime
    /* runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。
    它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。 */

    // ! mainfist
    /* 当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，
    当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。
    无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，
    此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。*/
}