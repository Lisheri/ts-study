const gulp = require('gulp');
// const ts = require('gulp-typescript')
// const tsProject = ts.createProject("tsconfig.json")

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify'); // watchify可以在后台编译并且实现热更新
const uglify = require('gulp-uglify'); // Uglify帮你压缩代码，将花费更少的时间去下载它们。
const sourcemaps = require("gulp-sourcemaps");
const buffer = require('vinyl-buffer');
const tsify = require('tsify');
const gutil = require('gulp-util');

const paths = {
    pages: ['src/*.html']
}

// * 将browserify实例包裹在watchify的调用里，控制生成的结果
const watchedBrowserify = watchify(browserify({
    basedir: ".", // 基本路径
    debug: true, // 是否允许直接对ts文件debugger
    /* 
        注意，我们为Broswerify指定了debug: true。 
        这会让 tsify在输出文件里生成source maps。 
        source maps允许我们在浏览器中直接调试TypeScript源码，而不是在合并后的JavaScript文件上调试。
    */
    entries: ['src/main.ts'], // 入口
    cache: {},
    packageCache: {}
}).plugin(tsify));


function bundle() {
    return watchedBrowserify
        // .transform('babelify', {
        //     presets: ['es2015'],
        //     extensions: ['.ts']
        // })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
}
// gulp.task("default", ["copy-html"], bundle);
// 在gulp4.x中task只有两个参数，不能像上面这样操作
/* 需要使用以下两个函数
    * gulp.series：按照顺序执行
    * gulp.paralle：可以并行计算
*/
// gulp.task("default", gulp.series('copy-html', bundle))
gulp.task("copyHtml", function () {
    return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});
gulp.task("task2", bundle)
gulp.task("default", gulp.series('copyHtml', 'task2'));

// * 调用watchedBrowserify.on("update", bundle); 每次TypeScript文件改变时Browserify会执行bundle函数
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("update", function () {
    return gulp.src(paths.pages).pipe(gulp.dest("dist"));
})
// * 调用watchedBrowserify.on("log", gutil.log); 将日志打印到控制台
watchedBrowserify.on("log", gutil.log);


// gulp.task("default", function() {
//     return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
// })