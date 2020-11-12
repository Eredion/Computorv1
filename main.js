const abs = (n) => { return (n >= 0 ? n : n * -1) } // Absolute value function.

const sqrt = (t) =>
{ // Square root using Newthon's aproximation Method.
	let r = t / 2.0;
	let new_r;
	let error = 0.0001 			// Set the max error
	let max_iterations = 20		// Set max number of iterations
	for (let i = 0; ++i;)
	{
		new_r = (r + t / r ) / 2;
		if (abs(new_r -r) < error && i > max_iterations)
			break;
		r = new_r;
	}
	return r;
}

class Equation
{
	constructor() {this.arrx = [];} // This variable saves all degrees of x

	addMonomial(coef, degree)
	{
		while (this.arrx.length <= degree)
			this.arrx.push(0);
		this.arrx[degree] += coef;
	}

	print()
	{
		let msg = `Reduced form: ${this.arrx[0] < 0? '- ':''}${abs(this.arrx[0])} * X^${0} `;
		for (let i = 1; i < this.arrx.length; ++i)
			msg += `${this.arrx[i] < 0? '- ':'+ '}${abs(this.arrx[i])} * X^${i}`
		console.log(msg + " = 0");
	}

	get degree()
	{
		let degree = this.arrx.length - 1;
		while (this.arrx[degree] === 0)
			--degree;
		return (degree < 0 ? 0 : degree);
	}

	get discriminant()
	{
		if (this.degree != 2)
			return false;
		return ((this.arrx[1] * this.arrx[1]) - (4 * this.arrx[2] * this.arrx[0]));
	}

	get solution()
	{
		if (this.degree === 0)
			return (true)
		else if(this.degree === 1)
			return (this.arrx[0] / -this.arrx[1]);
		else if (this.degree === 2 && this.discriminant > 0)
		{
			return ([(-this.arrx[1] + sqrt(this.discriminant)) / (2 * this.arrx[2]),
			(-this.arrx[1] - sqrt(this.discriminant)) / (2 * this.arrx[2])]);
		}
		else if (this.degree === 2 && this.discriminant === 0)
			return (-this.arrx[1] / (2 * this.arrx[2]));

	}
};

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
		console.log("There are infinite number of solutions, each real number is a solution.")
	else if (equation.degree === 1)
		console.log("The solution is:\n" + equation.solution);
	else if (equation.degree === 2 && equation.discriminant > 0)
		console.log(equation.solution[0] + '\n' + equation.solution[1]);
	else if (equation.degree === 2 && equation.discriminant === 0)
		console.log(equation.solution === -0 ? 0 : equation.solution);
}

const discriminantInfo = (equation) =>
{
	if (!equation.degree)
		return;
	if (equation.discriminant === 0)
		console.log("Discriminant is zero, the solution is:");
	else if (equation.discriminant > 0)
		console.log("Discriminant is strictly positive, the two solutions are:");
	else
		console.log("Discriminant is strictly negative, this equation has not solution");
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
equ.discriminantInfo;
printSolution(equ);
