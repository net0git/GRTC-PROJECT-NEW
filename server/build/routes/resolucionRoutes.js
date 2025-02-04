"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resolucionController_1 = __importDefault(require("../controllers/resolucionController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/api/resolucion', resolucionController_1.default.CrearResolucion);
        this.router.get('/api/resolucion/:id_resolucion', resolucionController_1.default.ObtenerResolucionById);
        this.router.post('/api/resolucion/empresa', resolucionController_1.default.CrearResolucionEmpresaServicio);
        this.router.post('/api/resolucion/infraestructura', resolucionController_1.default.CrearResolucionInfraestructura);
        this.router.get('/api/resolucion/busqueda/:nro_resolucion/:anio_resolucion', resolucionController_1.default.ObtenerResolucionPorNroAnio);
        this.router.get('/api/resolucion/lista/empresa/:id_empresa_servicio', resolucionController_1.default.ObtenerResolucionesDeEmpresaServicio);
        this.router.get('/api/resolucion/lista/infraestructura/:id_infraestructura', resolucionController_1.default.ObtnerResolucionesDeInfraestructura);
        this.router.put('/api/resolucion/modificar/:id_resolucion', resolucionController_1.default.ModificarResolucion);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;
