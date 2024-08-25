import { schema } from "./registerFormSchema";

describe("schema", () => {
  it.each([
    [
      true,
      {
        employeeName: "teste name",
        email: "teste@gmail.com",
        cpf: "567.490.080-97",
        date: "12/08/2021",
      },
    ],
    [
      false,
      {
        employeeName: "teste",
        email: "teste@gmail.com",
        cpf: "000.000.000-00",
        date: "12/08/2021",
      },
    ],
    [
      false,
      {
        employeeName: "teste name",
        email: "teste email",
        cpf: "000.000.000-00",
        date: "12/08/2021",
      },
    ],
    [
      false,
      {
        email: "teste email",
        cpf: "000.000.000-00",
        date: "12/08/2021",
      },
    ],
  ])("should valid schema is %s", async (expectedResult, object) => {
    const result = await schema.isValid(object);

    expect(result).toBe(expectedResult);
  });
});
