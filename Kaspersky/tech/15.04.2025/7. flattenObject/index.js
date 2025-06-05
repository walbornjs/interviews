// Начало 1:43:36
// Конец 1:56:25
// https://www.codewars.com/kata/52859abdf8fc1b12e0000141
// Напишите функцию, которая берет объект и преобразует его в плоскую карту
// с сохранением информации о пути до значения в исходном объекте.
// Путь разделяется косой чертой('/').

const input = { a: { b: 2 }, c: 23 }
const output = { 'a/b': 2, c: 23 }

console.log(flatten(input))

function flatten(input) {
  const b = {}
  const isObject = (a) => typeof a === 'object' && a !== null && !Array.isArray(a)

  const dfs = (a, path) => {
    for (const i in a)
      if (isObject(a[i])) dfs(a[i], path + i + '/')
      else b[path + i] = a[i]
  }

  dfs(input, '')
  return b
}

const isObject = value => {}.toString.call(value) === '[object Object]'

const flatten2 = (a, path = '', b = {}) => {
  for (var i in a) isObject(a[i])
    ? flatten(a[i], `${path}${i}/`, b)
    : b[`${path}${i}`] = a[i]
  
  return b
};