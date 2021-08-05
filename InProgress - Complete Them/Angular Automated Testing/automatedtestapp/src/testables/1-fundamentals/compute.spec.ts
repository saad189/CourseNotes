import { compute } from './compute'

describe("Compute", () => {
    it("should return 0 if input is negative ", () => {

        const result = compute(-1);
        expect(result).toBe(0);
    })

    it("should return number + 1 if result is positive", () => {
        const number = 1;
        const result = compute(number);
        expect(result).toBe(number + 1);
    })
})