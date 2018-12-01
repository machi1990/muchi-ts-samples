import Sum from './sum';
import {assertEqual, Before, After, TsMuchi, Test} from 'muchi-ts';

@TsMuchi({
    name: 'class Sum()'
})
class SumTest {
    private sum: Sum;

    @Before
    public before() {
        this.sum = new Sum();
    }

    @After
    public after() {
        this.sum = null;
    }

    @Test({
        it: 'returns the number when adding with zero'
    })
    public shouldReturnTheNumber() {
        // Given
        const a: number = 1;
        const b: number = 0;
        const expected: number = 1;
        // When
        const sum = this.sum.sum(a, b);
        
        // Then
        assertEqual(sum,expected);
    }


    @Test({
        it: 'returns "4" when adding "1" to "3"'
    })
    public shouldReturnFour() {
        // Given
        const a: number = 1;
        const b: number = 3;
        const expected: number = 4;

        // When
        const sum = this.sum.sum(a, b);
        
        // Then
        assertEqual(sum,expected);
    }

    @Test({
        it: 'returns "10" when adding "6" to "4"'
    })
    public shouldReturnTen() {
        // Given
        const a: number = 6;
        const b: number = 4;
        const expected: number = 10;

        // When
        const sum = this.sum.sum(a, b);
        
        // Then
        assertEqual(sum,expected);
    }
}
