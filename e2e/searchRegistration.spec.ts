import { test, expect } from "@playwright/test";

test("should search by cpf success", async ({ page }) => {
  await page.goto("/");
  await page.getByPlaceholder("Digite um CPF válido").fill("56001839093");

  //assert
  await expect(
    page.getByRole("heading", { name: "teste name" }).first()
  ).toBeVisible();
});

test("should show none card when user search by cpf invalid", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByPlaceholder("Digite um CPF válido").fill("00099900000");

  //assert
  await expect(page.getByRole("button", { name: "Aprovar" })).not.toBeVisible();
});
