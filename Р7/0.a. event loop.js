// Что будет в консоли?

console.log(1)

function promiseFunction() {
  return new Promise(resolve => {
    console.log(2)
    resolve(3)
    console.log(4)
    resolve(5)
  })
}

console.log(6)

promiseFunction()
.then(result => console.log(result))

console.log(7)
