import createRegistration from "~/services/api/createRegistration";
import { api } from "~/clients/registrationsClient";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";

jest.mock("~/clients/registrationsClient", () => ({
  api: {
    post: jest.fn(),
  },
}));

describe("createRegistration", () => {
  const mockRegistration: Registration = {
    employeeName: "test name",
    admissionDate: "2022-05-20",
    cpf: "78945612396",
    email: "teste@example.com",
    status: RegistrationStatus.REVIEW,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a POST request with the correct data", async () => {
    (api.post as jest.Mock).mockResolvedValue({});

    await createRegistration(mockRegistration);

    expect(api.post).toHaveBeenCalledWith("/registrations", mockRegistration);
  });

  it("should throw an error", async () => {
    const mockError = new Error("Error");
    (api.post as jest.Mock).mockRejectedValue(mockError);

    await expect(createRegistration(mockRegistration)).rejects.toThrow("Error");
    expect(api.post).toHaveBeenCalledWith("/registrations", mockRegistration);
  });
});
