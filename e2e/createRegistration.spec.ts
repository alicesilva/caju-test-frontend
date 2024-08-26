import { test, expect } from '@playwright/test';

test('should create registration with success when fields are valid', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Nova Admissão' }).click();
  await page.getByPlaceholder('Nome').fill('teste name');
  await page.getByPlaceholder('E-mail').fill('teste@gmail.com');
  await page.getByPlaceholder('CPF').fill('560.018.390-93');
  await page.getByPlaceholder('Data de admissão').fill('2024-08-24');
  await page.getByRole('button', { name: 'Cadastrar' }).click();
 
  // assert
  await expect(page.locator('#create-success')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'teste name' }).first()).toBeVisible();
});

test('should not create registration when fields are not valid', async ({ page }) => {
  await page.goto('http://localhost:3001/caju-test-frontend/#/dashboard');
  await page.getByRole('button', { name: 'Nova Admissão' }).click();
  await page.getByRole('button', { name: 'Cadastrar' }).click();

  // assert
  await expect(page.getByText("Nome é obrigatório.").first()).toBeVisible()
});