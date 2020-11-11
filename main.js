const abs = (n) => { return (n >= 0 ? n : n * -1) } // Absolute value function.

const sqrt = (t) =>
{ // Square root using Newthon's Method with a max of 1000 iterations.
	let r = t / 2.0;
	for (let i = 0; i <= 1000 ; ++i)
		r = (r + t / r ) / 2;
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

	get degree(){ return (this.arrx.length - 1)}
	get discriminant()
	{
		if (this.degree != 2)
			return false;
		return (-4 * this.arrx[2] * this.arrx[0]);
	}

	get discriminantInfo()
	{

		if (this.discriminant === 0)
			console.log("Discriminant is zero, the solution is:");
		else if (this.discriminant > 0)
			console.log("Discriminant is strictly positive, the two solutions are:");
		else
			console.log("Discriminant is strictly negative, this equation has not solution");
	}

	get solution()
	{
		if (this.degree === 1)
			return (this.arrx[0] / -this.arrx[1]);

	}

	printSolution()
	{
		if (this.degree === 1)
			console.log("The solution is:\n" + this.solution);
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
equ.printSolution();

