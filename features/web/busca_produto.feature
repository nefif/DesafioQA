# language: pt

@web @busca
Funcionalidade: Busca e navegação de produtos
  Como um usuário do site
  Eu quero buscar e navegar entre produtos
  Para encontrar o que estou procurando

  @smoke @regression @W04
  Cenário: Busca de produto por termo
    Dado que estou na página de produtos
    Quando eu busco pelo termo "Dress"
    Então os resultados exibidos devem conter produtos condizentes com o termo buscado

  @regression @W09
  Cenário: Navegação por categoria
    Dado que estou na página inicial
    Quando eu seleciono a categoria "WOMEN" e a subcategoria "Dress"
    Então os produtos listados devem pertencer à categoria selecionada
