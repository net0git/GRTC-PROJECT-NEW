"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database")); // Ruta al archivo db.ts
class RutaController {
    listarRutas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rutas = yield database_1.default.query('select * from t_detalle_ruta_itinerario');
                res.status(200).json(rutas['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener rutas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarRutasOrigen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                SELECT DISTINCT
                    tdr.origen AS origen_ruta
                FROM 
                    t_detalle_ruta_itinerario AS tdr
                WHERE 
                    (tdr.origen IS NOT NULL AND tdr.origen <> '')`;
                const rutas = yield database_1.default.query(consulta);
                res.status(200).json(rutas['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener rutas origen:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarRutasDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                SELECT DISTINCT
                    tdr.destino AS destino_ruta
                FROM 
                    t_detalle_ruta_itinerario AS tdr
                WHERE 
                    (tdr.destino IS NOT NULL AND tdr.destino <> '');`;
                const rutas = yield database_1.default.query(consulta);
                res.status(200).json(rutas['rows']);
            }
            catch (error) {
                console.error('Error al obtener rutas destino:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const rutaController = new RutaController();
exports.default = rutaController;
