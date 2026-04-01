"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var userRoutes_1 = require("./routes/userRoutes");
var loginRoute_1 = require("./routes/loginRoute");
var registerRoute_1 = require("./routes/registerRoute");
var teacherRoutes_1 = require("./routes/teacherRoutes");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/users", userRoutes_1.default);
app.use('/login', loginRoute_1.default);
app.use('/register', registerRoute_1.default);
app.use('/teacher', teacherRoutes_1.default);
app.get("/", function (req, res) {
    res.send("Backend running with TypeScript 🚀");
});
app.listen(PORT, function () {
    console.log("Server started on http://localhost:".concat(PORT));
});
