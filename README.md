
# API REST TYPESCRIPT

Projeto criado para comprovação de conhecimento em desenvolvimento **backend** na tecnologia Nodejs com Typescript.

O projeto consiste em uma API REST com as seguintes funcionalidades:

* Operações CRUD em cima de um domínio referente a cursos, videos e conteúdos como regra de negocio;
* Autenticação via JWT;
* Verificação de refresh token com REDIS;
* Cache com REDIS;
* Disparo de eventos via fila (RabbitMQ);

Para a criação deste projeto foram usadas as seguintes tecnologias:

## Stack utilizada

* NodeJS
* Typescript
* docker
* docker-compose
* REDIS
* RabbitMQ
* PostgresSQL
* Swagger

## Arquitetura

* Clean Architecture;

<img src="assets/cleanArch.png" width="400">

## Design Patterns

* Aplicado em cima dos conceitos de SOLID;
* (Dependency Inversion) Depencecy Injection via interfaces através do **package ts-ringe**;

## Entidade Relacionamento norma 3N

Abaixo o modelo entidade relacionamento da base de dados sobre o dominío da regra de negocio envolvida no projeto:

<img src="assets/ER.png" width="400">

continua...