import { Request, Response } from 'express';
import { router } from '../routes/StudentRoute';
import mongoose from 'mongoose';
import studentModel from '../models/Student';
export const allStudentsList = async(_req: Request, res: Response) => {
    let students=await studentModel.find();
    res.send(students);
};

export const studentById =async(req: Request, res: Response) => {
  const { id } = req.params;
  let student=await studentModel.findById(id);
  res.send(student);
};

export const createStudent= async(req: Request, res: Response) => {
    let {name,email,password}=req.body;
    let student=await studentModel.insertOne({name,email,password});
    res.send("student created ");
};
