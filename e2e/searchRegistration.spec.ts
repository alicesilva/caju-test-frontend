import { test, expect } from '@playwright/test';

test('search by cpf', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Digite um CPF válido').fill('56001839093');

  //assert
  await expect(page.getByRole('heading', { name: 'teste name' }).first()).toBeVisible();

});