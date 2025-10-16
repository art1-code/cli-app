#!/usr/bin/env node

import { Command } from 'commander';
import { addTask } from "./functions/add.js";
import { updateTask } from "./functions/update.js";
import { deleteTask } from './functions/delete.js';
import { reader } from './functions/reader.js';
import { saver } from './functions/saver.js';
import { changeStatus } from './functions/changeStatus.js';

const path = './tasks.json';
const list = reader(path);

const program = new Command();

program
  .name('task-manager-cli')
  .description('Gerenciador de tarefas')
  .version('1.0.0');

program
  .command('add')
  .description('Adiciona uma nova task')
  .argument('<task>','descricao da task')
  .action((task) => saver(path, addTask(list,task)));

program
  .command('update')
  .argument('<id>', 'id que será modificado')
  .argument('<task>', 'novo argumento da task x')
  .description('Atualiza a descrição de uma task')
  .action((id,task) => saver(path, updateTask(list,id,task)));

program
  .command('delete')
  .description('Deleta a task passada')
  .argument('<id>', 'id a ser removido')
  .action(id => saver(path, deleteTask(list,id)));

program
  .command('set-status')
  .argument('<id>', 'id que será modificado')
  .argument('<status>', 'status que será modificado')
  .description('Atualiza o status de uma task')
  .action((id,status) => saver(path, changeStatus(list,id,status)));

program.parse(process.argv);
