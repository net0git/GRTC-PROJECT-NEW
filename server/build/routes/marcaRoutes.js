"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcaController_1 = __importDefault(require("../controllers/marcaController"));
class MarcasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/marca', marcaController_1.default.CrearMarca);
        this.router.get('/api/marca', marcaController_1.default.listarMarcas);
        this.router.get('/api/marca/:id_marca', marcaController_1.default.ObtenerMarca);
        this.router.put('/api/marca/:id_marca', marcaController_1.default.ModificarMarca);
    }
}
const marcasRoutes = new MarcasRoutes;
exports.default = marcasRoutes.router;
