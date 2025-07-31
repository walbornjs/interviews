// Что будет в консоли?

function test1() {
  let a = 7

  function test2() {
    console.log(a)
  }

  function test3() {
    let a = 9
    test2()
  }

  test2()
  test3()
}

test1()
