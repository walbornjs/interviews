> РЕШЕНИЯ СМОТРИ в [./index.js](index.js)

> ТУТ ТОЛЬКО УСЛОВИЯ!

## 1. Logger
```js
/*
Мы хотим проверять режим логгера, чтобы не выводить лишние сообщения в консоль.
Мы ожидаем, что в каждой (отмеченной точке) будет 'This is Dev mode'.
Всё ли работает верно?
*/

const logger = {
	mode: 'Dev',
	check() {
		console.log(`This is ${this.mode} mode`)
	}
}

logger.check() // => ? (1)
const loggerCheck = logger.check
loggerCheck() // => ? (2)

function execute(fn) {
	return fn.call(logger)
}

execute(logger.check.bind(logger)) // => ? (3)
```

## 2. makeScopedLogger
```js
/*
Вы расследуете работу функции логирования. Определите какие значения будут у переменных count и value в момент логирования в консоль браузера, как показано ниже
*/
  

let count = 0;
let value = { message: 'app initialized', isLogged: false };

function makeScopedLogger(count, value) {
	function logMessage() {
		console.log(count, value); // (2) ?
	}

	count += 1;
	console.log(count, value); // (1) ?

	value.isLogged = true;
	return logMessage;
}

const logMessage = makeScopedLogger(count, value)

value = { message: 'app run' }

logMessage();

console.log(count, value); // (3) ?
```

## 3. checkOrder
```js
/**
Мы разрабатываем приложение через Console Driven Development.
К сожалению, у нас потерялась часть кода, но остался последний вывод.
Расставьте тексты для console.log

Последний вывод:
1
2
3
4
5
6
*/

function checkOrder() {
	console.log('1');
	async function asyncFn() {
	console.log('2');
	await Promise.resolve(null);
	console.log('4');
}

asyncFn();

new Promise((resolve) => {
	setTimeout(() => {
		resolve();
		console.log('5')
	}, 0)
	}).then(() => {
		console.log('6');
	});
	
	console.log('3');
}

checkOrder();
```

## 4.  fetchSuggests
Дана разметка
```html
<main>
	<input type="text" id="search-input" placeholder="Поиск по объявлениям" />
	<div id="suggests-container"></div>
</main>
```

По мере ввода текста в поле нужно выполнять следующее:
1. Запрашивать список саджестов по api-ручке /suggests. Ручка на вход принимает term. Например: { term: "квартира" }. Ответ приходит в таком виде: `{ suggests: [{ title: string }, ...] }`.
2. Под полем отображать список полученных саджестов.
3. При повторном запросе старый список заменяется на новый.
4. В случае ошибки запроса список саджестов не показывается.
5. Если в поле ввода ничего не введено, список саджестов не показывается и не запрашивается.
6. В случае отсутствия результатов по api-ручке в качестве саджеста отображается введенное значение.

Введено: «Квартира». Ответ бэкенда: `{ suggests: [{ title: 'Снять квартиру' }, { title: 'Купить квартиру' }] }`

```js
const fetchSuggests = async term => {
	const response = await fetch('/suggests', {
		method: 'POST',
		body: { term },
	});

	if (!response.ok) {
		throw response;
	}
	
	return response.json();
}

const searchInput = document.getElementById('search-input');

// code here

searchInput.addEventListener('input', async event => {
	// code here
});
```

## 5. TogglesClient
Напишите клиентский код, который будет получать с бэкенда информации о фича-тогглах (флагах) и их статусах:
+ Данные доступны по ключу через метод "getToggle"
+ Данные с бэкенда должны обновляться с заданной периодичностью
+ Клиент должен уметь останавливать (метод "stop") / возобновлять (метод "start") обновление данных по тогглам
Клиент должен уметь принудительно обновлять данные по тогглам (метод "forceUpdate")

См. сигнатуры в разделе "Методы клиента"

```ts
/* Инициализация клиента */
// информация о фича-тогглах
type TogglesData = Record<string, unknown>;

class TogglesClient {
	constructor(initialData, { url, interval }) {
		this.data = initialData
		this.params = { url, interval }
	}
	
  // code here

}

const toggles = new TogglesClient(
	initialData: TogglesData,
	{ url, interval }: { url: string, interval: number }
)

/*
Инициализируещие параметры
- initialData - первоначальные данные о фича-тогглах
- url - адрес эндпоинта получения данных о фича-тогглах
- interval - время обновления данных в мс
*/

/* Методы клиента */
// получение фича-тоггла по ключу
toggles.getToggle(key: string): unknown;

// остановить обновление данных
toggles.stop();

// возобновить / начать обновление данных
toggles.start();

// принудительно обновить данные
toggles.forceUpdate();

```

Расскажите этапы рендеринга странцы, с момента когда сервер отдал верстку в виде текста браузеру?
