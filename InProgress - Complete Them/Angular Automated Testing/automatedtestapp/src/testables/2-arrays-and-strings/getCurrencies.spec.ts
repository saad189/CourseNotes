import { getCurrencies } from './getCurrencies'

describe('getCurrencies', () => {
    it("should get the required currencies", () => {
        const result = getCurrencies();
        expect(result).toContain('EUR');
    });
})