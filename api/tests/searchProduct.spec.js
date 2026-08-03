const { test, expect } = require('@playwright/test');

test.describe('API - Busca de produto', () => {
  // A03 - POST /searchProduct com parâmetro válido
  test('A03 - POST /searchProduct com parâmetro válido retorna resultados', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: { search_product: 'top' }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
  });

  // A04 - POST /searchProduct sem o parâmetro obrigatório
  test('A04 - POST /searchProduct sem parâmetro retorna erro de requisição inválida', async ({ request }) => {
    const response = await request.post('/api/searchProduct', { form: {} });
    expect(response.status()).toBe(200); // a API sempre responde 200 no transporte

    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('search_product parameter is missing');
  });
});