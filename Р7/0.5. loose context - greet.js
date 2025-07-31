// Bonpoc: Что выведет greet()? Почему?

const obj = {
  name: 'John',
  greet: function() {
    console.log('Hello, my name is ${this.name}');
  }
};

const greet = obj.greet;
greet();