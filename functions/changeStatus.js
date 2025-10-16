import { Status } from '../status.js';

export function changeStatus(list, id, status) {
  if (status !== Status.CONCLUIDO && status !== Status.EM_ANDAMENTO && status !== Status.PENDENTE) {
    console.log(`❌ Entrada inválida: status '${status}'`);
    return list;
  }

  const newList = list;
  try {
    let found = false;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id === Number(id)) {
        newList[i].status = status;
        newList[i].updatedAt = Date.now();
        found = true;
        console.log(`✅ Task changed successfully (ID${id})`);
        break;
      }
    }

    if (!found) {
      console.log(`❌ Task not found (ID${id})`);
    }

    return newList;
  } catch (error) {
    console.log(`❌ Failed to change the status of task (ID${id}) - ${error}`);
    return newList;
  }
}

