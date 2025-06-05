// Начало: 00:23:37
// Конец: 00:35:00
// write asyncFilter function
const isOdd = (num: number): Promise<number> => new Promise((resolve) => setTimeout(() => resolve(num % 2), Math.random() * 1000))


// async function asyncFilter(array, callback) {
//   // ...your code here
// }

asyncFilter([1, 2, 3], isOdd).then((r) => {
  console.log(r)
}) // [1,3]> callback(i)))

asyncFilter2([1, 2, 3], isOdd).then((r) => {
  console.log(r)
}) 

async function asyncFilter<T>(array: T[], callback: (item: T) => Promise<unknown>) {

  const promises = array.map(item => callback(item)
    .then(result => ({ item, result }))
    .catch(() => ({ item, result: false }))
  )
  const values = (await Promise.all(promises))
    .filter(({ result }) => result)
    .map(({ item }) => item)

  return values
}

// через for await
async function asyncFilter2<T>(array: T[], callback: (item: T) => Promise<unknown>) {
  const values: T[] = []
  let result: boolean = false

  const asyncCallback = async (item: T, index: number): Promise<[T, boolean, number]> => {
    try {
      result = Boolean(await callback(item))
    } finally {
      return [ item, result, index ]
    }
  }

  for await (const [item, result, index] of array.map(asyncCallback)) {
    if (result) values.push(item)
  }

  return values
}