import updateRegistration from "~/services/api/updateRegistration";
import { api } from "~/clients/registrationsClient";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";

jest.mock("~/clients/registrationsClient", () => ({
  api: {
    put: jest.fn(),
  },
}));

describe("updateRegistration", () => {
  const mockRegistration: Registration = {
    id: "1",
    employeeName: "test name",
    admissionDate: "2022-05-20",
    cpf: "78945612396",
    email: "teste@example.com",
    status: RegistrationStatus.REVIEW,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a PUT request and return updated data", async () => {
    (api.put as jest.Mock).mockResolvedValue({ data: mockRegistration });

    const result = await updateRegistration(mockRegistration);

    expect(api.put).toHaveBeenCalledWith(
      `/registrations/${mockRegistration.id}`,
      mockRegistration
    );
    expect(result).toEqual(mockRegistration);
  });

  it("should throw an error", async () => {
    const mockError = new Error("Error");
    (api.put as jest.Mock).mockRejectedValue(mockError);

    await expect(updateRegistration(mockRegistration)).rejects.toThrow(
      "Error"
    );
    expect(api.put).toHaveBeenCalledWith(
      `/registrations/${mockRegistration.id}`,
      mockRegistration
    );
  });
});
