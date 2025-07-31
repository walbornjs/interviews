// Создаем уникальные ключи-символы (секретные метки отсеков)
const secretCompartmentKey = Symbol("Секретный отсек для запасных батареек");
const hiddenPocketKey = Symbol("Потайной карман для ключей от квартиры");

const myBackpack = {
  // Обычные публичные вещи
  books: ["JS для чайников", "React в действии"],
  lunchBox: "Сэндвич и яблоко",

  // "Приватные" вещи через символы (не видны при обычном просмотре)
  [secretCompartmentKey]: ["Батарейка AAA x 2", "PowerBank"],
  [hiddenPocketKey]: "Ключ от квартиры № 42"
};

// Использование "приватных" свойств (только если знаешь символ)
console.log(myBackpack[secretCompartmentKey]); // ['Батарейка AAA x 2', 'PowerBank'] (Доступ есть!)
myBackpack[hiddenPocketKey] = "Новый ключ от квартиры"; // Можно изменить

// Публичные свойства видны всем
console.log(myBackpack.books); // ['JS для чайников', 'React в действии']
console.log(myBackpack.lunchBox); // 'Сэндвич и яблоко'

// А теперь попробуем перебрать ВСЕ свойства рюкзака (обычным способом):
console.log("--- Обычная проверка рюкзака (for..in): ---");
for (let key in myBackpack) {
  console.log(key); // books, lunchBox (Секретные отсеки не найдены!)
}

console.log("--- Object.keys(): ---");
console.log(Object.keys(myBackpack)); // ['books', 'lunchBox'] (Секретов нет!)

// Но спецслужбы (Object.getOwnPropertySymbols) знают про символы!
console.log("--- Спецпроверка (Object.getOwnPropertySymbols): ---");
const secretKeys = Object.getOwnPropertySymbols(myBackpack);
console.log(secretKeys) // [Symbol(Секретный отсек...), Symbol(Потайной карман...)]
console.log(myBackpack[secretKeys[0]]); // ['Батарейка AAA x 2', 'PowerBank'] -> Секрет раскрыт!