"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
;
var cohortSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose_1.Schema.Types.ObjectId, ref: "Teacher", required: true },
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Student" }],
    BaseHp: { type: Number, default: 100 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Cohort", cohortSchema);
