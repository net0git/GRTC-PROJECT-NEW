"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculoController_1 = __importDefault(require("../controllers/vehiculoController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/vehiculo', vehiculoController_1.default.CrearVehiculo);
        this.router.get('/api/vehiculo', vehiculoController_1.default.listarTotalVehiculos);
        this.router.get('/api/vehiculo/empresaservicio', vehiculoController_1.default.listarVehiculosEmpresasServicio);
        this.router.get('/api/vehiculo/lista/empresaservicio/:id_empresa_servicio', vehiculoController_1.default.listarVehiculosEmpresaServicio);
        this.router.get('/api/vehiculo/empresaservicio/:id_empresa_servicio', vehiculoController_1.default.obtenerVehiculosDetalleByEmpresaServicio);
        this.router.get('/api/vehiculo/placa/:placa', vehiculoController_1.default.ObtenerVehiculoPorPlaca);
        this.router.put('/api/vehiculo/:id_vehiculo', vehiculoController_1.default.ModificarVehiculo);
        this.router.put('/api/vehiculo/modificar/tuc', vehiculoController_1.default.ModificarTucVehiculoAsociado);
        this.router.get('/api/vehiculo/baja/:id_vehiculo', vehiculoController_1.default.DarBajaVehiculo);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;
