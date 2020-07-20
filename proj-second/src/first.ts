// ! 需要处理最简单的数据单元是: 数字，字符串，结构体，布尔值, undefined和null, void, never
// 此外还提供了实用的枚举类型方便我们使用

// * 布尔值
// * 最基本的数据类型就是简单的true/false值，在ts里叫做boolean

let isDone: boolean = false
console.info(isDone)

// * 数字
// * number类型，和js一样，ts里所有的数字都是浮点数，类型是number
// * 除了支持十进制和十六进制字面量，
// * ts还支持es2015中引入的二进制和八进制字面量
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
console.info(decLiteral);
console.info(hexLiteral);

// * 使用双引号或单引号表示字符串，同时还支持模板字符串
let namex: string = '我的天'
namex = "我是你爹"
console.info(namex)

let sentence: string = `Hello, ${namex}`
console.info(sentence)

// * 数组 ts像js一样可以操作数组元素。有两种方式可以定义数组。
// TODO 第一种是在元素类型后面接上[]，表示由此类型元素组成的一个数组
let list: number[] = [1, 2, 3]
console.info(list[1])

// TODO 第二种是使用数组泛型
let list2: Array<number> = [1, 2, 3, 4]
console.info(list2)

// * 元组
// * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// * 比如，你可以定义一对值分别为string和number类型的元组
let x1: [string, number];
x1 = ["hello", 10];
console.info(x1[0].substr(0, 2))

// * 枚举
// * enum类型是对js标准数据类型的一个补充，枚举类型可以为一组数值赋予友好的名字
enum Color {Red = 2, Green = 10, Blue = 19}
let c: Color = Color.Green
let colorName: string = Color[2]
console.info(Color)
console.info(colorName)

// * 任意值
// * 有时候，我们需要在编程阶段还不清楚类型的变量指定一个类型，这些值，
// * 可能来自于动态的内容，那么我们可以使用any类型来标记这些变量

let notSure: any = 4;
notSure = 123213
notSure = "21312321312321x卧槽"
console.info(notSure)

let prettySure: Object = 4;
// prettySure.toFixed()

// * void空值，和any类型相反，表示没有任何类型
// * 函数定义void类型，不需要返回值

// * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 
// * 和void相似，它们的本身的类型用处不是很大，默认情况下他们是所有类型的子类型
// * 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自

// * Never
// * never类型表示的是那些永不存在的值的类型，never类型是任何类型的子类型

// * 类型断言
// * 类型断言不能将类型断言成联合类型中不存在的类型
// ? 如 let age: string | number ,那么就不能使用 age as boolean
// * 有两种形式，其一是尖括号语法:

let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length;
console.info(strLength)

// * 第二种是as
let strLength2: number = (someValue as string).length + 10;
// strLength2 = "卧槽"
console.info(strLength2)