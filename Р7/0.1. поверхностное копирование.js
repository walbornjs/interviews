// Пользователь с какими именем,
// возрастом и документами будет в консоли?

let user = {
  name: 'John',
  age: 15,
  documents: { 'passport': true, 'visa': false }
}

let userClone = Object.assign({}, user)
user.age = 27
user.documents.passport = false

console.log(userClone)