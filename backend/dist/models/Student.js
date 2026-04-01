import mongoose, { Schema } from "mongoose";
;
const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cohorts: [{ type: Schema.Types.ObjectId, ref: "Cohort" }],
    passwordHash: { type: String, required: true }, // only if students log in
    role: { type: String, default: "student" },
    baseHP: { type: Number, default: 100 },
    currentHP: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model("Student", studentSchema);
