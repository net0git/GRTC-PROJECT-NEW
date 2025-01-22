"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tucController_1 = __importDefault(require("../controllers/tucController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/tuc', tucController_1.default.CrearTuc);
        this.router.get('/api/tuc/buscar/:nro_tuc', tucController_1.default.ObtenerTucPorNumero);
        this.router.get('/api/tuc/detalle/:id_tuc', tucController_1.default.ObtenerTucPorId);
        this.router.get('/api/tuc/listar/:placa', tucController_1.default.listarTucPorPlaca);
        this.router.put('/api/tuc/modificar/:id_tuc', tucController_1.default.ModificarTuc);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;
