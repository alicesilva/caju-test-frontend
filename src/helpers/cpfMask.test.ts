import { cpfMask } from "./cpfMask";

describe("cpfMask", () => {
    it("should add mask in cpf", () => {
        const cpf = "00045600096";
        const expectCPF = "000.456.000-96"
        const cpfMasked = cpfMask(cpf);

        expect(cpfMasked).toBe(expectCPF);
    })

    it("should return empty string when cpf is invalid", () => {
        const cpfInvalid = "wiwuwuuwiwuw";
        const result = cpfMask(cpfInvalid);

        expect(result).toBe("");
    })
})