import "@testing-library/jest-dom";
import Collumns from ".";
import { render, screen } from "@testing-library/react";
import { useFecthData } from "~/components/contexts/RegistrationData";

const registrationsMock = [
  {
    admissionDate: "22/10/2023",
    email: "test@caju.com.br",
    employeeName: "Test",
    status: "APPROVED",
    cpf: "78945612363",
    id: "7899",
  },
  {
    admissionDate: "24/01/2022",
    email: "test1@caju.com.br",
    employeeName: "Test 1",
    status: "REVIEW",
    cpf: "12345678996",
    id: "894",
  },
];

jest.mock("~/components/contexts/ModalContext", () => ({
  useConfirmationModal: jest.fn(() => ({
    setOpenModal: jest.fn(),
  })),
}));
jest.mock("~/components/contexts/RegistrationData", () => ({
  useFecthData: jest.fn(() => ({
    registrations: registrationsMock,
    isLoading: false,
  })),
}));

describe("Collumns", () => {
  afterEach(() => {
    (useFecthData as unknown as jest.Mock).mockClear();
  });

  it("Should show loading when is loading is true", () => {
    (useFecthData as unknown as jest.Mock).mockImplementation(() => ({
      registrations: registrationsMock,
      isLoading: true,
    }));
    const { debug } = render(<Collumns />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    debug();
  });

  it("Should not show loading when is loading is false", () => {
    (useFecthData as unknown as jest.Mock).mockImplementation(() => ({
      registrations: registrationsMock,
      isLoading: false,
    }));
    const { debug } = render(<Collumns />);

    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();
    debug();
  });
});
