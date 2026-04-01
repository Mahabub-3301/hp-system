import mongoose, { Schema } from "mongoose";
;
const cohortSchema = new Schema({
    name: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    BaseHp: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model("Cohort", cohortSchema);
