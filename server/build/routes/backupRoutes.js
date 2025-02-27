"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const backupController_1 = __importDefault(require("../controllers/backupController"));
const router = (0, express_1.Router)();
router.post('/api/backup', backupController_1.default.generarBackup);
exports.default = router;
