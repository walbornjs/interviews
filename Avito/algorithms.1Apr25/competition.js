/*
Условие задачи
Мы в Авито любим проводить соревнования, — недавно мы устроили чемпионат по шагам. И вот настало время подводить итоги!

Необходимо определить userIds участников, которые прошли наибольшее количество шагов steps за все дни, не пропустив ни одного дня соревнований.

Пример
# Пример 1
# ввод
statistics = [
        [{ userId: 1, steps: 1000 }, { userId: 2, steps: 1500 }],
        [{ userId: 2, steps: 1000 }]
]

# вывод
champions = { userIds: [2], steps: 2500 }

# Пример 2
statistics = [
        [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
        [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]
]

# вывод
champions = { userIds: [1, 2], steps: 5500 }
*/
let statistics = [
  [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
  [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]
]

statistics = [
  // День 1
  [
    { userId: 1, steps: 1000 },
    { userId: 2, steps: 2000 },
    { userId: 3, steps: 1500 },
    { userId: 4, steps: 3000 }
  ],
  // День 2
  [
    { userId: 1, steps: 2000 },
    { userId: 2, steps: 1500 },
    { userId: 3, steps: 1000 }
    // userId: 4 отсутствует
  ],
  // День 3
  [
    { userId: 1, steps: 1500 },
    { userId: 2, steps: 2500 },
    { userId: 3, steps: 2000 },
    { userId: 5, steps: 4000 }
  ],
  // День 4
  [
    { userId: 1, steps: 2500 },
    { userId: 2, steps: 1000 },
    { userId: 3, steps: 1500 },
    { userId: 5, steps: 1000 }
  ]
]
// n - количество участников
// m - количество дней


const getChampions = (statistics) => {
  if (statistics.length === 0) return { userIds: [] }

  let prev = statistics.pop().reduce((r, i) => { r[i.userId] = i.steps; return r }, {}) // n

  for (const curr of statistics) { // m
    const next = {}
    for (const { userId, steps } of curr) { // n
      if (userId in prev) next[userId] = steps + prev[userId]
    }
    prev = next
  }

  let max = -1
  let winners = []

  for (const key in prev) { // n
    if (prev[key] > max) {
        max = prev[key]
        winners = [ key ]
    } else if (prev[key] === max) winners.push(key)
  }

  return { userIds: winners, steps: max }
}

console.log(getChampions(statistics))
// n - количество участников
// m - количество дней
// T = O(n * m), M = O(n * m), M = O(n) - дополнительная на prev и next и winners
