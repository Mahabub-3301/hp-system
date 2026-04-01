import { Router } from "express";
import { authMiddleware } from "../middlewares/validationMiddleware";
import Cohort from "../models/Cohort";
const router = Router();
router.get('/cohorts', authMiddleware(["teacher"]), async (req, res) => {
    try {
        const teacherId = req.user.id;
        const cohorts = await Cohort.find({ teacher: teacherId });
        const result = cohorts.map(cohort => ({
            _id: cohort._id,
            name: cohort.name,
            baseHp: cohort.BaseHp,
            createdAt: cohort.createdAt,
            students: cohort.students.length,
        }));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch cohorts" });
    }
});
router.post("/cohorts", authMiddleware(["teacher"]), async (req, res) => {
    try {
        const { name, baseHP } = req.body;
        const teacherId = req.user.id;
        const cohort = new Cohort({
            name,
            teacher: teacherId,
            baseHP: baseHP || 100, // default if not provided
        });
        await cohort.save();
        res.status(201).json(cohort);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create cohort" });
    }
});
router.get("/cohorts/:id", authMiddleware(["teacher"]), async (req, res) => {
    try {
        const teacherId = req.user.id;
        // Find cohort owned by this teacher
        const cohort = await Cohort.findOne({ _id: req.params.id, teacher: teacherId })
            .populate("students", "name email baseHP currentHP");
        // populate only relevant student fields
        if (!cohort) {
            return res.status(404).json({ error: "Cohort not found or not owned by this teacher" });
        }
        res.json(cohort);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch cohort details" });
    }
});
export default router;
