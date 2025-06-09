// Retry Fetch
// Стандартный fetch плох тем, что не умеет в ретраи.
// Нам нужно, чтоб умел делать retryCount раз перезапускаться, если упал.
// А если любая из попыток выполняется дольше, чем cancelTimeout миллисекунд,
// то переходить к новой попытке

async function retryAndCancelFetch({ retryCount = 0, cancelTimeout = 1000 }, ...fetchArgs) {
  let lastError
  
  for (let i = 0; i <= retryCount; i++) {
    const controller = new AbortController()
    let timeoutId = null

    try {
      // Хотим в options передать signal
      const [resource, options = {}] = fetchArgs
      const fetchOptions = {
        ...options,
        signal: controller.signal
      }

      // Устанавливаем таймаут прерывания
      timeoutId = setTimeout(() => controller.abort(), cancelTimeout)
      
      // ВАЖНО: без return await!
      const response = await fetch(resource, fetchOptions)
      clearTimeout(timeoutId) // Избегаем гонки с controller.abort()
      return response // Успех - выходим из функции
      
    } catch (error) {
      lastError = error
      clearTimeout(timeoutId)
    }
  }
  
  throw lastError
}

// Проверка
// Примерно при 140 мс таймауте, будет несколько попыток неудачных,
// но потом успешная раньше 5-го раза

(async () => {
  const start = Date.now()
  try {
    const response = await retryAndCancelFetch({ retryCount: 5, cancelTimeout: 140 }, 'https://dummyjson.com/products',)
    const json = await response.json()
    console.log(json, Date.now() - start)
  } catch (error) {
    console.log(error, Date.now() - start)
  }
})()