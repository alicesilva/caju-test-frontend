import { test, expect } from "@playwright/test";

test("should delete registration when user click in delete icon", async ({
  page,
}) => {
  await page.goto("/");

  await page.locator('div').filter({ hasText: /^teste delete/}).getByTestId('delete-icon').first().click();
  await page.getByRole("button", { name: "Sim, desejo excluir" }).click();

  // assert
  await expect(page.locator("#delete-success")).toBeVisible();
});

test('should not delete registration when user do not confirm action', async ({ page }) => {
    await page.goto('/');
    await page.locator('div').filter({ hasText: /Aprovar/}).getByTestId('delete-icon').first().click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    
    // assert
    await expect(page.locator("#delete-success")).not.toBeVisible();
});
