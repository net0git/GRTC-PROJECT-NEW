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
class HistorialVehicularController {
    CrearHistorialVehicular(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { condicion, nombre_resolucion, placa, ruta, id_empresa_servicio, fecha_resolucion } = req.body;
                const create_at = new Date();
                const consulta = `
                        INSERT INTO r_empre_histo_vehiculo(
                            condicion, create_at, nombre_resolucion, placa, ruta, id_empresa_servicio, fecha_resolucion)
                        VALUES ($1, $2, $3, $4, $5, $6, $7);`;
                const valores = [condicion, create_at, nombre_resolucion, placa, ruta, id_empresa_servicio, fecha_resolucion];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al insertar historial vehicular:', error);
                    }
                    else {
                        console.log('historial vehicular insertado correctamente');
                        res.json({ text: 'El historila vehicular se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatalal crear historial vehicular:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerHistorialVehicularPorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = `
                        select * from  r_empre_histo_vehiculo where id_empresa_servicio=$1 ORDER BY placa, create_at
                `;
                const historialVehicular = yield database_1.default.query(consulta, [id_empresa_servicio]);
                if (historialVehicular && historialVehicular['rows'].length > 0) {
                    res.json(historialVehicular['rows']);
                }
                else {
                    res.status(404).json({ text: 'El historial vehicular no existe' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener historial vehicular:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerHistorialVehicularPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa } = req.params;
                const consulta = `
                        SELECT ehv.*,
                            e.id_empresa AS id_empresa,
                            e.razon_social AS nombre_empresa
                        FROM r_empre_histo_vehiculo ehv
                        INNER JOIN t_empresa_servicio es ON ehv.id_empresa_servicio = es.id_empresa_servicio
                        INNER JOIN t_empresa e ON es.id_empresa = e.id_empresa
                        WHERE ehv.placa=$1
                        ORDER BY ehv.create_at`;
                const vehiculo = yield database_1.default.query(consulta, [placa]);
                if (vehiculo && vehiculo['rows'].length > 0) {
                    res.json(vehiculo['rows']);
                }
                else {
                    res.status(404).json({ text: 'El historial vehicular no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener historial vehicular:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const historialVehicularController = new HistorialVehicularController();
exports.default = historialVehicularController;
