import { sayHello } from './greet'

function showHello(divName: string, name: string) {
    const elt = document.getElementById("divName");
    elt.innerHTML = sayHello(name)
}

// 
// console.info("卧槽")
showHello("greeting", "TypeScript")