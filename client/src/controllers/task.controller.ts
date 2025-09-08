

import { axiosInstance } from "../configs/axios.config";
import type { ITask } from "../interfaces/user";


export class TaskController {

  static async addTask(task: Partial<ITask>) {
    try {
      const response = await axiosInstance.post("/task/add",task)
     
      if (response) {
 console.log(response,"R")
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
    static async getTask() {
    try {
      const response = await axiosInstance.get("/task/")
     
      if (response) {
 console.log(response,"R")
 return response.data
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
      static async removeTask(taskId:string) {
    try {
      const response = await axiosInstance.delete(`/task/delete/${taskId}`)
     
      if (response) {
 console.log(response,"R")
 return response.data
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

        static async taskUpdate(taskId:string,updatedTask:Partial<ITask>) {
    try {
      const response = await axiosInstance.patch(`/task/update/${taskId}`,updatedTask)
     
      if (response) {
 console.log(response,"R")
 return response.data
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}


