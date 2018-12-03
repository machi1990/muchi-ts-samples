import Calculator from './calculator';

export default class Fibonacci {
    private calculator: Calculator;

    constructor() {
        this.calculator = new Calculator();
    }

    public compute(value: number): number {
        if (value <= 1) {
            return 1;
        }

        return this.calculator.sum(this.compute(value -1), this.compute(value - 2));
    }
}
