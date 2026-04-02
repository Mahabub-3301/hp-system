import bcrypt from "bcrypt";
import Student from "../models/Student.ts";
import Teacher from "../models/Teacher.ts";
import jwt from 'jsonwebtoken';
const SALT_ROUNDS = 10;
const JWT_SECRET = "supersecretkey";
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
export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        let user;
        if (role == 'student') {
            user = await Student.findOne({ email });
        }
        else if (role === 'teacher') {
            user = await Teacher.findOne({ email });
        }
        else {
            return res.status(400).json({ error: "Invalid role specified" });
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sigh({
            id: user._id, name: user.name, email: user.email, role
        }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({
            message: "Login successful",
            token,
            role,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error during login" });
    }
};
