// Начало 1:56:38
// Конец 2:04:40

// Найти максимально возможную сумму подмассива
// https://leetcode.com/problems/maximum-subarray/
const input = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
const output = 6 // sum of the next numbers — [4, -1, 2, 1]


const brutforce = (a) => {
  if (!a.length) return []
  const sum = a => a.reduce((r, i) => r + i, 0)
  let l = 0, r = 0

  let max = a[0] || 0
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (sum(a.slice(i, j)) > max) {
        max = sum(a.slice(i, j))
          ;[l, r] = [i, j]
      }
    }
  }
  return a.slice(l, r)
}


// function maxSubArray(a) {
//   const n = a.length
//   const pref = a.reduce((r, i) => { r.push(r.at(-1) + i); return r }, [0])

//   let pmax = Math.max(...pref.slice(1))
//   let max = pmax
 
//   for (let l = 1; l < n; l++) {
//     if (pmax === pref[l]) pmax = Math.max(...pref.slice(l + 1))
//     if (pref[l] < pref[l - 1]) max = Math.max(max, pmax - pref[l])
//   }
//   return max
// }

// console.log(maxSubArray(input))
// console.log(maxSubArray([0,-2,-3]))
// console.log(maxSubArray([-1]))
console.log(maxSubArray([-1, -1, -1]))


// Идея. Идем по массиву и суммируем числа, пока сумма не станет меньше 0
// если 

const maxSubArray = ([max, ...a]) => {
  let sum = max
  for (const i of a) {
    if (sum < 0) sum = 0
    max = Math.max(max, sum += i)
  }

  return max
}

console.log(maxSubArray([0,-2,-3]))
