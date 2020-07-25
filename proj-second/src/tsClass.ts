// ! 类类型
// ? 实现接口
// ? 与c#或java里接口的基本作用一样，ts也能够用它来明确的
// ? 强制一个类去符合某种契约

/* interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m:number) {
        // this.h = h;
        // this.m = m;
    }
} */

// ? 可以再接口中描述一个方法，再类里面实现它，如下所示
/* interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d
    }
    constructor(h: number, m: number) {}
} */

// ? 接口描述了类的公共部分，而不是公共和私有两部分。
// ? 它不会帮你检查类是否具有某些私有成员

// ! 类静态部分与实例部分的区别

/* 
    当你操作类和接口的时候，你要知道类是具有两个类型的: 静态部分的类型和实例的类型
    当你用构造器签名去定义一个接口并视图定义一个类去实现这个接口时会得到一个错误
*/

/* interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) {}
} */
// ? 这里因为当类实现了一个接口的时候，只对其实例部分进行类型检查。constructor存在于
// ? 类的静态部分，所以不在检查的范围内
// ? 因此，我们应该直接操作类的静态部分

// ? 在下面，定义了两个接口，ClockContructor为构造函数所用和ClockInterface为实例方法所用
// ? 为了方便我们定义一个构造函数createClock，它用传入的类型创建实例

interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.info("beep beep")
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.info("tick tock")
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// ? 因为createClock的第一个参数是ClockConstructor类型，在createClock(AnalogClock, 7, 32)里
// ? 会检查AnalogClock是否符合构造函数签名
console.info(digital.tick());
console.info(analog.tick());


// ! 接口继承
// ? 和类一样，接口也可以互相继承，让我们能够从一个接口里复制成员到另一个接口里
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
// 类型断言，是一个Square类型的对象
let square = <Square>{};

square.color = "blue";
square.sideLength = 10;

console.info(square)

// ? 可以继承多个接口
interface PenStroke {
    penWidth: number;
}

interface Square2 extends Shape, PenStroke {
    sideLength: number;
}

let square2 = <Square2>{};
square2.color = "green"
square2.penWidth = 123;
square2.sideLength = 5.9;

console.info(square2)

// ! 混合类型
/*
    * 接口能描述js里丰富的类型，因为js其动态灵活的特点，有时你会希望一个对象可以同时具有
    * 上面提到的多种类型
    * 实际上，一个对象可以同时作为函数和对象使用，并且带有额外的属性
*/

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123
    counter.reset = function () { };
    return counter
}

let c12 = getCounter();
c12(10);
c12.reset();
c12.interval = 5.0

// ! 接口继承类
/* 
    * 当接口继承一个类类型时，它会继承类的成员但不包括其实现。
    * 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样
    * 接口同样会继承类的private和protected成员。
    * 这意味着你创建了一个接口集成了一个拥有私有或受保护的成员的类时
    * 这个接口类型只能被这个类或其子类所实现
*/

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {
        console.info("第一")
    }
}

class TextBox extends Control {
    select() {
        console.info("第二")
    }
}

// ! 抛错，因为Image中没有属性state，但是接口SelectableControl需要属性state
// class Image implements SelectableControl {
//     select() {}
// }
/*
    在上面的例子里，SelectableControl包含了Control的所有成员，
    包括私有成员state。 因为 state是私有成员，
    所以只能够是Control的子类们才能实现SelectableControl接口。
    因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，
    这对私有成员的兼容性是必需的。

在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。
实际上， SelectableControl接口和拥有select方法的Control类是一样的。
Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），
但Image和Location类并不是这样的。
*/
