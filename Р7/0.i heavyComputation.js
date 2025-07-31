function heavyComputation() {
	for (let i = 0; i < 1e11; i++) {
		// ... тут много вычислений
	}
}

window.onload = () => {
	// ...
	const result = heavyComputation()

	// ... дальше result где-то используется
}