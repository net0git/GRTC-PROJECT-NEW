"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reporteController_1 = __importDefault(require("../controllers/reporteController"));
class ReporteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/reporte/lista/empresas/ruta', reporteController_1.default.listarEmpresasByRuta);
        this.router.post('/api/reporte/lista/empresas/ruta/origen/:origen', reporteController_1.default.listarEmpresasPorRutaOrigen);
        this.router.post('/api/reporte/lista/empresas/ruta/destino/:destino', reporteController_1.default.listarEmpresasPorRutaDestino);
        this.router.get('/api/reporte/empresas/ruta/origen/:origen/destino/:destino', reporteController_1.default.ObtenerEmpresasPorRutaOrigenDestino);
        this.router.get('/api/reporte/cantidad/empresas/tiposervicio', reporteController_1.default.CantidadDeEmpresasPorTipoServicio);
        this.router.get('/api/reporte/cantidad/empresas/ruta', reporteController_1.default.CantidadDeEmpresasPorRuta);
        this.router.get('/api/reporte/estado/empresas', reporteController_1.default.CantidadEstadoEmpresas);
        this.router.get('/api/reporte/cantidad/infraestructura', reporteController_1.default.CantidadDeInfraestructura);
        this.router.get('/api/reporte/lista/detalle/empresas-servicio', reporteController_1.default.listarReporteEmpresasServicios);
        this.router.get('/api/reporte/lista/detalle/vehiculos', reporteController_1.default.listarReporteTotalVehiculos);
        this.router.get('/api/reporte/vehiculos/ruta', reporteController_1.default.listarVehiculosPorRuta);
        this.router.get('/api/reporte/vehiculos/ruta/origen/:origen', reporteController_1.default.listarVehiculosPorRutaOrigen);
        this.router.get('/api/reporte/vehiculos/ruta/destino/:destino', reporteController_1.default.listarVehiculosPorDestinoRuta);
        this.router.get('/api/reporte/vehiculos/ruta/origen/:origen/destino/:destino', reporteController_1.default.obtenerVehiculosPorRutaOrigenDestino);
        this.router.get('/api/reporte/cantidad/vehiculos', reporteController_1.default.CantidadVehiculosPorTipoServicio);
        this.router.get('/api/reporte/cantidad/vehiculos/ruta', reporteController_1.default.CantidadVehiculosPorRuta);
        this.router.get('/api/reporte/cantidad/conductores', reporteController_1.default.CantidadDeConductores);
    }
}
const reporteRoutes = new ReporteRoutes;
exports.default = reporteRoutes.router;
