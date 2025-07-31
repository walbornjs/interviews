// Что выполнится раньше?
navigator.geolocation.getCurrentPosition(
	position => console.log(position),
	error => console.error(error),
) // 100ms

fetch(url) // 100ms
	.then(console.log)
	.catch(console.error)

// а если добавить цикл

const start = Date.now()
while (Date.now() - start < 5000);
