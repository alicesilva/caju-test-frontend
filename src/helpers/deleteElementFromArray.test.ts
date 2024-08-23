import { deleteElemFromArray } from "./deleteElementFromArray";

describe("deleteElemFromArray", () => {
    it("should remove element from array", () => {
        const array = [1,2,3,4];
        const element = 3
        const newArray = deleteElemFromArray(array, element);

        expect(newArray.includes(element)).toBe(false);
    })
})