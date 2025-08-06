/*
Мы хотим проверять режим логгера, чтобы не выводить лишние сообщения в консоль.
Мы ожидаем, что в каждой (отмеченной точке) будет 'This is Dev mode'.
Всё ли работает верно?
*/
const logger = {
  mode: 'Dev',
  check() {
      console.log(`This is ${this.mode} mode`);
  }
};

logger.check(); // => ? (1) This is Dev mode

const loggerCheck = logger.check.bind(logger);
loggerCheck(); // => ? (2) This is undefined mode

function execute(fn) {
  return fn.call(logger);
}
execute(logger.check.bind(logger)); // => ? (3) This is undefined mode

// ----



/*
Вы расследуете работу функцию логирования. Определите какие значения будут у переменных count и value в момент логирования в консоль браузера, как показано ниже
*/

let count = 0;
let value = { message: 'app initialized', isLogged: false };

function makeScopedLogger(count, value) {
    function logMessage() {
        console.log(count, value); // (2) ? 1 { message: 'app initialized', isLogged: true }
    }

    count += 1;
    console.log(count, value); // (1) ? 1, { message: 'app initialized', isLogged: false };

    value.isLogged = true;

    return logMessage;
}

const logMessage = makeScopedLogger(count, value); // count 1, { message: 'app initialized', isLogged: true };

value = { message: 'app run' }; // { message: 'app run' };

logMessage(); 

console.log(count, value); // (3) ? 0 { message: 'app run' }

// ----



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
        }, 0);
    }).then(() => {
        console.log('6');
    });

    console.log('3');
}

checkOrder();



// ---



/* Дана разметка */
<main>
    <input type="text" id="search-input" placeholder="Поиск по объявлениям" />
    <div id="suggests-container"></div>
</main>

/*
По мере ввода текста в поле нужно выполнять следующее:

1.+ Запрашивать список саджестов по api-ручке /suggests. Ручка на вход принимает term. Например: { term: "квартира" }. Ответ приходит в таком виде: { suggests: [{ title: string }, ...] }.
2.+ Под полем отображать список полученных саджестов.
3.+ При повторном запросе старый список заменяется на новый.
4.+ В случае ошибки запроса список саджестов не показывается.
5.+ Если в поле ввода ничего не введено, список саджестов не показывается и не запрашивается.
6.+ В случае отсутствия результатов по api-ручке в качестве саджеста отображается введенное значение.
*/

// Введено: «Квартира». Ответ бекенда: { suggests: [{ title: 'Снять квартиру' }, { title: 'Купить квартиру' }] }

// <script>
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
    const suggestsContainer = document.getElementById('suggests-container');

    // code here

    searchInput.addEventListener('input', async event => {
        // code here
        const { value } = event.target

        if (!value) {
            suggestsContainer.innerHTML = ''
            return
        }

        try {
            const { suggests } = await fetchSuggests(value)
            if (!suggests.length) suggests.push({ title: value })

            // [1, 2].toString() => 1,2
            // const i = document.createElement('img')
            // i.appendElement(div)

            const suggestsHTML = suggests.map(({ title }) => `<li>${title}</li>`).join('')
            suggestsContainer.innerHTML = `<ul>${suggestsHTML}</ul>`
        } catch (e) {
            suggestsContainer.innerHTML = ''
        }

    });
// </script>


// ----


/*
Напишите клиентский код, который будет получать с бэкенда информации о фича-тогглах (флагах) и их статусах:
+ Данные доступны по ключу через метод "getToggle"
+ Данные с бэкенда должны обновляться с заданной периодичностью
+ Клиент должен уметь останавливать (метод "stop") / возобновлять (метод "start") обновление данных по тогглам
 Клиент должен уметь принудительно обновлять данные по тогглам (метод "forceUpdate")

См. сигнатуры в разделе "Методы клиента"
*/

/* Инициализация клиента */
// информация о фича-тогглах
type TogglesData = Record<string, unknown>;

class TogglesClient {
    constructor(initialData, { url, interval }) {
        this.data = initialData
        this.params = { url, interval }
        this.start()
    }

    getToggle(key: string) {
        return this.data[key]
    }

   // остановить обновление данных
    stop() {
        clearInterval(this.timeout)
    }

    // возобновить / начать обновление данных
    start() {
        this.timeout = setInterval(this.forceUpdate, this.params.interval)
    }

    async fetchData(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw response;
        } 

        return response.json();
    }

    // принудительно обновить данные
    async forceUpdate() {

        this.data = await fetchData(this.params.url)
    }
}
const toggles = new TogglesClient(
    initialData: TogglesData,
    { url, interval }: { url: string, interval: number }
);
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


//-- 

// Расскажите этапы рендеринга странцы, с момента когда сервер отдал верстку в виде текста браузеру?


