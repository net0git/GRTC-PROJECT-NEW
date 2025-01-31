"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const infraestructuraController_1 = __importDefault(require("../controllers/infraestructuraController"));
class EmpresaInfraestructuraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/infraestructura', infraestructuraController_1.default.CrearInfraestructura);
        this.router.get('/api/infraestructura', infraestructuraController_1.default.listarAllInfraestructura);
        this.router.get('/api/infraestructura/detalle/:id_infraestructura', infraestructuraController_1.default.ObtenerInfraestructuraDetalle);
        this.router.get('/api/infraestructura/:id_infraestructura', infraestructuraController_1.default.ObtenerInfraestructura);
        this.router.put('/api/infraestructura/:id_infraestructura', infraestructuraController_1.default.ModificarEmpresaInfraestuctura);
    }
}
const empresaInfraestructuraRoutes = new EmpresaInfraestructuraRoutes;
exports.default = empresaInfraestructuraRoutes.router;
