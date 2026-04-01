"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var teacherSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "teacher" },
    cohorts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Cohort" }],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true } // adds createdAt & updatedAt automatically
);
exports.default = mongoose_1.default.model("Teacher", teacherSchema);
