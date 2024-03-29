const newPromise = new Promise ((resolve, reject)=> {
    const isTrue = true;

    if(isTrue) {
       resolve( console.log(isTrue))
    } else {
        reject(()=> {
            console.log(!isTrue)
        })
    }
})
.then(console.log('power'))
.then(console.log('another power'))
.catch(()=> {
    console.log('err')
})

// const myFunction = () => {
//      let myValue = 2;
//      console.log(myValue);

//      const childFunction = () => {
//           console.log(myValue += 1);
//      }

//      return childFunction;
// }

// const result = myFunction();
// console.log(result);
// result();
// result();
// result();

const curry1 = (a) => {
    return curry2 = (b) => {
        return curry3 = (c) => {
            return a*b*c;
        }
    }
}
const calcCurry = curry1(1)
const calcCurry2 = curry2(3)
const calcCurry3 = curry3(3)
console.log(calcCurry3)


const crypto = require('crypto')

const secret = crypto.randomBytes(32).toString('hex')
console.log(secret)