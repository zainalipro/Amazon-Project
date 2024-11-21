import { formatCurrency } from "../scripts/utils/money.js";

// describe the test suite.
describe('Test suite format Currency', () => {
    // test 1
    it('convert cents to dollars', () => {
        expect(formatCurrency(2295)).toEqual('$22.95');
    });
    // test 2
    it('round to zero', () => {
        expect(formatCurrency(0)).toEqual('$0.00');
    });
    // test 3
    it('nearest number', () => {
        expect(formatCurrency(2000.5)).toEqual('$20.01')
    });
});
