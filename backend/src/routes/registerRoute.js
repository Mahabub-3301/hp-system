"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var validationMiddleware_1 = require("../middlewares/validationMiddleware");
var router = (0, express_1.Router)();
router.post('/', validationMiddleware_1.validateRegister, authController_1.register);
exports.default = router;
