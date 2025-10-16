import { Status } from '../status.js';

export function changeStatus(list,id,status) {
    if (status !== Status.CONCLUIDO && status !== Status.EM_ANDAMENTO && status !== Status.PENDENTE) {
      throw new Error('Entrada inválida');
    } 
    const newList = list;
    try {
      for(let  i = 0; i < newList.length; i++) {
        if(newList[i].id === Number(id)) {
          newList[i].status = status;
          newList[i].updatedAt = Date.now();
        }
      }
      console.log(`✅ Task changed sucessfully (ID${id})`);
      return newList;
    } catch (error) {
      console.log(`❌ Failed to change the status of task (ID${id}) - ${error}`);
    }
    return newList;
  };

