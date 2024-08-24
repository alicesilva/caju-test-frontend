import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import NewUser from ".";
import userEvent from "@testing-library/user-event";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("~/services/api/createRegistration");
jest.mock("~/components/contexts/RegistrationData", () => ({
  useFecthData: jest.fn(() => ({
    setRefresh: jest.fn(),
  })),
}));

const mockHandleSubmit = jest.fn();
jest.mock("formik", () => ({
  useFormik: jest.fn(() => ({
    handleSubmit: mockHandleSubmit,
    values: { employeeName: "", email: "", cpf: "", date: "" },
    touched: { employeeName: true, email: true, cpf: true, date: true },
    errors: {
      employeeName: "O campo é obrigatório.",
      email: "O campo é obrigatório.",
      cpf: "O campo é obrigatório.",
      date: "O campo é obrigatório.",
    },
    setFieldValue: jest.fn(),
  })),
}));

describe("NewUser Component", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render inputs of form", () => {
    render(<NewUser />);

    expect(screen.getByPlaceholderText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByText(/Data de admissão/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
  });

  it("should show error messages when form is invalid", async () => {
    render(<NewUser />);
    await user.click(screen.getByText(/Cadastrar/i));

    let textErrors = [];
    await waitFor(() => {
      textErrors = screen.getAllByText("O campo é obrigatório.");
    });

    expect(textErrors.length).toBe(4);
  });

  it("should submit the form", async () => {
    render(<NewUser />);

    await user.type(screen.getByPlaceholderText(/Nome/i), "Test Name");
    await user.type(
      screen.getByPlaceholderText(/Email/i),
      "teste@gmail.com"
    );
    await user.type(screen.getByPlaceholderText(/CPF/i), "123.456.789-10");
    await user.type(
      screen.getByPlaceholderText(/Data de admissão/i),
      "2020-05-12"
    );

    await user.click(screen.getByText(/Cadastrar/i));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
