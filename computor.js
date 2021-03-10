const Equation = require('./equation_class')

const readInput = (str) => {
	let x_reg = /(= )?([\+-] )?((\d+.)?\d+) \* X\^(\d+)/ig;
	let hallado;
	let equ = new Equation();
	let eq = 0;
	while ((hallado = x_reg.exec(str)) !== null) {
		let degree = parseInt(hallado[5]);
		let coef = parseFloat(hallado[3]);
		if (hallado[2] === '- ')
			coef *= -1;
		if (hallado[1] === '= ' ||  eq === 1)
		{
			coef *= -1;
			eq = 1;
		}
		equ.addMonomial(coef, degree);
	}
	return equ;
};

const printSolution = (equation) =>
{
	if (equation.degree === 0)
	{
		if (equation.solution === true)
			console.log("There are infinite number of solutions, each real number is a solution.")
		else
			console.log("There is no solution.")
	}
	else if (equation.degree === 1)
		console.log("The solution is:\n" + equation.solution);
	else if (equation.degree === 2 && equation.discriminant)
		console.log(equation.solution[0] + '\n' + equation.solution[1]);
	else if (equation.degree === 2 && equation.discriminant === 0)
		console.log(equation.solution === -0 ? 0 : equation.solution);
}

const discriminantInfo = (equation) =>
{
	if (equation.degree != 2)
		return;
	if (equation.discriminant === 0)
		console.log("Discriminant is zero, the solution is:");
	else if (equation.discriminant > 0)
		console.log("Discriminant is strictly positive, the two solutions are:");
	else
		console.log("Discriminant is strictly negative, this equation has two complex solutions:");
}

if (process.argv.length != 3) // process.argv es el array de los argv
	return console.log("Invalid arguments");

let equ = readInput(process.argv[2]);
equ.print();
console.log("Polynomial degree: " + equ.degree);
if (equ.degree > 2)
{
	console.log("The polynomial degree is strictly greater than 2, I can't solve.");
	return;
}
discriminantInfo(equ);
printSolution(equ);
