// const object = [{
//     message: "message",
//     dollar: "dollar"
// }

// ]
// const [message] = object
// console.log(Object.values(message))

// class Person {
//     constructor (_name, _age) {
//         this._name = 'Samuel'
//         this._age = '30'
//     }
    
//     getName () {
//         console.log(`My name is ${this._name}`)
//     }

//     getAge() {
//         console.log(`I am ${this._age} old`)
//     }

//     getAll() {
//         console.log(`I am ${this._age} old and My name is ${this._name}` )
//     }
// }

// const sam = new Person;

// sam._name = 'Paul'
// sam._age = '45'

// console.log(sam)

// const opula = (a, b)=> {
//     let sum = 0
//     sum = a+b
//     a=a-3
//     console.log(sum)
//     if (a > b) {
//         opula()
//     }
// }

// console.log(opula(4, 2))

const array = [1,2,3,5,5]
const newArray =  [1,2,5,3,7,4,8]

console.log(array.filter(e=> e === newArray))