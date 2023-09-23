
# API REST TYPESCRIPT

Projeto criado para comprovação de conhecimento em desenvolvimento **backend** na tecnologia Nodejs com Typescript.

O projeto consiste em uma API REST com as seguintes funcionalidades:

* Operações CRUD em cima de um domínio referente a cursos, videos e conteúdos como regra de negocio;
* Autenticação via JWT;
* Verificação de refresh token com Redis;
* Cache com Redis;
* Disparo de notificações via fila (RabbitMQ);

### TECNOLOGIAS

* NodeJS
* Typescript
* docker
* docker-compose
* Redis
* RabbitMQ
* PostgresSQL
* Swagger


### ARQUITETURA

* Clean Architecture:

<img src="assets/CLEAN-ARCH.png" width="400">

### DESIGN PATTERNS

* Aplicado em cima dos conceitos de SOLID;
* Depencecy Injection via interfaces através do **package ts-ringe**;

### REGRAS DE NEGÓCIO
* Idéia principal: API para cadastro de cursos vinculados a videos e assuntos;

* Cadastro de cursos (courses)
    * Cada curso precisa estar vinculado a um ou mais assuntos (subjects);
    * Cada curso precisa estar vinculado a um ou mais videos;
* Cadastro de videos
  * Cada video precisa estar vinculado a um curso;
* Cadastro de assuntos (subjects)
  * Cada assunto precisa estar vinculado a um ou mais cursos;
### ENTIDADE RELACIONAMENTO NORMA 3N

<img src="assets/ER.png" width="400">

### PRÉ REQUISITOS PARA RODAR LOCALMENTE

Ter instalado em seu computador docker e docker compose.

### COMO EXECUTAR A APLICAÇÃO

Faça o clone do projeto:
```bash
git clone https://github.com/filipeassuncao/api-rest-typescript.git
```
Copie o arquivo .env.example para o .env
```bash
cp .env.example .env
```
Preencha as variaveis que necessitam de valores;

Execute o comando:
```bash
docker-compose up --build
```

Pronto!

