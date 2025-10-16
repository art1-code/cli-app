import { Status } from '../status.js';

export function addTask(list,data) {
    const newList = list;
    const nextID = list.length > 0 ? list[list.length - 1].id : 0;
    try {
      newList.push({
        'id': nextID + 1,
        'description' : data,
        'status': Status.PENDENTE,
        'createAt': Date.now(),
        'updatedAt':Date.now(),
      });
      console.log(`✅ Task added successfully (ID${nextID + 1})`);
    } catch (error) {
      console.log(`❌ Failed to create task (${data}) - ${error}`);
    }
    return newList;
  };
