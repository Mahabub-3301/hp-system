import studentModel from '../models/Student.ts';
export const allStudentsList = async (_req, res) => {
    let students = await studentModel.find();
    res.send(students);
};
export const studentById = async (req, res) => {
    const { id } = req.params;
    let student = await studentModel.findById(id);
    res.send(student);
};
export const createStudent = async (req, res) => {
    let { name, email, password } = req.body;
    let student = await studentModel.insertOne({ name, email, password });
    res.send("student created ");
};
