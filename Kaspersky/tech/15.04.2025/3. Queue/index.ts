type QueueTask = (next: () => void) => void | Promise<void>

class Queue {
  private queue: QueueTask[] = []
  private isRunning: boolean = false
  private index: number = 0

  constructor() {
    this.queue = []
    this.isRunning = false
    this.index = 0
  }

  run(fn: QueueTask): this {
    this.queue.push(fn)
    if (!this.isRunning) {
      this.isRunning = true
      this.next()
    }
    return this
  }

  private async next(): Promise<void> {
    if (this.index === this.queue.length) {
      this.isRunning = false
      return
    }
    const task = this.queue[this.index++]
    try {
      await task(this.next.bind(this))
    } catch (error) {
      this.isRunning = false
      this.queue = []
    }
  }
}