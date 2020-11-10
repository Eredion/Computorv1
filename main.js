// process.argv es el array de los argv

const readInput = (str) => {
	let x_0 = /([\+-] )?(\d+.)?\d+ \* X\^\d/ig;
	let hallado;
	console.log(hallado);
	while ((hallado = x_0.exec(str)) !== null) {
		console.log (`Encuentro ${hallado}`)
	}
};

if (process.argv.length != 3)
	return console.log("Invalid arguments");
console.log("The ecuation is: " + process.argv[2]);

readInput(process.argv[2]);
