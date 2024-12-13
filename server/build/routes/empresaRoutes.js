"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresaController_1 = __importDefault(require("../controllers/empresaController"));
class TucRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/empresa', empresaController_1.default.listarEmpresas);
        this.router.get('/api/empresa/:id_empresa', empresaController_1.default.ObtenerEmpresa);
        this.router.get('/api/empresa/detalle/:id_empresa', empresaController_1.default.ObtenerEmpresaDetalle);
        this.router.get('/api/empresa/ruc/:ruc_empresa', empresaController_1.default.ObtenerEmpresaPorRuc);
        this.router.post('/api/empresa', empresaController_1.default.CrearEmpresa);
        this.router.put('/api/empresa/:id_empresa', empresaController_1.default.ModificarEmpresa);
    }
}
const tucRoutes = new TucRoutes;
exports.default = tucRoutes.router;
