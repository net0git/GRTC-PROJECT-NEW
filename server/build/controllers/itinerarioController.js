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
class ItinerarioController {
    CrearItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino, itinerario, frecuencia, id_empresa_servicio } = req.body;
                const consulta = `
                INSERT INTO t_detalle_ruta_itinerario(
                       origen, destino,itinerario, frecuencia, id_empresa_servicio)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id_detalle_ruta_itinerario; -- Devuelve el ID de la empresa 
                    `;
                const valores = [origen, destino, itinerario, frecuencia, id_empresa_servicio];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar itinerario:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idItinerario = resultado.rows[0]['id_detalle_ruta_itinerario']; // ID se encuentra en la primera fila
                        res.json({ id_detalle_ruta_itinerario: idItinerario, text: 'El itinerario se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarItinearioPorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = 'select * from t_detalle_ruta_itinerario where id_empresa_servicio = $1';
                const itinerarios = yield database_1.default.query(consulta, [id_empresa_servicio]);
                if (itinerarios && itinerarios['rows'].length > 0) {
                    res.json(itinerarios['rows']);
                }
                else {
                    res.status(404).json({ text: 'la lista no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener lista de itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { origen, destino, itinerario, frecuencia, id_empresa_servicio } = req.body;
                const consulta = `
                UPDATE t_detalle_ruta_itinerario 
                SET origen=$1, destino=$2, itinerario=$3, frecuencia=$4, id_empresa_servicio=$5
                WHERE id_detalle_ruta_itinerario=$6
                `;
                const valores = [origen, destino, itinerario, frecuencia, id_empresa_servicio, id];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al modificar irinerario:', error);
                    }
                    else {
                        console.log('itinerario modificado correctamente');
                        res.json({ text: 'El itinerario se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarItinerario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const consulta = 'DELETE FROM t_detalle_ruta_itinerario WHERE id_detalle_ruta_itinerario =$1';
                database_1.default.query(consulta, [id], (error) => {
                    if (error) {
                        console.error('Error al eliminar itinerario :', error);
                        res.json({ text: 'error' });
                    }
                    else {
                        console.log('itinerario eliminado correctamente');
                        res.json({ text: 'el itinerario se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar itinerario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const itinerarioController = new ItinerarioController();
exports.default = itinerarioController;
