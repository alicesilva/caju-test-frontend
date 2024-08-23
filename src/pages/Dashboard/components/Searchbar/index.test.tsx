import "@testing-library/jest-dom";
import { SearchBar } from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

const mockSetLoadingFunction = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("~/hooks/useFetchData", () => ({
  useFecthData: jest.fn(() => ({
    setIsLoading: mockSetLoadingFunction,
  })),
}));

describe("SearchBar", () => {
  it("Should call setIsLoading when user click in refresh icon", async () => {
    const { debug } = render(<SearchBar />);
    const user = userEvent.setup();

    await user.click(screen.getByTestId("refresh-icon"));

    expect(mockSetLoadingFunction).toHaveBeenCalledTimes(1);
    expect(mockSetLoadingFunction).toHaveBeenCalledWith(true);
    debug();
  });

  it("Should call useHistory when user click in new admission button", async () => {
    const mockResult = {
      push: jest.fn(),
    };
    useHistory.mockImplementation(() => mockResult);
    const { debug } = render(<SearchBar />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Nova Admissão/i }));

    expect(mockResult.push).toHaveBeenCalledTimes(1);
    expect(mockResult.push).toHaveBeenCalledWith("/new-user");
    debug();
  });
});
