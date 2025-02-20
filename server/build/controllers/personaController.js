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
const database_1 = __importDefault(require("../database/database"));
class PersonaController {
    CrearPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo } = req.body;
                const consulta = `
                INSERT INTO t_persona(nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id_persona; -- devuelve el ID de la persona insertada
            `;
                const valores = [nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar persona:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idPersona = resultado.rows[0]['id_persona']; // ID se encuentra en la primera fila
                        console.log('datos de usuario en BD:', idPersona);
                        res.json({ id_persona: idPersona, text: 'La persona se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al crear persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarPersonas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personas = yield database_1.default.query('select * from t_persona');
                res.status(200).json(personas['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener personas:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_persona } = req.params;
                const consulta = 'select * from t_persona where id_persona = $1';
                const persona = yield database_1.default.query(consulta, [id_persona]);
                if (persona && persona['rows'].length > 0) {
                    res.json(persona['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'La persona no existe' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerPersonaBydocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento } = req.params;
                const consulta = 'select * from t_persona where documento = $1';
                const persona = yield database_1.default.query(consulta, [documento]);
                if (persona && persona['rows'].length > 0) {
                    res.json(persona['rows']);
                }
                else {
                    res.status(404).json({ text: 'La persona no existe' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_persona } = req.params;
                const { nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo } = req.body;
                const consulta = `
                UPDATE t_persona 
                     SET nombres= $1, ap_paterno= $2, ap_materno= $3, tipo_doc= $4, documento= $5, telefono= $6, correo= $7 
                WHERE id_persona=$8
                `;
                const valores = [nombres, ap_paterno, ap_materno, tipo_doc, documento, telefono, correo, id_persona];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar persona:', error);
                    }
                    else {
                        console.log('persona modificada correctamente');
                        res.json({ text: 'La persona se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al modificar persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_persona } = req.params;
                const consulta = `
                        DELETE FROM t_persona where id_persona=$1;
                `;
                database_1.default.query(consulta, [id_persona], (error) => {
                    if (error) {
                        console.error('Error al eliminar persona:', error);
                    }
                    else {
                        console.log('persona elimada correctamente');
                        res.json({ text: 'La persona se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al eliminar persona:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const personaController = new PersonaController();
exports.default = personaController;
