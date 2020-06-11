# Projeto Node API com Sequelize

https://blog.rocketseat.com.br/nodejs-express-sequelize/

## Swagger Tools UI

https://swagger.io/tools/swagger-ui/
https://www.npmjs.com/package/swagger-jsdoc
https://www.npmjs.com/package/swagger-ui-express

## Comandos Sequelize

#### Inicializar

Cria arquivos de configuração do sequelize.

```
$ npx sequelize init
```

#### Criar novo Migrate

```
$ npx sequelize migration:create --name=create-users
```

#### Execute Migrate

```
$ npx sequelize db:migrate
```

#### Desfazendo Migrate

```
$ npx sequelize db:migrate:undo
```