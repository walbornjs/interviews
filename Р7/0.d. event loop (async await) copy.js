
// B каком порядке выведутся console.log и почему?

const delay = function (milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function printNumbers() {
  console.log(1)
  await delay(2000)
  console.log(2)
  await delay(500)
  console.log(3)
}

printNumbers()
console.log(4)

