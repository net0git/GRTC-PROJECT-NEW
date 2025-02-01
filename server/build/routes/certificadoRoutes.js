"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const certificadoController_1 = __importDefault(require("../controllers/certificadoController"));
class CertificadoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/certificado/lista/infraestructura/:id_infraestructura', certificadoController_1.default.ObtnerCertificadosDeInfraestructura);
        this.router.get('/api/certificado/detalle/:id_certificado', certificadoController_1.default.ObtnerCertificadoById);
        this.router.post('/api/certificado', certificadoController_1.default.CrearCertificado);
        this.router.post('/api/certificado/asociar/infraestructura', certificadoController_1.default.AsociarCertificadoInfraestructura);
        this.router.put('/api/certificado/:id_certificado', certificadoController_1.default.ModificarCertificado);
    }
}
const certificadoRoutes = new CertificadoRoutes;
exports.default = certificadoRoutes.router;
