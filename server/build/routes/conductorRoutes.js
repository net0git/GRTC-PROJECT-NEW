"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conductorController_1 = __importDefault(require("../controllers/conductorController"));
class ConductorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //consultas para las tuc - 
        this.router.get('/api/conductor/lista/empresa/:id_empresa_servicio', conductorController_1.default.listarConductoresByEmpresaServicio);
        this.router.get('/api/conductor', conductorController_1.default.listarTotalConductores);
        this.router.post('/api/conductor', conductorController_1.default.CrearConductor);
        this.router.put('/api/conductor/:id_conductor', conductorController_1.default.ModificarConductor);
        this.router.delete('/api/conductor/:id_conductor', conductorController_1.default.EliminarConductor);
    }
}
const conductorRoutes = new ConductorRoutes;
exports.default = conductorRoutes.router;
