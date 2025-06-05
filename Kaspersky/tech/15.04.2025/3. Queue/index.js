// Начало: 00:36:00
// Конец: 01:05:00

class Queue {
  constructor() {
    this.queue = [] // Очередь для хранения задач
    this.isRunning = false // Флаг, указывающий, выполняется ли очередь
    this.index = 0
  }

  run(fn) {
    this.queue.push(fn)
    if (!this.isRunning) {
      this.isRunning = true
      this.next()
    }
    return this
  }

  next = async () => {
    if (this.index === this.queue.length) return this.isRunning = false
    const task = this.queue[this.index++]
    // Promise.resolve()
    //   .then(() => task(this.next))
    //   .catch(() => {
    //     this.isRunning = false
    //     this.queue = []
    //   })

    try {
      await task(this.next)
    } catch (error) {
      this.isRunning = false
      this.queue = []
    }
  }
}

// Пример использования
const queue = new Queue()

queue
  .run(async (next) => {
    console.log('Hello')
    // setTimeout(() => next(), 100)
    next()
  })
  .run((next) => {
    setTimeout(() => {
      console.log('World')
      throw new Error('Oops, something went wrong..')
      next()
    }, 500)
  })
  .run((next) => {
    console.log('Goodbye')
    // Этот код недостижим из-за ошибки выше
    next()
  })