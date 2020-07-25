// * 可索引的类型

/* 
    * 与试用接口描述函数类型差不多，我们也可以描述那些能够"通过索引得到"的类型，比如 a[10]
    * 或者ageMap["daniel"]。可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引
    * 返回值类型
*/

interface StringArray {
    [index: number]: string
}

// ? 定义了一个StringArray接口，该接口具有一个索引签名，表示用number去索引string值
// ? 相当于规范了一个字符串数组
// ! 实际上ts支持两种索引签名: 字符串和数字。可以同时使用两种类型的索引，
// ! 但是数字索引的返回值必须是字符串索引返回值类型的子类型。这是因为使用number来索引的时候
// ! js会将他转变成为string然后再去索引对象
// ! 也就是说 100(number) 去索引等同于使用 "100"(string) 去索引，因此两者需保持一致

let myArray: StringArray;
myArray = ["Bob", "Fred"]

let myStr: string = myArray[0]

class Animal {
    aName: string;
    constructor(aName: string) {
        this.aName = aName
    }
}
class Dog extends Animal {
    breed: string;
    constructor(breed: string) {
        super();
        this.breed = breed
    }
}

// ! 错误: 使用数值行的字符串索引，有时会得到完全不同的Animal
// ! 因为Animal是数字索引，但是10和 "10"是一样的索引，这样造成了如果再Dog中使用了"10"表示了一个breed
// ! 但是Animal中，并没有breed属性，因此再Animal中使用10索引，就会出问题
/* interface NotOkay {
    [x: number]: Animal
    [x: string]: Dog
} */

// TODO 但是可以这样，number可以取代string索引，但是dog中有的animal中都有，就可以
interface Okay {
    [x: number]: Dog,
    [x: string]: Animal
}

// ! 因为索引会确保所有属性与返回值类型相匹配，因为字符串索引声明了obj.property和obj["property"]
// ! 两种形式都可以。

interface NumberDictionary {
    [index: string]: number;
    length: number; // 与索引返回值相同
    // name: string; // ! 直接就是报错，因为和索引返回值不同，会触发类型检查报错
}

// !　可以给索引签名设置为只读，就防止给索引赋值

interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray1: ReadonlyStringArray = ["Alice", "Bob"];
// myArray1[2] = "Mallory"; // ! 直接就是报错，因为接口索引签名是只读属性，无法对内部赋值
