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
class ModeloController {
    CrearModelo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_modelo, id_marca } = req.body;
                const consulta = `
                    INSERT INTO t_modelo(
                        nombre_modelo, id_marca)
                    VALUES ($1, $2);`;
                const valores = [nombre_modelo, id_marca];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar modelo:', error);
                    }
                    else {
                        console.log('modelo insertado correctamente');
                        res.json({ text: 'El modelo se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al crear modelo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    obtenerModelosByMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_marca } = req.params;
                const consulta = `
                    SELECT * FROM t_modelo 
                    WHERE 
                        id_marca=$1 `;
                const valores = [id_marca];
                const modelos = yield database_1.default.query(consulta, valores);
                if (modelos && modelos['rows'].length > 0) {
                    res.json(modelos['rows']);
                }
                else {
                    res.status(404).json({ text: 'la lista de modelos no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener modelos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarModelo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_modelo } = req.params;
                const { nombre_modelo } = req.body;
                const consulta = `
                UPDATE t_modelo
                     SET nombre_modelo= $1
                WHERE id_modelo=$2
                `;
                const valores = [nombre_modelo, id_modelo];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al insertar modelo:', error);
                    }
                    else {
                        console.log('modelo modificado correctamente');
                        res.json({ text: 'el modelo se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar modelo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const modeloController = new ModeloController();
exports.default = modeloController;
