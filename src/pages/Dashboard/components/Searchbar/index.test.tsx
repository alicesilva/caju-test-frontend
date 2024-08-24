import "@testing-library/jest-dom";
import { SearchBar } from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

const mockSetRefreshFunction = jest.fn();
const mockSetSearchQuery = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("~/components/contexts/RegistrationData", () => ({
  useFecthData: jest.fn(() => ({
    setRefetch: mockSetRefreshFunction,
    setSearchQuery: mockSetSearchQuery,
  })),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    mockSetRefreshFunction.mockReset();
    mockSetSearchQuery.mockReset();
  });
  it("Should call setIsLoading when user click in refresh icon", async () => {
    const { debug } = render(<SearchBar />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId("refresh-icon"));

    expect(mockSetRefreshFunction).toHaveBeenCalledTimes(1);
    expect(mockSetRefreshFunction).toHaveBeenCalledWith(true);
    debug();
  });

  it("Should call useHistory when user click in new admission button", async () => {
    const mockResult = {
      push: jest.fn(),
    };
    (useHistory as unknown as jest.Mock).mockImplementation(() => mockResult);
    const { debug } = render(<SearchBar />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Nova Admissão/i }));

    expect(mockResult.push).toHaveBeenCalledTimes(1);
    expect(mockResult.push).toHaveBeenCalledWith("/new-user");
    debug();
  });

  it("Should call setSearchQuery when user type valid cpf", async () => {
    const { debug } = render(<SearchBar />);
    const user = userEvent.setup();
    const cpf = "88845612363";
    await user.type(
      screen.getByPlaceholderText("Digite um CPF válido"),
      cpf
    );

    expect(mockSetSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockSetSearchQuery).toHaveBeenCalledWith(cpf);
    debug();
  });
});
