# language: pt

@web @checkout
Funcionalidade: Checkout de compra
  Como um usuário autenticado
  Eu quero finalizar minha compra
  Para concluir o pedido

  @smoke @regression @W06
  Cenário: Fluxo completo de checkout end-to-end
    Dado que estou autenticado na aplicação
    E adiciono um produto ao carrinho
    Quando eu prossigo para o checkout
    E confirmo o pedido
    Então o pedido deve ser confirmado com sucesso
