// Что будет в консоли?

console.log(1)

Promise.resolve().then(() => setTimeout(() => console.log(2)))

setTimeout(() => console.log(3))

Promise.resolve().then(() => console.log(4))

let promise = new Promise(resolve => {
  console.log(5)
  setTimeout(resolve)
})

Promise.resolve()
  .then(() => console.log(6))
  .then(() => promise.then(() => console.log(7)))

console.log(8)
