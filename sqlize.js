const fileCreationCommands = [
  "migration:generate",
  "migration:create",
  "seed:generate",
  "seed:create",
  "model:generate",
  "model:create",
];

const commands = [
  ...fileCreationCommands,
  "db:migrate",
  "db:migrate:schema:timestamps:add",
  "db:migrate:status",
  "db:migrate:undo",
  "db:migrate:undo:all",
  "db:seed",
  "db:seed:undo",
  "db:seed:all",
  "db:seed:undo:all",
  "db:create",
  "db:drop",
];

const [command, ...args] = process.argv.slice(2);

if (!commands.includes(command))
  throw new Error('Invalid Sequelize Argument ' + command);

const { execSync } = require('child_process');

let extraArg = '';
let prependedCommand = '';
if (fileCreationCommands.includes(command)) {
  // overriding paths mentioned in .sequelizerc
  extraArg = '--migrations-path migrations/ --seeders-path seeders/ --models-path models/psql/'
} else {
  prependedCommand = 'rm -r dist && tsc &&'
}

const finalCommand = `${prependedCommand} npx sequelize-cli ${command} ${extraArg} ${args.join(' ')} --debug`;

try {
  console.log('Running::', finalCommand)
  const res = execSync(finalCommand, { encoding: 'utf-8' });
  console.log(res);
} catch (e) {
  console.log('Command failed', finalCommand);
}