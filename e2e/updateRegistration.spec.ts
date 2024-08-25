import { test, expect } from '@playwright/test';

test('should update registration to approved when user click in status button', async ({ page }) => {
    await page.goto('/');
    await page.getByText('teste name').first().click();
    await page.getByRole('button', { name: 'Aprovar' }).nth(1).click();
    await page.getByRole('button', { name: 'Sim, desejo atualizar' }).click();
    
    // assert
    await expect(page.locator('#update-sucess')).toBeVisible();
});

test('should update registration to review when user click in status button', async ({ page }) => {
    await page.goto('/');
    await page.getByText('teste name').first().click();
    await page.getByRole('button', { name: 'Revisar novamente' }).nth(1).click();
    await page.getByRole('button', { name: 'Sim, desejo atualizar' }).click();
    
    // assert
    await expect(page.locator('#update-sucess')).toBeVisible();
});

test('should update registration to reproved when user click in status button', async ({ page }) => {
    await page.goto('/');
    await page.getByText('teste name').first().click();
    await page.getByRole('button', { name: 'Aprovar' }).nth(1).click();
    await page.getByRole('button', { name: 'Sim, desejo atualizar' }).click();
    
    // assert
    await expect(page.locator('#update-sucess')).toBeVisible();
});

test('should not update registration when user do not confirm action', async ({ page }) => {
    await page.goto('/');
    await page.getByText('teste name').first().click();
    await page.getByRole('button', { name: 'Reprovar' }).first().click();
    await page.getByRole('button', { name: 'Cancelar' }).click();
    
    // assert
    await expect(page.locator('#update-sucess')).not.toBeVisible();
});