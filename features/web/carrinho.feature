# language: pt

@web @carrinho
Funcionalidade: Carrinho de compras
  Como um usuário do site
  Eu quero gerenciar produtos no meu carrinho
  Para preparar minha compra

  @smoke @regression @W05
  Cenário: Adicionar produto ao carrinho
    Dado que estou na página de produtos
    Quando eu adiciono um produto ao carrinho
    E acesso a página do carrinho
    Então o produto adicionado deve estar visível no carrinho

  @regression @W07
  Cenário: Remover produto do carrinho
    Dado que tenho um produto adicionado ao carrinho
    Quando eu removo esse produto do carrinho
    Então o carrinho deve ficar sem o produto removido
