import { expect, test } from '@playwright/test';

test('starts the scene and accepts both keyboard layouts after resizing', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');

  const coordinates = page.locator('#coordinates');
  await expect(coordinates).toHaveText('X 0.0 m · Z 7.0 m');
  await expect(page.locator('#error')).toBeHidden();

  await page.keyboard.down('d');
  try {
    await expect(coordinates).not.toHaveText('X 0.0 m · Z 7.0 m');
  } finally {
    await page.keyboard.up('d');
  }

  await page.setViewportSize({ width: 800, height: 600 });
  await expect(page.locator('canvas')).toHaveJSProperty('height', 360);
  await expect(page.locator('canvas')).toHaveJSProperty('width', 480);

  const beforeArrow = await coordinates.textContent();
  await page.keyboard.down('ArrowUp');
  try {
    await expect(coordinates).not.toHaveText(beforeArrow ?? '');
  } finally {
    await page.keyboard.up('ArrowUp');
  }
  expect(errors).toEqual([]);
});
