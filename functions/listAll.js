export const listAllTasks = (list) => {
  if (list.length === 0) {
    console.log('A lista de tarefas está vazia!');
    return;
  }
  console.log('-----------Lista de tarefas-----------')
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    console.log(`ID:${element.id}`);
    console.log(`Descrição:${element.description}`);
    console.log(`Status:${element.status}`);
    console.log('--------------------------------------')
    console.log('')
  }
  return;
}