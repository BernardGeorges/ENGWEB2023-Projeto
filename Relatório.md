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

# Introdução

O presente relatório descreve o trabalho prático realizado no âmbito da Unidade Curricular de Engenharia Web, inserida no curso de Licenciatura em Engenharia Informática durante o 2º Semestre do ano letivo 2022/2023.
Neste projeto, o grupo optou por escolher o seu próprio tema, que consiste na criação de uma plataforma de suporte a uma empresa de eletrodomésticos.
O objetivo deste trabalho é desenvolver uma plataforma com dois tipos distintos de utilizadores: os clientes e os administradores.
Os clientes podem visualizar informações acerca da empresa, ver e comprar produtos, e enviar e-mails.
Os administradores têm acesso a funcionalidades adicionais, como a gestão do estoque de produtos.

O relatório está dividido em várias seções. Iniciamos com a introdução, que apresenta uma visão geral do trabalho realizado. Em seguida, abordamos a análise e especificação, onde descrevemos informalmente o problema a ser resolvido e estabelecemos os requisitos necessários para a sua resolução. Posteriormente, apresentamos a conceção/desenho da solução, detalhando as estratégias adotadas para o desenvolvimento da plataforma. Prosseguimos com a seção de codificação e testes, onde descrevemos o processo de implementação e os testes realizados para verificar a correta funcionalidade da plataforma. Por fim, concluímos o relatório com uma síntese das principais conclusões obtidas ao longo do projeto.

O objetivo final deste trabalho é fornecer uma plataforma que atenda às necessidades da empresa de eletrodomésticos, permitindo aos clientes interagir com a empresa de forma eficiente e aos administradores gerir o estoque de produtos de forma adequada.

# Levantamento de Requisitos

- [x] É possível vizualizar as informações e os produtos sem realizar autenticação;
- [X] Qualquer utilizador pode preencher um formulário com o seu nome, mail e conteúdo de modo a essa informação ser mandada para o email da empresa.
- [ ] Adicionar a possibilidade de fazer upload de uma foto e mandar por email.  
- [x] Caso um utilizador desejar adicionar um produto à sua lista de favoritos ou comprar um produto deverá realizar autenticação: username+password;
- [x] Deverá ser possível criar uma nova conta, através do registo, onde será preciso fornecer um username, um nome e uma password para criar a conta.
- [x] Deverão existir pelo menos 2 níveis de acesso:
	- Administrador - pode alterar o stock dos produtos;
	- Cliente - pode adicionar produtos à sua lista de favoritos, filtrar e comprar produtos;
- [x] O Cliente deverá conseguir vizualizar apenas os produtos com stock superior a 0.
- [x] O cliente deve conseguir filtrar os produtos por preço ascendente/descente e pelo tipo do produto (Frigorífico, Micro-ondas, Aspirador, Máquina de lavar a roupa e Televisão);
- [x] O cliente deverá conseguir vizualizar os produtos adicionados aos Favoritos e ao Carrinho;
- [x] O cliente deverá conseguir remover produtos dos Favoritos e do Carrinho;
- [ ] O cliente deverá conseguir comprar os produtos do Carrinho, diminuindo o stock dos mesmos e ficando o Carrinho vazio.
- [ ] O Administrador deverá conseguir adicionar e remover um produto;
- [x] O Administrador deverá conseguir vizualizar todos os produtos e alterar o seu stock;
- [x] O website deverá ter uma barra de navegação para o utilizador poder navegar facilmente entre as diferentes páginas
- [x] O website deverá ter um footer com algumas informações de contacto com a empresa.
- [x] O website deverá ter uma página Produtos diferente para cada tipo de utilizador.
- [ ] Quando é registado um novo utilizador este recebe um email de confirmação para validar a sua conta, só após a validação é que este pode fazer login


É importante ressaltar que os requisitos estabelecidos serviram como guia para o desenvolvimento, porém, devido a restrições de tempo ou por o grupo considerar que não eram essenciais para proporcionar uma melhor experiência ao utilizador, alguns requisitos não foram implementados.


# Estrutura/Desenvolvimento

Neste Capítulo iremos falar de como o projeto foi estruturado e mostrar o seu desenvolvimento em termos de codificação. Este projeto foi estruturado entre três sub-aplicações:

1. Autenticação: Nessa parte, foi implementado um sistema de autenticação para garantir a segurança da plataforma. A autenticação é necessária para garantir que apenas utilizadores autorizados possam acessar a plataforma e realizar ações específicas, de acordo com os seus níveis de acesso. Para gerir os utilizadores e as respetivas sessões são utilizados os módulos *passport-local* e *jsonwebtoken*. O módulo *jsonwebtoken* é apenas utilizado para a geração de um token que irá identificar a sessão do utilizador. Este token será utilizado pela interface como uma cookie.

2. API de Dados: A API de Dados foi desenvolvida para lidar com o armazenamento e gerenciamento dos dados da plataforma. Foi utilizado uma base de dados, através do software MongoDB, para armazenar informações dos utilizadores, refeições e reservas. A API fornece endpoints para a criação, leitura, atualização e exclusão de dados, permitindo que a plataforma interaja com a base de dados de forma segura e eficiente.
3. 
4. Interface: Foi projetada uma interface amigável e intuitiva, com layouts e componentes adequados para facilitar a interação dos utilizadores com a plataforma. Foram utilizadas tecnologias web, como Pug, CSS e JavaScript. A interface permite que os utilizadores possam interagir com a plataforma, podendo realizar o login e o registo, visualizar a ementa da cantina, comprar senhas, reservar refeições e ver o seu perfil, e os que forem administradores, criar novos utilizadores e refeições.

Cada uma dessas partes desempenha um papel fundamental no funcionamento da plataforma, trabalhando em conjunto para a nossa plataforma poder funcionar na totalidade. A estruturação em três partes distintas permite que o projeto seja dividido em módulos independentes, facilitando o desenvolvimento, manutenção e escalabilidade da plataforma.


# Datasets

Usando o site https://datagen.di.uminho.pt/ foi criado o dataset referente aos produtos de modo a dependendo do tipo de produto as informações do mesmo eram difentes

### Dataset Utilizadores
![users](imagens/produtos.png  "Dataset produtos")

# Modo de funcionamento

O nosso projeto está preparado para correr no docker, sendo composto por 4 containers distintos. Apenas o container da interface, chamado AppCantina está exposto para o exterior (porta 7777) de  forma a proteger a aplicação. Assim, para correr a  nossa aplicação é apenas necessárrio correr o comando:  `docker-compose up -d --build`.
Além disso, é necessário ter algumas veriáveis de ambiente definidas num ficheiro `.env`. Estas variáveis servem para utilizar a API MailJet e correspondem à API KEY e à API SECRET, que são as chaves que permitem identificar a conta de quem está a usar a API. Por razões de segurança estes dados não são expostos.

