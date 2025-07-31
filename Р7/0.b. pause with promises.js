// Напишите функцию паузы с помощью Promise
// Можно устно

function pause(milliseconds) {
  // ... your code here
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
