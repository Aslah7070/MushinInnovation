
import express from "express"
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller"
import { authVerification } from "../middlewares/auth.middleware"

const task=express.Router()

task.use(authVerification)
task.post("/add",addTask)
task.patch("/update/:taskId",updateTask)
task.delete("/delete/:taskId",deleteTask)
task.get("/",getTasks)

// .post("/logout",errorCatch(logout))


export  {task}        