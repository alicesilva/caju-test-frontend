import { renderHook, act } from "@testing-library/react-hooks";
import useUpdateRegistration from "~/hooks/useUpdateRegistration";
import * as UpdateRegistration from "~/services/api/updateRegistration";
import * as DeleteRegistration from "~/services/api/deleteRegistration";
import { useFecthData } from "~/components/contexts/RegistrationData";
import { useConfirmationModal } from "~/components/contexts/ModalContext";
import { Actions } from "~/types/Actions";
import { Registration } from "~/types/Registration";
import { RegistrationStatus } from "~/types/RegistrationStatus";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("~/services/api/deleteRegistration", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("~/services/api/updateRegistration");

jest.mock("~/components/contexts/RegistrationData", () => ({
  useFecthData: jest.fn(),
}));

jest.mock("~/components/contexts/ModalContext", () => ({
  useConfirmationModal: jest.fn(),
}));

jest.mock("~/helpers/deleteElementFromArray", () => ({
  deleteElemFromArray: jest.fn(),
}));

describe("useUpdateRegistration", () => {
  const mockRegistration: Registration = {
    id: "1",
    employeeName: "John Doe",
    admissionDate: "2024-08-23",
    cpf: "12345678900",
    email: "johndoe@example.com",
    status: RegistrationStatus.REVIEW,
  };

  const mockRegistrations: Registration[] = [mockRegistration];

  const setRegistrations = jest.fn();
  const setOpenModal = jest.fn();
  const setIsConfirm = jest.fn();
  const useFecthDataMock = useFecthData as jest.Mock;
  const useConfirmationModalMock = useConfirmationModal as jest.Mock;

  beforeEach(() => {
    useFecthDataMock.mockReturnValue({
      registrations: mockRegistrations,
      setRegistrations,
    });

    useConfirmationModalMock.mockReturnValue({
      setOpenModal,
      openModal: true,
      isConfirm: true,
      setIsConfirm,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call update registration status if action is update", async () => {
    const updateRegistrationSpy = jest.spyOn(UpdateRegistration, "default");
    
    renderHook(() =>
      useUpdateRegistration(
        Actions.UPDATE,
        mockRegistration,
        RegistrationStatus.APPROVED
      )
    );

    await act(async () => {
      expect(updateRegistrationSpy).toHaveBeenCalledWith({
        ...mockRegistration,
        status: RegistrationStatus.APPROVED,
      });
    });
  });

  it("should call delete registration if action is deleteRegistration", async () => {
    const deleteRegistrationSpy = jest.spyOn(DeleteRegistration, "default");

    renderHook(() =>
      useUpdateRegistration(
        Actions.DELETE,
        mockRegistration,
        RegistrationStatus.APPROVED
      )
    );

    await act(async () => {
      expect(deleteRegistrationSpy).toHaveBeenCalledWith(mockRegistration.id);
    });
  });
});
