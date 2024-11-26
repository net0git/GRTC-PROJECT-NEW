"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modeloController_1 = __importDefault(require("../controllers/modeloController"));
class ModeloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/modelo', modeloController_1.default.CrearModelo);
        this.router.get('/api/modelo/grupo/:id_marca', modeloController_1.default.obtenerModelosByMarca);
        this.router.put('/api/modelo/:id_modelo', modeloController_1.default.ModificarModelo);
    }
}
const modeloRoutes = new ModeloRoutes;
exports.default = modeloRoutes.router;
