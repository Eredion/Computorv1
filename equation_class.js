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

module.exports = class Equation
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
			return (this.arrx[0] === 0? true : false);
		else if(this.degree === 1)
			return (this.arrx[0] / -this.arrx[1]);
		else if (this.degree === 2 && this.discriminant > 0)
		{
			return ([(-this.arrx[1] + sqrt(this.discriminant)) / (2 * this.arrx[2]),
			(-this.arrx[1] - sqrt(this.discriminant)) / (2 * this.arrx[2])]);
		}
		else if (this.degree === 2 && this.discriminant === 0)
			return (-this.arrx[1] / (2 * this.arrx[2]));
		else if (this.degree === 2 && this.discriminant < 0)
		{
			let divider = 2 * this.arrx[2];
			let irreal_part = sqrt(-this.discriminant) / divider + ' * i';
			return ([(-this.arrx[1] / divider + ' + ' + irreal_part),
				(-this.arrx[1] / divider + ' - ' + irreal_part)]);
		}

	}
};
