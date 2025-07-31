// dom selector 10 pages.jpg
// Вашему коллеге задали задачу написать такой код, который сможет
// DOM-элементу с любым указанным селектором установить тип отображения
// 'block', затем наполнить элемент данными из десяти страниц любого сайта
// (сейчас доступен https://some-site), где страницы можно брать по пути
// $[SITE]/page/$[PAGE], затем сделать всё содержимое элемента
// в верхнем регистре.

// Ваш коллега выполнил задание и отдал вам его на проверку. Ваша задача
// определить всё ли в порядке с кодом коллеги.

function blockandGet(selector) {
  const htmlElement = document.getElementById(selector);

  htmlElement.style.display = 'block'

  for (var i = 0; i < 10; i++) {
    let htmlElement = document.getElementById(selector);
    const data = fetch('http://some-site/page' + '/' + i)
      .then((response) => {
        htmlElement.innerHTML += response.json()
      })
  }

  const element = htmlElement
  console.log(element)

  //делаем всё бальшими буквами
  element.innerHTML.split('').forEach(symbol => symbol.toUpperCase())
}