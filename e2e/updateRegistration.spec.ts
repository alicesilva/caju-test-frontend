import { test, expect } from '@playwright/test';

test('update registration success when user click in status button', async ({ page }) => {
    await page.goto('/');
    await page.getByText('teste name').first().click();
    await page.getByRole('button', { name: 'Aprovar' }).nth(1).click();
    await page.getByRole('button', { name: 'Sim, desejo atualizar' }).click();
    
    // assert
    await expect(page.locator('#update-sucess')).toBeVisible();
});