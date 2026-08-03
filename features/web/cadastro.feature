# language: pt

@web @cadastro
Funcionalidade: Cadastro de usuário
  Como um visitante do site
  Eu quero me cadastrar na aplicação
  Para poder utilizar as funcionalidades exclusivas de usuários registrados

  @smoke @regression @W01
  Cenário: Cadastro de usuário com dados válidos
    Dado que estou na página inicial do Automation Exercise
    Quando eu acesso a página de cadastro
    E preencho o formulário de cadastro com dados válidos
    E submeto o formulário
    Então o cadastro deve ser confirmado com sucesso
    E devo visualizar a mensagem de conta criada

  @regression @W08
  Cenário: Tentativa de cadastro com campo obrigatório vazio
    Dado que estou na página de cadastro
    Quando eu submeto o formulário sem preencher o campo "nome"
    Então a aplicação não deve concluir o cadastro
    E um indicativo de campo obrigatório deve ser exibido
