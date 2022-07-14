import { greet } from "./greet";

describe('greet', () => {
    it("should include the name in the output", () => {
        const result = greet('Saad');
        expect(result).toContain('Saad');
    });
})