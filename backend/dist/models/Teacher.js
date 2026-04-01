import mongoose, { Schema } from "mongoose";
const teacherSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "teacher" },
    cohorts: [{ type: Schema.Types.ObjectId, ref: "Cohort" }],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true } // adds createdAt & updatedAt automatically
);
export default mongoose.model("Teacher", teacherSchema);
