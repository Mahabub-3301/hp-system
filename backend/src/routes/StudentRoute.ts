import express, { Request, Response } from 'express';
import { allStudentsList, createStudent, studentById } from '../controllers/StudentController';
import { create } from 'node:domain';

export const router = express.Router();


//all student list
router.get('/students', allStudentsList);


router.get('/students/:id', studentById);


router.post('/students',createStudent);


export default router;