// ! 类
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return `Hello, ${this.greeting}`
    }
}
let greeter = new Greeter("world")
/* 
    * 上面这个类有三个成员，一个是greeting属性，一个构造函数constructor合一个greet方法
    * 最后一行使用new构造了一个Greeter类的一个实例，创建了一个Greeter类型的新对象，并执行构造函数初始化它
*/

// ! 在ts里，可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类

class Animal1 {
    move(distanceInMeters: number = 0) {
        console.info(`Animal moved ${distanceInMeters}m.`)
    }
}

class Dog1 extends Animal1 {
    bark() {
        console.info("woof")
    }
}

const dog = new Dog1()
dog.bark()
dog.move(10)
dog.bark()