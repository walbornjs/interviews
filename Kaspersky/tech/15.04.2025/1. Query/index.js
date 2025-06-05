// Начало 00:00:00
// Конец 00:21:30 
// Напишите реализацию функции query(), 
// которая должна получать и преобразовывать данные.

// Необходимо валидировать следующие параметры:

// Запрашиваемые в fields поля должны содержатся в исходных данных
// В order должна передаваться функция для сортировки
// В groupBy должно передаваться поле для группировки
// Группировка реализуется внутри массива

// См.пример результата.
// В случае передачи некорректных параметров следует
// выбрасывать ошибку с сообщением: 'Incorrect params'

// Пример результата:
const result = [
  { name: 'Anna', profession: 'scientific', age: 21 },
  { name: 'Michael', profession: 'teacher', age: 50 },
  { name: 'Peter', profession: 'teacher', age: 21 },
]

const data = [
  { name: 'Michael', profession: 'teacher', age: 50, martialStatus: 'single' },
  { name: 'Rose', profession: 'scientific', age: 19, martialStatus: 'married' },
  { name: 'Anna', profession: 'scientific', age: 21, martialStatus: 'married' },
  { name: 'Peter', profession: 'teacher', age: 21, martialStatus: 'married' },
]

async function query({
  fields = [],
  source = () => [],
  filter,
  order = null,
  groupBy
}) {
  // 1. Проверяем, что fields - массив
  if (!Array.isArray(fields)) throw new Error('Incorrect params: fields is not array')

  // Запрашиваемые в fields поля должны содержатся в исходных данных
  for (const field of fields) {
    if (!field in data[0]) throw new Error(`Incorrect params: field ${field}not found in data`)
  }

  for (const item of data) {
    for (const field of fields) {
      // Почему не if (field in item)?
      // Это будет давать true не только для собственных свойств, но и для наследуемых
      // например ('toString' in item) = true (наследуется от Object.prototype)
      if (!Object.hasOwn(item, field)) {
        throw new Error(`Incorrect params: field ${field} not found in data`)
      }
    }
  }

  // 2. Проверяем, что source - функция
  if (typeof source !== 'function') throw new Error('Incorrect params: source is not function')

  // 3. Проверяем, что filter - функция
  if (typeof filter !== 'function') throw new Error('Incorrect params: filter is not function')

  // 4. Проверяем, что order - функция
  if (typeof order !== 'function') throw new Error('Incorrect params: order is not function')


  // 5. В groupBy может передаваться поле для группировки
  if (groupBy !== undefined) {
    if (typeof groupBy !== 'string') throw new Error('Incorrect params: groupBy is not string')

    for (const item of data) {
      // if (!Object.prototype.hasOwnProperty.call(item, groupBy)) - по старому
      if (!Object.hasOwn(item, groupBy)) throw new Error(`Incorrect params: field ${groupBy} not found in data`)
    }
  }

  try {
    let result = await source()

    if (!Array.isArray(result)) throw new Error('Incorrect source: result is not array')

    result = result.filter(filter).sort(order)
    if (groupBy) result = Object.groupBy(result, item => item[groupBy])

    // на собеседовании писал так
    // const values = []
    // for (const item of result) {
    //   const value = {}
    //   for (const field of fields) value[field] = item[field]
    //   values.push(value)
    // }
    // return values

    // короче запись
    return result.map(i => fields.reduce((r, field) => ({ ...r, [field]: i[field] }), {}))

  } catch (error) {
    throw new Error('Something went wrong')
  }
}

async function init() {
  const result = await query({
    fields: ['name', 'age', 'profession'],
    source: async () => data,
    filter: entry => entry.age > 20,
    order: (a, b) => a.name.localeCompare(b.name)
  })
  console.log(JSON.stringify(result, null, 2))
}

init()