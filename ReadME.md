# Desafio Técnico — Automação de Testes (Analista de Qualidade)

Suíte de automação de testes para o site [automationexercise.com](https://automationexercise.com), cobrindo as camadas **Web (UI)** com BDD/Gherkin e **API** com testes diretos em JavaScript, usando **Playwright**.

---

## Índice

- [Stack utilizada](#stack-utilizada)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tags dos cenários](#tags-dos-cenários)
- [Como executar os testes](#como-executar-os-testes)
- [Evidências em caso de falha](#evidências-em-caso-de-falha)
- [Cobertura de testes](#cobertura-de-testes)
- [Decisões técnicas e suposições](#decisões-técnicas-e-suposições)

---

## Stack utilizada

- **JavaScript** + **Playwright** (`@playwright/test` e `playwright`)
- **Cucumber.js** (`@cucumber/cucumber`) para a camada Web em BDD/Gherkin
- **Ajv** para validação de schema JSON na API (bônus)

### Por que Playwright?

O desafio permitia escolher entre Cypress e Playwright. Optei por **Playwright** pelos seguintes motivos:

- **Uma ferramenta só para Web e API** — o mesmo `APIRequestContext` que dirige o browser na camada Web é reaproveitado nos testes de API (`request` fixture do `@playwright/test`), sem precisar de bibliotecas HTTP extras (axios, supertest, etc).
- **Auto-waiting nativo** — o Playwright espera elementos ficarem "acionáveis" (visíveis, habilitados, estáveis) antes de interagir, o que reduz flakiness sem precisar de `sleep`/waits manuais espalhados pelo código.
- **Melhor suporte a múltiplos browsers e execução headless/headed** de forma simples, incluindo debugging visual (Trace Viewer, Inspector) quando um teste falha.
- **Integração direta com Cucumber.js** sem plugin adicional (diferente do Cypress, que exige o pacote `@badeball/cypress-cucumber-preprocessor` para rodar BDD).
- **Contexto de browser isolado por padrão**, o que facilita gerenciar sessões/cookies entre cenários sem vazamento de estado.

A desvantagem é que o Playwright não roda nativamente *dentro* do browser como o Cypress (o que dá ao Cypress um pouco mais de facilidade para depurar em tempo real via interface própria) — mas para os objetivos deste desafio (BDD + API no mesmo projeto), o Playwright se encaixou melhor.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (instalado junto com o Node.js)

---

## Instalação

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd DesafioQA

# 2. Instalar as dependências
npm install

# 3. Instalar o browser usado pelo Playwright
npx playwright install chromium
```


Por padrão, sem nenhuma configuração adicional, o projeto já aponta para `https://automationexercise.com`.

---

## Estrutura do projeto

```
DesafioQA/
├── features/
│   └── web/                    # Cenários BDD (Gherkin)
│       ├── cadastro.feature
│       ├── login.feature
│       ├── busca_produto.feature
│       ├── carrinho.feature
│       └── checkout.feature
│
├── step_definitions/            # Implementação dos steps (Web)
│   ├── common.steps.js
│   ├── cadastro.steps.js
│   ├── login.steps.js
│   ├── busca_produto.steps.js
│   ├── carrinho.steps.js
│   └── checkout.steps.js
│
├── pages/                       # Page Objects (Web)
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── CadastroPage.js
│   ├── ProductsPage.js
│   ├── CarrinhoPage.js
│   └── CheckoutPage.js
│
├── support/                     # Infraestrutura do Cucumber
│   ├── config.js                # BASE_URL centralizada
│   ├── world.js                 # World customizado (Playwright)
│   └── hooks.js                 # Before/After + evidência em falha
│
├── api/
│   └── tests/                   # Testes de API (Playwright Test puro)
│       ├── products.spec.js
│       ├── brands.spec.js
│       ├── searchProduct.spec.js
│       ├── verifyLogin.spec.js
│       └── account.spec.js
│
├── fixtures/                    # Massa de dados
│   ├── usuarios.json            # Dados de login/cadastro (Web)
│   ├── pagamento.json           # Dados de cartão de teste (checkout)
│   └── usuario_api.json         # Dados de conta (API)
│
├── reports/                     # Relatórios e evidências (gitignored)
│
├── cucumber.js                  # Configuração do Cucumber (camada Web)
├── playwright.config.js         # Configuração do Playwright Test (camada API)
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## Tags dos cenários

Todos os cenários Web têm tags para facilitar filtragem e rastreabilidade:

| Tipo de tag | Exemplos | Finalidade |
|---|---|---|
| **Funcional** | `@cadastro`, `@login`, `@busca`, `@carrinho`, `@checkout` | Identifica a qual funcionalidade o cenário pertence |
| **Prioridade** | `@smoke`, `@regression` | `@smoke` marca os cenários **MUST** (críticos); `@regression` marca os **SHOULD** (esperados) |
| **Rastreabilidade** | `@W01` a `@W10` | Liga cada cenário diretamente ao ID do caso de teste do desafio, facilitando conferência de cobertura |

Isso permite rodar apenas um subconjunto dos testes conforme a necessidade (ex: só os críticos antes de um deploy, ou só a regressão completa).

---

## Como executar os testes

### Testes Web (BDD)

```bash
# Suíte completa
npm run test:web

# Apenas os cenários críticos (MUST)
npm run test:web:smoke

# Apenas a regressão (SHOULD)
npm run test:web:regression
```

O relatório HTML é gerado em `reports/cucumber-report.html`.

### Testes de API

```bash
npm run test:api
```

O relatório HTML é gerado em `reports/playwright-report/index.html`.

### Rodar tudo

```bash
npm run test:web && npm run test:api
```

---

## Evidências em caso de falha

Sempre que um cenário **Web** falha, um screenshot da tela no momento da falha é salvo automaticamente em `reports/screenshots/`, via hook `After` configurado em `support/hooks.js` — sem precisar de nenhuma configuração adicional na hora de rodar.

---

## Cobertura de testes

### Camada Web

| ID | Caso de Teste | Nível | Status |
|---|---|---|---|
| W01 | Cadastro de usuário | MUST | ✅ Implementado |
| W02 | Login — credenciais válidas | MUST | ✅ Implementado |
| W03 | Login — credenciais inválidas | MUST | ✅ Implementado |
| W04 | Busca de produto | MUST | ✅ Implementado |
| W05 | Adicionar produto ao carrinho | MUST | ✅ Implementado |
| W06 | Fluxo de checkout E2E | MUST | ✅ Implementado |
| W07 | Remover produto do carrinho | SHOULD | ✅ Implementado |
| W08 | Validação de campo obrigatório | SHOULD | ✅ Implementado |
| W09 | Navegação por categoria | SHOULD | ✅ Implementado |
| W10 | Scenario Outline / Examples | SHOULD | ✅ Implementado (login inválido) |
| W11 | Tags nos cenários | BONUS | ✅ Implementado |
| W12 | Evidência em falha | BONUS | ✅ Implementado |

### Camada API

| ID | Endpoint | Nível | Status |
|---|---|---|---|
| A01 | GET /productsList | MUST | ✅ Implementado |
| A02 | GET /brandsList | MUST | ✅ Implementado |
| A03 | POST /searchProduct — válido | MUST | ✅ Implementado |
| A04 | POST /searchProduct — sem parâmetro | MUST | ✅ Implementado |
| A05 | POST /createAccount | MUST | ✅ Implementado |
| A06 | POST /verifyLogin — válido | MUST | ✅ Implementado |
| A07 | POST /verifyLogin — inválido | MUST | ✅ Implementado |
| A08 | DELETE /deleteAccount | SHOULD | ✅ Implementado |
| A09 | PUT /updateAccount | SHOULD | ✅ Implementado |
| A10 | Validação de schema | BONUS | ✅ Implementado (Ajv em /productsList) |

---

## Decisões técnicas e suposições

- **BASE_URL centralizada** em `support/config.js`, com override via variável de ambiente `BASE_URL`, para facilitar trocar de ambiente sem alterar código.
- **A API do automationexercise sempre responde HTTP 200 no transporte**, independentemente do resultado da operação. O status "de verdade" (200, 201, 400, 404, 405) vem no campo `responseCode` dentro do corpo JSON. Por isso, todas as asserções de API checam tanto `response.status()` (sempre 200) quanto `body.responseCode` (o valor que reflete o resultado real).
- **Independência de massa de dados na API** — os testes de `verifyLogin.spec.js` e `account.spec.js` criam a própria conta necessária (com e-mail único gerado por timestamp) e a removem ao final, em vez de depender de uma conta previamente cadastrada manualmente. Isso torna a suíte de API repetível em qualquer ambiente, sem setup manual prévio.
- **`test.describe.serial`** é usado em `account.spec.js` para garantir que criar → atualizar → remover a conta rodem em sequência, na mesma conta.
- **Dado de teste do login inválido (Web)** — a Examples table de `login.feature` usa um e-mail com formato válido, porém inexistente, em vez de um e-mail malformado. Um e-mail sem `@` aciona a validação nativa do HTML5 no campo `type="email"`, bloqueando o envio do formulário antes mesmo de chegar ao servidor — o que impediria de testar de fato o comportamento de "credenciais inválidas" da aplicação.
- **Waits explícitos em ações via AJAX** — no carrinho (adicionar/remover produto), o site atualiza a página via AJAX sem reload. Por isso, os Page Objects aguardam explicitamente o estado final (elemento visível/desanexado) antes de prosseguir, evitando condições de corrida.
- **Fluxo de checkout completo** — o "Place Order" do automationexercise leva a uma página de pagamento (dados de cartão fictícios) antes de exibir a confirmação do pedido; isso está representado em `CheckoutPage.js` e nos dados de `fixtures/pagamento.json`.
- **Timeout padrão do Cucumber aumentado para 30s** (`setDefaultTimeout` em `support/hooks.js`), já que o valor padrão (5s) é curto para steps que envolvem navegação real no browser.