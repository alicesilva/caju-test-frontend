import deleteRegistration from "~/services/api/deleteRegistration";
import { api } from "~/clients/registrationsClient";

jest.mock("~/clients/registrationsClient", () => ({
  api: {
    delete: jest.fn(),
  },
}));

describe("deleteRegistration", () => {
  const registrationId = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a DELETE request", async () => {
    (api.delete as jest.Mock).mockResolvedValue({});

    await deleteRegistration(registrationId);

    expect(api.delete).toHaveBeenCalledWith(`/registrations/${registrationId}`);
  });

  it("should throw an error", async () => {
    const mockError = new Error("Error");
    (api.delete as jest.Mock).mockRejectedValue(mockError);

    await expect(deleteRegistration(registrationId)).rejects.toThrow("Error");
    expect(api.delete).toHaveBeenCalledWith(`/registrations/${registrationId}`);
  });
});
