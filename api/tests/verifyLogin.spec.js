const { test, expect } = require('@playwright/test');
const contaApi = require('../../fixtures/usuario_api.json').novaContaApi;

// Cada execução usa um e-mail único, e o próprio teste cria/remove a conta
// necessária - assim o teste não depende de uma conta pré-existente no site.
const email = `verify.login.${Date.now()}@teste.com`;

test.describe.serial('API - Verificação de login', () => {
  test.beforeAll(async ({ request }) => {
    await request.post('/api/createAccount', {
      form: { ...contaApi, email }
    });
  });

  test.afterAll(async ({ request }) => {
    await request.delete('/api/deleteAccount', {
      form: { email, password: contaApi.password }
    });
  });

  // A06 - POST /verifyLogin com credenciais válidas
  test('A06 - POST /verifyLogin com credenciais válidas confirma que o usuário existe', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { email, password: contaApi.password }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  // A07 - POST /verifyLogin com credenciais inválidas
  test('A07 - POST /verifyLogin com credenciais inválidas retorna usuário não encontrado', async ({ request }) => {
    const response = await request.post('/api/verifyLogin', {
      form: { email: `naoexiste.${Date.now()}@automationex.com`, password: 'qualquerSenha' }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });
});