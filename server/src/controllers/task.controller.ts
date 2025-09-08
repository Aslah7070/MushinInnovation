import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../constants/http.response";
import { HttpStatus } from "../constants/http.status";
import { User } from "../models/implementation/user.mode";
import { Task } from "../models/implementation/task.model";



export const addTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _id } = JSON.parse(req.headers["x-user-payload"] as string);
    const { title, status,description } = req.body;

   
    const user = await User.findById(_id);
    if (!user) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: HttpResponse.USER_NOT_FOUND });
      return;
    }


    const task = new Task({
      title,
      description:description||"",
      status,
      user: user._id,
    });

    await task.save();

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _id } = JSON.parse(req.headers["x-user-payload"] as string);

    const user = await User.findById(_id);
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: HttpResponse.USER_NOT_FOUND,
      });
      return;
    }

    const tasks = await Task.find({ user: _id }).sort({ createdAt: -1 });

    res.status(HttpStatus.OK).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _id } = JSON.parse(req.headers["x-user-payload"] as string);
    const { taskId } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: _id }, // only allow user’s own tasks
      { title, description, status, dueDate },
      { new: true }
    );

    if (!task) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { _id } = JSON.parse(req.headers["x-user-payload"] as string);
    const { taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId, user: _id });

    if (!task) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
