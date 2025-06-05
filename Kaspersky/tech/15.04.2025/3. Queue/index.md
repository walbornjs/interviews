Реализуйте метод run класса Queue так, чтобы реализация соответствовала примеру использования.
Данный метод должен последовательно выполнять переданные в него асинхронные функции.
Следующая функция в очереди может быть вызвана только в том случае, если предыдущая вызвана next()
Обратите внимание, что третий вызов run() в примере использования никогда не будет вызван.

```js
class Queue {
  // write something here
}

// usage example
const queue = new Queue()

queue
  .run(async (next) => {
    next();
  })
  .run((next) => {
    throw new Error('Oops, something went wrong..');
    next();
  })
  .run((next) => {
    // unreachable code
    next();
  })
```