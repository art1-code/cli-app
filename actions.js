const fs = require('fs');
const Status = {
  PENDENTE: "todo",
  EM_ANDAMENTO: "in-progress",
  CONCLUIDO: "done"
};

class CLIapp {

  addTask(list,data) {
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
      console.log(`✅ Task added successfully (ID${nextID})`);
    } catch (error) {
      console.log(`❌ Failed to create task (${data}) - ${error}`);
    }
    return newList;
  };

  updateTask(list,id,data) {
    const newList = list;
    try {
      newList[id-1].description = data;
      newList[id-1].updatedAt = Date.now();
      console.log(`✅ Task updated successfully (ID${id})`)
    } catch (error) {
      console.log(`❌ Failed to update task (ID${id}) - ${error}`);
    }
    return newList;
  };

  deleteTask(list,id) {
    const newList = list;
    try {
      newList.splice((id-1),1)
      console.log(`✅ Task deleted successfully (ID${id})`)
    } catch (error) {
      console.log(`❌ Failed to delete task (ID${id}) - ${error}`);
    }
    return;
  };

  changeStatus(id, status) {
    
  };

  listAllTasks(list) {
    
  };

  listDoneTasks(list) {
    
  };

  listInProgressTasks(list) {
    
  };

  listToDoTasks(list) {
    
  };

  
  // a varivel list em app.js armazenará o rasder() sempre que iniciar o programa
  reader(path) {
    const content = fs.readFileSync(path, 'utf-8');
    return JSON.parse(content);
  }

  saver(path, list) {
    return fs.writeFileSync(path, JSON.stringify(list, null, 2));
  }
}

module.exports = CLIapp;
