import "@testing-library/jest-dom";
import RegistrationCard from ".";
import { render, screen } from "@testing-library/react";
import { RegistrationStatus } from "~/types/RegistrationStatus";
import userEvent from "@testing-library/user-event";
import { contentsModal } from "~/constants/contentsModal";

const mockSetOpenModal = jest.fn();
const mockSetContent = jest.fn();
jest.mock("~/hooks/useUpdateRegistration");
jest.mock("~/components/contexts/ModalContext", () => ({
  useConfirmationModal: jest.fn(() => ({
    setOpenModal: mockSetOpenModal,
    setContent: mockSetContent,
  })),
}));

const data = {
  admissionDate: "22/10/2023",
  email: "test@caju.com.br",
  employeeName: "Test",
  status: RegistrationStatus.APPROVED,
  cpf: "78945612363",
  id: "7899",
};
describe("Collumns", () => {
  beforeEach(() => {
    mockSetContent.mockReset();
    mockSetOpenModal.mockReset();
  });

  it("Should not show approved and reproved button and show review button when status's registration is approved", () => {
    const { debug } = render(<RegistrationCard data={data} />);

    const approvedButton = screen.queryByRole("button", { name: /Aprovar/i });
    const reprovedButton = screen.queryByRole("button", { name: /Reprovar/i });
    const reviewButton = screen.getByRole("button", {
      name: /Revisar novamente/i,
    });

    expect(approvedButton).not.toBeInTheDocument();
    expect(reprovedButton).not.toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();

    debug();
  });

  it("Should show approved and reproved button and not show review button when status's registration is review", () => {
    data.status = RegistrationStatus.REVIEW;
    const { debug } = render(<RegistrationCard data={data} />);

    const approvedButton = screen.getByRole("button", { name: /Aprovar/i });
    const reprovedButton = screen.getByRole("button", { name: /Reprovar/i });
    const reviewButton = screen.queryByRole("button", {
      name: /Revisar novamente/i,
    });

    expect(approvedButton).toBeInTheDocument();
    expect(reprovedButton).toBeInTheDocument();
    expect(reviewButton).not.toBeInTheDocument();

    debug()
  });

  it("should call setContent and setOpenModal when user click in update actions button", async () => {
    const user = userEvent.setup();
    const { debug } = render(<RegistrationCard data={data} />);
    await user.click(screen.getByRole("button", { name: /Aprovar/i }));

    expect(mockSetContent).toHaveBeenCalledTimes(1);
    expect(mockSetContent).toHaveBeenCalledWith(contentsModal.UPDATE);
    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
    debug()
  });

  it("should call setContent and setOpenModal when user click in delete actions button", async () => {
    const user = userEvent.setup();
    const { debug } = render(<RegistrationCard data={data} />);
    await user.click(screen.getByTestId("delete-icon"));

    expect(mockSetContent).toHaveBeenCalledTimes(1);
    expect(mockSetContent).toHaveBeenCalledWith(contentsModal.DELETE);
    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
    debug()
  });
});
