const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv();

// A10 (bônus) - schema esperado da resposta de /productsList
const productsListSchema = {
  type: 'object',
  required: ['responseCode', 'products'],
  properties: {
    responseCode: { type: 'number' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'price', 'brand', 'category'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'string' },
          brand: { type: 'string' },
          category: {
            type: 'object',
            required: ['usertype', 'category'],
            properties: {
              usertype: { type: 'object' },
              category: { type: 'string' }
            }
          }
        }
      }
    }
  }
};
const validateProductsListSchema = ajv.compile(productsListSchema);

test.describe('API - Produtos', () => {
  // A01 - GET /productsList
  test('A01 - GET /productsList retorna status e estrutura corretos', async ({ request }) => {
    const response = await request.get('/api/productsList');
    expect(response.status()).toBe(200);

    const body = await response.json();
    // A API sempre responde HTTP 200 no transporte; o status "de verdade"
    // vem no campo responseCode do corpo da resposta.
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  // A10 (bônus) - validação programática de schema
  test('A10 - GET /productsList respeita o schema esperado', async ({ request }) => {
    const response = await request.get('/api/productsList');
    const body = await response.json();

    const valid = validateProductsListSchema(body);
    expect(valid, JSON.stringify(validateProductsListSchema.errors)).toBeTruthy();
  });
});