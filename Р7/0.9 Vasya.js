// Что будет в консоли?

let user = {
  firstName: "Bacя"
};

function logFirstName() {
  console.log(this.firstName);
}

user.sayHi = logFirstName;
user.sayHi(); 