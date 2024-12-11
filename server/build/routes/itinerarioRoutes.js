"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itinerarioController_1 = __importDefault(require("../controllers/itinerarioController"));
class ItinerariRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/itinerario/lista/empresa/:id_empresa_servicio', itinerarioController_1.default.listarItinearioPorEmpresa);
        this.router.post('/api/itinerario', itinerarioController_1.default.CrearItinerario);
        this.router.put('/api/itinerario/:id', itinerarioController_1.default.ModificarItinerario);
        this.router.delete('/api/itinerario/:id', itinerarioController_1.default.EliminarItinerario);
    }
}
const itinerariRoutes = new ItinerariRoutes;
exports.default = itinerariRoutes.router;
