export function updateTask(list,id,data) {
    const newList = list;
    try {
      for(let  i = 0; i < newList.length; i++) {
        if(newList[i].id === Number(id)) {
          newList[i].description = data;
          newList[i].updatedAt = Date.now();
        }
      }
      console.log(`✅ Task updated successfully (ID${id})`)
    } catch (error) {
      console.log(`❌ Failed to update task (ID${id}) - ${error}`);
    }
      return newList;
  }
