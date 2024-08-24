import { test, expect } from "@playwright/test";

test("delete registration success when user click in delete icon", async ({
  page,
}) => {
  await page.goto("/");

  await page.locator('div').filter({ hasText: /^teste delete/}).getByTestId('delete-icon').first().click();
  await page.getByRole("button", { name: "Sim, desejo excluir" }).click();

  // assert
  await expect(page.locator("#delete-success")).toBeVisible();
});
