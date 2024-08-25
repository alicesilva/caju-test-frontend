import userEvent from "@testing-library/user-event";
import ButtonPrimary from ".";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("Should show button", () => {
    const { debug } = render(<ButtonPrimary>Ativar</ButtonPrimary>);
    expect(screen.getByRole("button", { name: /ativar/i }));
    debug();
  });

  it("Should call mockClick when user click on button", async () => {
    const mockClick = jest.fn();
    const user = userEvent.setup();

    const { debug } = render(
      <ButtonPrimary onClick={mockClick}>Ativar</ButtonPrimary>
    );
    await user.click(screen.getByRole("button", { name: /Ativar/i }));
    expect(mockClick).toHaveBeenCalledTimes(1);
    debug();
  });
});
