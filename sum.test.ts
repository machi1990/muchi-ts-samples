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
        it: 'adds the number with the amount provided in the second argument'
    })
    public shouldAddTheFirstNumberWithTheSecondNumber() {
        // Given
        const a: number = 1;
        const b: number = 3;
        const expected: number = 4;

        // When
        const sum = this.sum.sum(a, b);
        
        // Then
        assertEqual(sum,expected);
    }

}
