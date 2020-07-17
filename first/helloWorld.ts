// 接口
// 这里我们试用接口来描述一个拥有firstName和lastName字段的对象，在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。
// 这就允许我们在实现接口的时候只要保证包含了接口要求的结构就可以，不必明确的试用implements语句

// interface Person {
//     firstName: string;
//     lastName: string;
// }


// function greeter(person: string) {
//     return "Hello, " + person;
// }

// let user = "Jane User"
// let user = 123123 // 这样会报错，因为ts会告诉你使用了非期望的参数，但是尽管如此，同样的js还是生成了

// 试用接口
// function greeter(person: Person) {
//     return `Hello, ${person.firstName} ${person.lastName}`;
// }
// let user = {
//     firstName: "莫",
//     lastName: "小莫"
// };
// document.body.innerHTML = greeter(user);


// 类
// ts支持js的新特性，比如支持基于类的面向对象编程
// 创建一个Student类，它带有一个构造函数和一些公共字段。注意类和接口可以一起工作，程序员可以自行决定抽象的级别
// ! 注意，在构造函数的参数上使用public等同于创建了同名的成员变量

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = `${firstName} ${middleInitial} ${lastName}`
    }
}

interface Person {
    firstName: string;
    lastName: string;
    middleInitial: string;
}

function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.middleInitial} ${person.lastName}`
}

let user = new Student("Mo", "Q", "Hongen")

document.body.innerHTML = greeter(user)