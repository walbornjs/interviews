// на самом деле это клон задачи про шину gateWay

/** 
 * Задача:
 * Реализуйте функцию runConcurrentTasks, которая принимает два аргумента:
 * 1) Массив функций (каждая функция возвращает промис)
 * 2) Число — максимальное количество промисов, которые могут выполняться одновременно (параллельно)
 * 
 * Функция должна запускать задачи из массива, но не более чем concurrency задач одновременно. 
 * Функция возвращает промис, который резолвится массивом результатов в том же порядке, что и исходные задачи:
 *   - Если задача завершилась успешно, в массиве результатов должно быть её значение.
 *   - Если задача завершилась с ошибкой (reject), в массиве результатов на её месте должно быть значение 'error'.
 */

/**
 * @param {Array<(args: any[]) => Promise<T>>} tasks 
 * @param {number} concurrency 
 * @returns {Promise<T[]>}
 */
async function runConcurrentTasks(tasks, concurrency) {
  const pool = tasks.slice(0, concurrency)
  let i = concurrency
  
  const results = []
  const rec = (task, index) => task
    .then((res) => {
      results[index] = res
    })
    .catch(() => {
      results[index] = 'error'
    })
    .finally(() => {
      if (i < tasks.length) rec(tasks[i], i++)
    })

  await Promise.all(pool.map((task, index) => rec(task, index))) 
  
  return results   
}


async function runConcurrentTasks(tasks, concurrency) {
  const promises = Array.from({ length: concurrency }, (_, i) => runTaskWithNext(i))
  let latest = concurrency
  
  const results = []

  const runTaskWithNext = async (index) => {
    try {
      results[index] = await tasks[index]()
    } catch {
      results[index] = 'error'
    }
    if (latest === tasks.length) return
    
    await runTaskWithNext(++latest)
  }
    

  await Promise.all(promises) 
  
  return results   
}

// Пример использования:

const tasks = [
  () => Promise.resolve(1), 
  () => Promise.reject(2), // reject
  () => Promise.resolve(3),
  () => fetch('https://www.google.com'),
  () => Promise.resolve(5),
  () => Promise.resolve(6)
];

const result = await runConcurrentTasks(tasks, 3)
console.log(result) // [1, 'error', 3, ResponseObj, 5, 6]