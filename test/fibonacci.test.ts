import Fibonacci from '../src/fibonacci';
import {assertEqual, Before, After, TsMuchi, Test, Context} from 'muchi-ts';


class FibonacciTestCasePositionZero {
    private fibonacci: Fibonacci;

    @Test({
        it: 'returns one'
    })
    public shouldReturnOne() {
        // Given
        const value: number = 0;
        const expected: number = 1;

        // When
        const fibonacciValue = this.fibonacci.compute(value);

        // Then
        assertEqual(expected, fibonacciValue);
    }
}

class FibonacciTestCasePositionOne {
    private fibonacci: Fibonacci;

    @Test({
        it: 'returns one'
    })
    public shouldReturnOne() {
        // Given
        const position: number = 1;
        const expected: number = 1;

        // When
        const fibonacciValue = this.fibonacci.compute(position);

        // Then
        assertEqual(expected, fibonacciValue);
    }
}

class FibonacciTestCasePositionSuperiorOne {
    private fibonacci: Fibonacci;

    @Test({
        it: 'returns 2'
    })
    public shouldReturnTwo() {
        // Given
        const position: number = 2;
        const expected: number = 2;

        // When
        const fibonacciValue = this.fibonacci.compute(position);

        // Then
        assertEqual(expected, fibonacciValue);
    }

    @Test({
        it: 'returns 3'
    })
    public shouldReturnThree() {
        // Given
        const position: number = 3;
        const expected: number = 3;

        // When
        const fibonacciValue = this.fibonacci.compute(position);

        // Then
        assertEqual(expected, fibonacciValue);
    }

    @Test({
        it: 'returns 5'
    })
    public shouldReturnFive() {
        // Given
        const position: number = 4;
        const expected: number = 5;

        // When
        const fibonacciValue = this.fibonacci.compute(position);

        // Then
        assertEqual(expected, fibonacciValue);
    }
}


@TsMuchi({
    name: 'class Fibonacci()'
})
class FibonacciTest {
    private fibonacci: Fibonacci;

    @Before
    public before(): void {
        this.fibonacci = new Fibonacci();
    }

    @After
    public after(): void {
        this.fibonacci = null;
    }

    @Context({
        when: 'position is zero'
    })
    public testFibonacciOfPositionZeroCase() {
        return FibonacciTestCasePositionZero;
    }

    @Context({
        when: 'position is one'
    })
    public testFibonacciOfPositionOneCase() {
        return FibonacciTestCasePositionOne;
    }


    @Context({
        when: 'position is superior to one'
    })
    public testFibonacciOfPositionSuperiorToOneCase() {
        return FibonacciTestCasePositionSuperiorOne;
    }
}