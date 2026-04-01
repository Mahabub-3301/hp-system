"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
;
var studentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cohorts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Cohort" }],
    passwordHash: { type: String, required: true }, // only if students log in
    role: { type: String, default: "student" },
    baseHP: { type: Number, default: 100 },
    currentHP: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Student", studentSchema);
