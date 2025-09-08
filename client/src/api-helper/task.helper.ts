import { TaskController } from "../controllers/task.controller";
import type { ITask } from "../interfaces/user";



export const createTask = async (task:Partial<ITask>)=> {
  const res = await TaskController.addTask(task)
  console.log("on helper",res)
  return res
};

export const fetchTasks = async () => {
  const res = await TaskController.getTask()
  return res.data
};

export const deleteTask = async (taskId:string) => {
  const res = await TaskController.removeTask(taskId)
  return res.data
};

export const updateTask = async (taskId:string,updates:Partial<ITask>) => {
  const res = await TaskController.taskUpdate(taskId,updates)
  return res.data
};