import ButtonPrimary from ".";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("Should show button", () => {
    const { debug } = render(<ButtonPrimary>Ativar</ButtonPrimary>);
    expect(screen.getByRole("button", { name: /ativar/i }));
    debug();
  });
});
