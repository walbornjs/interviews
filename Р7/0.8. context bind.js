// Что будет в консоли?

let a = 10;

function func() {
  let a = 15;
  
  console.log(a);
}

func.bind({ a: 25 })();
