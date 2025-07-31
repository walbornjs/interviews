// Что будет в консоли?

async function closure() {
  async function promise() {
    return 5
  }

  let result1 = promise()
  let result2 = await promise()

  console.log(result1)
  console.log(result2)
}

closure()
