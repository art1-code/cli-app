export function deleteTask(list,id) {
    const newList = list;
    try {
      for(let  i = 0; i < newList.length; i++) {
        if(newList[i].id === Number(id)) {
          newList.splice(i,1)
      }
    }
      console.log(`✅ Task deleted successfully (ID${id})`)
    } catch (error) {
      console.log(`❌ Failed to delete task (ID${id}) - ${error}`);
    }
    return newList;
  };
