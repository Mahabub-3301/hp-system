import express from 'express';
import { allStudentsList, createStudent, studentById } from '../controllers/StudentController.ts';
export const router = express.Router();
//all student list
router.get('/students', allStudentsList);
router.get('/students/:id', studentById);
router.post('/students', createStudent);
export default router;
