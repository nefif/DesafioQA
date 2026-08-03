const { test, expect } = require('@playwright/test');

test.describe('API - Marcas', () => {
  // A02 - GET /brandsList
  test('A02 - GET /brandsList retorna status e estrutura corretos', async ({ request }) => {
    const response = await request.get('/api/brandsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);
  });
});