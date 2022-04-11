# Typescript Microservice Template
Template to quickly bootstrap typescript microservices.

### Included:
```
1. Express application
2. Sample config json file parsed with nconf to store secrets
3. Connect to common databases (Mongo, PostgreSQL, Redis) simply by updating config with corresponding connection details (i.e host, port, username, password)
4. Examples for using MongoDb (using mongoose), PostgreSQL (using sequelize), and Redis (using ioredis).
5. Wrappers (for functions) & middlewares (for ReqHandlers) to cache data on redis
5. Separate controllers for requests from client (external), employee-dashboard (dashboard), other-sibling-services (internal).
6. DAO folder for making db calls
7. Custom error classes to handle them differently and avoid spam to error monitoring service
8. Standard set of middlewares including rate-limiter, helmet, bodyparser etc
9. Example for tests written using mocha chai for TDD/BDD
```

### Notes:
```
1. Remove all files that have this comment in them "Example file, delete later"
2. Use RegExp.safe() to avoid ReDoS
3. Use validator (package) to validate and sanitize user input
4. Validate object structures using joi (package) wherever necessary
5. Validate request data using celebrate (package)
6. Be aware that redis keys auto expire. Update REDIS_DEFAULT_EXPIRY
7. Connection attempts to databases will expire according to MAX_CONNECTION_DELAY
8. Redis data is compressed using snappy (package) to improve storage and network throughput
9. Sequelize auto sync has been removed to maintain behaviour consistency and experience across environments
10. Accessing sequelize through javascript (models, seeders, migrations). Sequelize in TS is too verbose
```

### Postgres Migrations [(Reference)](https://sequelize.org/master/manual/migrations.html)
Migrations and seed files need to be generated in /migrations and /seeders folder respectively.
But they must be run through dist/migrations/* and dist/seeders/* (we need modules written in ts).
Therefore a commandline helper sqlize.js is added to save effort of mentioning overridden paths everytime.

Simply replace "npx sequelize-cli" or "sequelize" with "node sqlize.js" 

CLI Command Examples:
```
node sqlize.js db:migrate                        Run pending migrations
node sqlize.js db:migrate:schema:timestamps:add  Update migration table to have timestamps
node sqlize.js db:migrate:status                 List the status of all migrations
node sqlize.js db:migrate:undo                   Reverts a migration
node sqlize.js db:migrate:undo:all               Revert all migrations ran
node sqlize.js db:seed                           Run specified seeder
node sqlize.js db:seed:undo                      Deletes data from the database
node sqlize.js db:seed:all                       Run every seeder
node sqlize.js db:seed:undo:all                  Deletes data from the database
node sqlize.js db:create                         Create database specified by configuration
node sqlize.js db:drop                           Drop database specified by configuration
node sqlize.js migration:generate                Generates a new migration file      [aliases: migration:create]
node sqlize.js model:generate                    Generates a model and its migration [aliases: model:create]
node sqlize.js seed:generate                     Generates a new seed file           [aliases: seed:create]

// e.g. create model and migration together
node sqlize.js model:generate --name User --attributes firstName:string,lastName:string,email:string
```
