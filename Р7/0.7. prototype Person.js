// Объясните, как работает этот код.
// Что произойдет, если мы добавим
// john.__proto__.farewell = function() { console.log('Goodbye!') }
// Почему?

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, my name is $this.name!"`);
}

const john = new Person('John')
john.greet()