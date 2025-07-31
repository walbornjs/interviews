// Вопрос: что выведет этот код и почему?

for (var i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000)
}