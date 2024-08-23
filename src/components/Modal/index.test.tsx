import '@testing-library/jest-dom';
import Modal from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

const mockFunction = jest.fn()
jest.mock("~/hooks/useConfirmationModal", () => ({
  useConfirmationModal: jest.fn(() => ({
    setIsConfirm: mockFunction,
    setOpenModal: mockFunction,
    content: {
      title: "Test title",
      subtitle: "Test subtitle",
      isConfirmButtonLabel: "test label confirm",
      isNotConfirmButtonLabel: "test label not confirm",
    },
  })),
}));

describe("Modal", () => {

  beforeEach(() => {
    mockFunction.mockReset();
  })
  it("Should show modal title and subtitle", () => {
    const { debug } = render(<Modal />);
    expect(screen.getByText(/Test title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test subtitle/i)).toBeInTheDocument();
    debug();
  });
  it("Should show modal buttons", () => {
    const { debug } = render(<Modal />);
    expect(screen.getByRole("button", { name: /test label confirm/i }));
    expect(screen.getByRole("button", { name: /test label not confirm/i }));
    debug();
  });

  it("Should call setIsConfirm wnhen user click in confirm button", async () => {
    const { debug } = render(<Modal />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /test label confirm/i }));

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith(true);
    debug()
  })

  it("Should call setOpenModal wnhen user click in not confirm button", async () => {
    const { debug } = render(<Modal />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /test label not confirm/i }));

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith(false);
    debug()
  })
});
