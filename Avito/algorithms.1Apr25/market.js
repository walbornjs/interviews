/*
Ссылка: https://leetcode.com/problems/heaters/
или [root]/spaces/leetcode/heaters.js
Описание: Даны позиции домов (houses) и обогревателей (heaters). Каждый обогреватель имеет радиус действия. Найти минимальный радиус, чтобы все дома были покрыты хотя бы одним обогревателем.

Почему похоже: 
Дома — это как buyerNeeds.
Обогреватели — это как goods.

Нужно минимизировать максимальное расстояние от дома до ближайшего обогревателя.
Разница в том, что в нашей задаче мы суммируем неудовлетворенности,
а не ищем максимальный радиус,
и товары не ограничены по количеству.

*/


/*
Условие задачи
На Авито размещено множество товаров, каждый из которых представлен числом.
У каждого покупателя есть потребность в товаре, также выраженная числом.
Если точного товара нет, покупатель выбирает ближайший по значению товар, что вызывает неудовлетворённость,
равную разнице между его потребностью и купленным товаром.
Количество каждого товара не ограничено, и один товар могут купить несколько покупателей.
Рассчитайте суммарную неудовлетворённость всех покупателей.

Нужно написать функцию, которая примет на вход два массива:
- массив товаров
- массив потребностей покупателей, вычислит сумму неудовлетворённостей всех покупателей и вернет результат в виде числа.

Пример
# Пример
# ввод
goods = [8, 3, 5]
buyerNeeds = [5, 6]
# вывод
res = 1 # первый покупатель покупает товар 5 и его неудовлетворённость = 0, второй также покупает товар 5 и его неудовлетворённость = 6-5 = 1
*/

const market = (goods, buyerNeeds) => {
goods.sort((i, j) => i - j) // O(n*log(n))

let res = 0

for (const need of buyerNeeds) { // m
  // 1. сразу need <= goods[0]
  if (need <= goods[0]) {
    res += goods[0] - need
  }
  // 2. need > goods.at(-1) - больше самого дорогого
  else if (need > goods.at(-1)) {
    res += need - goods.at(-1)
  } else {
    for (let i = 1; i < goods.length; i++) { // n
      if (need <= goods[i]) {
        res += Math.min(goods[i] - need, need - goods[i - 1])
        break
      }
    }
  }
}

return res
}

goods = [8, 3, 5]
buyerNeeds = [5, 6]

console.log(market(goods, buyerNeeds))
// n - количество товаров
// m - количество покупателей

// T = max(O(n*log(n)), O(n * m))


const marketSimple = (goods, buyerNeeds) => {

  let res = 0

  for (const need of buyerNeeds) // m
    res += Math.min(...goods.map(i => Math.abs(need - i))) // n

  return res
}

const marketOneLine = (goods, buyerNeeds) => buyerNeeds
  .reduce((r, i) => r + Math.min(...goods.map(j => Math.abs(i - j))), 0)


// T = O(n * m)

console.log(marketOneLine(goods, buyerNeeds))


// с бинарным поиском
const marketBin = (goods, buyerNeeds) => {
  goods.sort((i, j) => i - j) // O(n*log(n))

  let res = 0

  for (const need of buyerNeeds) { // m
    // 1. сразу need <= goods[0]
    if (need <= goods[0]) res += goods[0] - need
    // 2. need > goods.at(-1) - больше самого дорогого
    else if (need > goods.at(-1)) res += need - goods.at(-1)
    else {
      const [l, r] = binSearch(goods, need, 0, goods.length)
      res += Math.min(need - goods[l], goods[r] - need)
    }
  }

  return res
}

// x > a[l]
// x < a[r]
const binSearch = (a, x, l, r) => {
  while (r - l > 1) {
    const m = (l + r) >> 1

    if (a[m] > x) r = m
    else l = m
  }

  return [l, r]
}

console.log(marketBin(goods, buyerNeeds))
// T = O((m + n) * log n)







