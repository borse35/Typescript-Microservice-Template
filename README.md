# Node.js Microservice Template
Template to quickly bootstrap node.js microservices.

###Included:
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
```

####Postgres Migrations: Read [here](https://sequelize.org/master/manual/migrations.html)
Examples for reference (remove later):
```
sequelize db:migrate                        Run pending migrations
sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
sequelize db:migrate:status                 List the status of all migrations
sequelize db:migrate:undo                   Reverts a migration
sequelize db:migrate:undo:all               Revert all migrations ran
sequelize db:seed                           Run specified seeder
sequelize db:seed:undo                      Deletes data from the database
sequelize db:seed:all                       Run every seeder
sequelize db:seed:undo:all                  Deletes data from the database
sequelize db:create                         Create database specified by configuration
sequelize db:drop                           Drop database specified by configuration
sequelize migration:generate                Generates a new migration file      [aliases: migration:create]
sequelize model:generate                    Generates a model and its migration [aliases: model:create]
sequelize seed:generate                     Generates a new seed file           [aliases: seed:create]


// e.g. create model and migration together
sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

