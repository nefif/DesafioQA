# language: pt

@web @login
Funcionalidade: Login de usuário
  Como um usuário cadastrado
  Eu quero acessar minha conta
  Para utilizar as funcionalidades da aplicação

  @smoke @regression @W02
  Cenário: Login com credenciais válidas
    Dado que estou na página de login
    Quando eu informo um e-mail e senha de um usuário válido
    E submeto o formulário de login
    Então eu devo estar autenticado na aplicação
    E devo visualizar o nome do usuário logado

  @smoke @regression @W03 @W10
  Esquema do Cenário: Login com credenciais inválidas
    Dado que estou na página de login
    Quando eu informo o e-mail "<email>" e a senha "<senha>"
    E submeto o formulário de login
    Então um feedback de erro deve ser exibido
    E eu não devo estar autenticado na aplicação

    Exemplos:
      | email                        | senha           |
      | usuario.existente@teste.com  | senhaErrada123  |
