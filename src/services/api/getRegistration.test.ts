import getRegistrations from "~/services/api/getRegistrations";
import { api } from "~/clients/registrationsClient";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";

jest.mock("~/clients/registrationsClient", () => ({
  api: {
    get: jest.fn(),
  },
}));

describe("getRegistrations", () => {
  const mockRegistrations: Registration[] = [
    {
      id: "1",
      employeeName: "test name",
      admissionDate: "2022-05-20",
      cpf: "78945612396",
      email: "teste@example.com",
      status: RegistrationStatus.REVIEW,
    },
    {
      id: "2",
      employeeName: "test name",
      admissionDate: "2022-05-20",
      cpf: "78945612396",
      email: "teste@example.com",
      status: RegistrationStatus.APPROVED,
    },
    {
      id: "3",
      employeeName: "test name",
      admissionDate: "2022-05-20",
      cpf: "78945612396",
      email: "teste@example.com",
      status: RegistrationStatus.REPROVED,
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a GET request without params", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockRegistrations });

    const result = await getRegistrations();

    expect(api.get).toHaveBeenCalledWith("/registrations", { params: {} });
    expect(result).toEqual(mockRegistrations);
  });

  it("should make a GET request with cpf param", async () => {
    const cpf = "12345678900";
    (api.get as jest.Mock).mockResolvedValue({ data: mockRegistrations });

    const result = await getRegistrations(cpf);

    expect(api.get).toHaveBeenCalledWith("/registrations", { params: { cpf } });
    expect(result).toEqual(mockRegistrations);
  });

  it("should throw an error", async () => {
    const mockError = new Error("Error");
    (api.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getRegistrations()).rejects.toThrow("Error");
    expect(api.get).toHaveBeenCalledWith("/registrations", { params: {} });
  });
});
