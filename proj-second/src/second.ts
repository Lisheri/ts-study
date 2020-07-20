// * 接口(interface)
// * ts的核心原则之一是对值所具有的街构进行类型检查。
// * 它有时被称作"鸭式辩型法" 或 "结构性子类型化"。 在ts里面，接口的作用就是为这些类型命名和
// * 为你的代码或第三方代码定义契约

interface printLabelObject {
    label: string
}
function printLabel(labelledObj: printLabelObject) {
    console.info(labelledObj.label);
}

let testObj = {
    size: 10,
    label: "你爹赚了10个亿"
}

printLabel(testObj)

// * 接口好比一个名字，用来描述上面例子里的要求
// * 它代表了有一个label属性且类型为string的对象
// ! 注意：此处并不能像其它语言里一样，说传给printLabel的对象实现了这个接口
// ! 我们只关注值的外形，只要传入的对象满足上面提到的必要条件，那么它就是被允许的

// ! 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就还可以

// * 可选属性
// * 接口里的属性并不是全是必需的，有些是只在某些条件下存在，或者根本不存在。
// * 可选属性只需要在属性名字后面加一个 "?" 即可
// * 当然，不存在的属性还是不能使用的

interface SquareConfig {
    color?: string,
    width?: number
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = Math.pow(config.width, 2)
    }
    return newSquare
}

let mySquare = createSquare({color: "black"})
console.info(mySquare)

// * 定义只读属性，表示只能在初始化的时候赋值，之后不能在改变
interface Point {
    readonly x: number,
    readonly y: number
}

let p1: Point = {
    x: 10, y: 30
}

console.info(p1.x)

// ? TS具有readonlyArray<T>类型，和Array<T>相似，
// ? 但是内部所有的字段都是只读属性，创建后的数组不能再修改
// ? 包括所有修改数组的方法都不能使用
// ? 不能把只读数组赋值给普通数组
// ? 但是可以使用断言
let a1: number[] = [1, 2, 3, 4]
let rd: ReadonlyArray<number> = [10, 20, 30]

let c1: number[];
// c1 = rd // * 这样会报错
// * 但是可以使用类型断言重写数组
// * 作为变量使用const声明，作为属性使用readonly赋值
c1 = rd as number[]
console.info(c1)

// ! 使用接口的时候，如果传入一个接口中没有声明的属性，会因为类型检查到不存在的属性而报错，因为不存在该属性
// ! 但是可以使用类型断言，绕开这样的类型检查
let mySquare2 = createSquare({color: "black", opacity: 0.5} as SquareConfig)
console.info(mySquare2)

// ! 然而，最好的方式，是添加一个字符串索引签名，这样就可以把这些属性作为额外的属性
interface SquareConfig2 {
    color?: string,
    width?: number,
    [propName: string]: any
}

function createSquare2(config: SquareConfig2): {color: string; area: number} {
    let newSquare = {color: "red", area: 1000};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = Math.pow(config.width, 2)
    }
    // if (config.opacity) {
    //     newSquare.opacity = config.opacity
    // }
    return newSquare
}

let mySquare3 = createSquare2({color: "black", opacity: 0.5})
console.info(mySquare3)
