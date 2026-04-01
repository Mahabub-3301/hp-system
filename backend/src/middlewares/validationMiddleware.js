"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
var jwt = require("jsonwebtoken");
var JWT_SECRET = "supersecretkey";
// Utility: check if email is valid
function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// Middleware for registration
function validateRegister(req, res, next) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password, role = _a.role;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Name, email, password, and role are required." });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }
    if (!["teacher", "student"].includes(role)) {
        return res.status(400).json({ error: "Role must be either 'teacher' or 'student'." });
    }
    next();
}
// Middleware for login
function validateLogin(req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }
    next();
}
var authMiddleware = function (roles) {
    if (roles === void 0) { roles = []; }
    return function (req, res, next) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }
        var token = authHeader.split(" ")[1];
        try {
            var decoded = jwt.verify(token, JWT_SECRET);
            // Role check
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ error: "Forbidden: insufficient role" });
            }
            // Attach user info to request
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
    };
};
exports.authMiddleware = authMiddleware;
