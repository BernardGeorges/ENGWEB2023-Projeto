- [Índice](#índice)
- [Introdução](#introdução)
- [Um belo Projeto](#um-belo-projeto)
- [Análise e Especificação](#análise-e-especificação)
- [Descrição informal do problema](#descrição-informal-do-problema)
- [Levantamento de Requisitos](#levantamento-de-requisitos)
- [Requisitos Mínimos](#requisitos-mínimos)
- [Requisitos Extra](#requisitos-extra)
- [Estrutura/Desenvolvimento](#estruturadesenvolvimento)
	- [Autenticação](#autenticação)
	- [API de Dados](#api-de-dados)
		- [meals.js:](#mealsjs)
		- [reserves.js:](#reservesjs)
		- [users.js:](#usersjs)

#Introdução

O presente relatório descreve o trabalho prático realizado no âmbito da Unidade Curricular de Engenharia Web, inserida no curso de Licenciatura em Engenharia Informática durante o 2º Semestre do ano letivo 2022/2023.
Neste projeto, o grupo optou por escolher o seu próprio tema, que consiste na criação de uma plataforma de suporte a uma empresa de eletrodomésticos.
O objetivo deste trabalho é desenvolver uma plataforma com dois tipos distintos de utilizadores: os clientes e os administradores.
Os clientes podem visualizar informações acerca da empresa, ver e comprar produtos, e enviar e-mails.
Os administradores têm acesso a funcionalidades adicionais, como a gestão do estoque de produtos.

O relatório está dividido em várias seções. Iniciamos com a introdução, que apresenta uma visão geral do trabalho realizado. Em seguida, abordamos a análise e especificação, onde descrevemos informalmente o problema a ser resolvido e estabelecemos os requisitos necessários para a sua resolução. Posteriormente, apresentamos a conceção/desenho da solução, detalhando as estratégias adotadas para o desenvolvimento da plataforma. Prosseguimos com a seção de codificação e testes, onde descrevemos o processo de implementação e os testes realizados para verificar a correta funcionalidade da plataforma. Por fim, concluímos o relatório com uma síntese das principais conclusões obtidas ao longo do projeto.

O objetivo final deste trabalho é fornecer uma plataforma que atenda às necessidades da empresa de eletrodomésticos, permitindo aos clientes interagir com a empresa de forma eficiente e aos administradores gerir o estoque de produtos de forma adequada.

#Levantamento de Requisitosºº

## Requisitos Mínimos
- [x] É possível vizualizar as informações e os produtos sem realizar autenticação;
- [X] Qualquer utilizador pode preencher um formulário com o seu nome, mail e conteúdo de modo a essa informação ser mandada para o email da empresa.
- [ ] Adicionar a possibilidade de fazer upload de uma foto e mandar por email.  
- [x] Caso um cliente desejar adicionar um produto à sua lista de favoritos ou comprar um produto deverá realizar autenticação: username+password;
- [x] Deverá ser possível criar uma nova conta, através do registo, onde será preciso fornecer um username, um nome e uma password para criar a conta.
- [x] Deverão existir pelo menos 2 níveis de acesso:
	- Administrador - pode alterar o stock dos produtos;
	- Cliente - pode adicionar produtos à sua lista de produtos e comprar produtos;
- [X]  O cliente deve conseguir filtrar os produtos por preço ascendente/descente e pelo tipo do produto (Frigorífico, Micro-ondas, Aspirador, Máquina de lavar a roupa e Televisão);


- [x] O utilizador deve conseguir aceder ao seu próprio perfil onde poderá consultar as reservas e os seus atributos.

  

- [x] O administrador poderá adicionar refeições diretamente pela plataforma em si para todos os utilizadores de seguida poderem reservar, só podendo adicionar uma refeição normal e uma vegetariana por cada dia.

  

- [x] O administrador terá acesso a um form onde é disponibilizada uma tabela com todos os utilizadores da plataforma, podendo editá-los ou apagá-los e poderá criar utilizadores novos com os atributos que quiser.

  

  
4 days ago

relatorio em markdown

### Requisitos Extra
yesterday

indice correto agora

20 hours ago

Relatorio 2
  

  

- [x] Se o utilizador tiver sido registado através da página de registo este será considerado "Not Student"

  

- [ ] Caso o utilizador ou administrador se esqueça da password da sua conta poderá recuperá-la através de uma funcionalidade onde é mandado um email para o email associado a sua conta, podendo, assim, alterar a password através do email mandado.

  

- [x] O website deverá ter uma barra de navegação para o utilizador poder navegar facilmente entre as diferentes funcionalidades

  

- [x] O website deverá ter um footer com todas as informações e meios possíveis de um utilizador conseguir contactar a equipa de desenvolvimentos, para problemas técnicos que possam ter com a plataforma, e a cantina, para questões relacionadas com a cantina em si.

  

- [x] O utilizador no seu perfil deverá poder atualizar a sua imagem de perfil, e poderá cancelar reservas em qualquer altura que preceda o dia da reserva.

  

- [ ] O utilizador poderá mudar o website para darkmode, onde o website reduz a luz emitida pela tela do respetivo dispositivo.

  

- [x] O administrador poderá editar as refeições previamente adicionadas, mostrando um aviso caso a refeição que esteja a ser editada esteja a ser disponibilizada para todos os utilizadores.

  

- [x] O administrador poderá adicionar múltiplos utilizadores e refeições através do upload de um ficheiro JSON

  

- [x] Quando é registado um novo utilizador este recebe um email de confirmação para validar a sua conta, só após a validação é que este pode fazer login

  

- [x] Possibilidade de selecionar semanas futuras ou passadas

  

- [x] O utilizador não pode reservar dias que já passaram, nem pode fazer várias reservas para o mesmo dia e mesma refeição (almoço ou jantar)
- [x]  Com o auxílio do Docker, possibilidade de esconder operações sobre a base de dados aos utilizadores.
11 hours ago

Relatorio
- [ ] Com ajuda de uma API externa ter um sistema real de pagamento para a compra de senhas 
20 hours ago

Relatorio 2



  

  
4 days ago

relatorio em markdown

É de notar, tal como já foi dito, que estes requisitos foram feitos para nos conseguirmos orientar e, como tal, é possível que alguns dos requisitos podem não ter sido feitos, ou por questões de tempo ou porque não achamos necessários para fornecer uma melhor experiência ao utilizador.

20 hours ago

Relatorio 2
  

  

