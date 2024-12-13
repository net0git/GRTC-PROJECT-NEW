"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresaServicioController_1 = __importDefault(require("../controllers/empresaServicioController"));
class EmpresaServicioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/empresaservicio', empresaServicioController_1.default.CrearEmpresaServicio);
        this.router.get('/api/empresaservicio', empresaServicioController_1.default.listarEmpresasServicios);
        this.router.get('/api/empresaservicio/:id_empresa_servicio', empresaServicioController_1.default.ObtenerEmpresaServicio);
        this.router.get('/api/empresaservicio/detalle/:id_empresa_servicio', empresaServicioController_1.default.ObtenerDetalleEmpresaServicio);
        this.router.put('/api/empresaservicio/:id_empresa_servicio', empresaServicioController_1.default.ModificarEmpresaServicio);
        this.router.get('/api/empresaservicio/:id_tipo_servicio/:empresa_ruc', empresaServicioController_1.default.BuscarEmpresaPorRuc_TipoServicio);
        this.router.post('/api/empresaservicio/:placa', empresaServicioController_1.default.ObtenerEmpresaByPlacaVehiculo);
    }
}
const empresaServicioRoutes = new EmpresaServicioRoutes;
exports.default = empresaServicioRoutes.router;
