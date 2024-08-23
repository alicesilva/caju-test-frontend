import { deleteMaskCpf  } from "./deleteMaskCpf";

describe("deleteMaskCpf", () => {
    it("should remove mask on cpf string", () => {
        const cpfWithMask = "000.000.000-00";
        const cpfWithoutMask = "00000000000";
        const result = deleteMaskCpf(cpfWithMask);

        expect(result).toBe(cpfWithoutMask);
    })
})