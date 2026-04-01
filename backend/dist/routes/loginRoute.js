import bcrypt from "bcrypt";
import Student from "../models/Student";
import Teacher from "../models/Teacher";
const SALT_ROUNDS = 10;
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        if (role === "student") {
            const userExists = await Student.findOne({ email });
            if (userExists) {
                return res.status(409).json({ error: "Email already registered" });
            }
            const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
            const newStudent = new Student({
                name,
                email,
                passwordHash,
                role,
                baseHP: 100,
                currentHP: 100,
            });
            await newStudent.save();
            return res.status(201).json({ message: "Student registered successfully" });
        }
        if (role === "teacher") {
            const userExists = await Teacher.findOne({ email });
            if (userExists) {
                return res.status(409).json({ error: "Email already registered" });
            }
            const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
            const newTeacher = new Teacher({
                name,
                email,
                passwordHash,
                role,
            });
            await newTeacher.save();
            return res.status(201).json({ message: "Teacher registered successfully" });
        }
        return res.status(400).json({ error: "Invalid role specified" });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
};
