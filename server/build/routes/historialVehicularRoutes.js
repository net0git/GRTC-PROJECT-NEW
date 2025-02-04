"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historialVehicularController_1 = __importDefault(require("../controllers/historialVehicularController"));
class HistorialVehicularRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/historialvehicular', historialVehicularController_1.default.CrearHistorialVehicular);
        this.router.get('/api/historialvehicular/empresa-servicio/:id_empresa_servicio', historialVehicularController_1.default.ObtenerHistorialVehicularPorEmpresa);
        this.router.get('/api/historialvehicular/placa/:placa', historialVehicularController_1.default.ObtenerHistorialVehicularPorPlaca);
    }
}
const historialVehicularRoutes = new HistorialVehicularRoutes;
exports.default = historialVehicularRoutes.router;
