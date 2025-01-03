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
class ConductorController {
    CrearConductor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_persona, nro_licencia, id_empresa_servicio, categoria } = req.body;
                const consulta = `
                INSERT INTO t_conductor(
                    id_persona,nro_licencia, id_empresa_servicio,categoria)
                VALUES ($1, $2, $3, $4);`;
                const valores = [id_persona, nro_licencia, id_empresa_servicio, categoria];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar conductor:', error);
                    }
                    else {
                        console.log('conductor insertado correctamente');
                        res.json({ text: 'El conductor se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al crear conductor:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarConductoresByEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = `
                    SELECT
                        tc.id_conductor,
                        tp.id_persona,
                        tc.id_conductor,
                        tc.categoria,
                        tp.nombres,
                        tp.ap_paterno,
                        tp.ap_materno,
                        tp.tipo_doc,
                        tp.documento,
                        tp.telefono,
                        tp.correo,
                        tc.nro_licencia
                    FROM
                        t_conductor tc
                    INNER JOIN
                        t_empresa_servicio tes ON tc.id_empresa_servicio = tes.id_empresa_servicio
                    INNER JOIN
                        t_empresa te ON tes.id_empresa = te.id_empresa
                    INNER JOIN
                        t_persona tp ON tc.id_persona = tp.id_persona
                    WHERE
                        tes.id_empresa_servicio =$1
            `;
                const conductores = yield database_1.default.query(consulta, [id_empresa_servicio]);
                if (conductores && conductores['rows'].length > 0) {
                    res.json(conductores['rows']);
                }
                else {
                    res.status(404).json({ text: 'los conductores no existen' });
                }
            }
            catch (error) {
                console.error('Error al obtener conductores:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarTotalConductores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT 
                            tc.id_conductor,
                            tc.nro_licencia,
                            tc.categoria,
                            tp.nombres AS nombre_conductor,
                            tp.ap_paterno AS apellido_paterno,
                            tp.ap_materno AS apellido_materno,
                            tp.tipo_doc AS tipo_documento,
                            tp.documento AS numero_documento,
                            tp.telefono AS telefono,
                            tp.correo AS correo,
                            e.razon_social AS nombre_empresa
                        FROM 
                            t_conductor AS tc
                        JOIN 
                            t_persona AS tp ON tc.id_persona = tp.id_persona
                        JOIN 
                            t_empresa_servicio AS te ON tc.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS  e ON te.id_empresa=e.id_empresa`;
                const conductores = yield database_1.default.query(consulta);
                if (conductores && conductores['rows'].length > 0) {
                    res.json(conductores['rows']);
                }
                else {
                    res.status(404).json({ text: 'los conductores no existen' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener conductores:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarTotalConductoresByEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = `
            SELECT
                    tp.id_persona,
                    tc.id_conductor,
                    tc.categoria,
                    tp.nombres,
                    tp.ap_paterno,
                    tp.ap_materno,
                    tp.tipo_doc,
                    tp.documento,
                    tp.telefono,
                    tp.correo,
                    tc.nro_licencia
                FROM
                    t_conductor tc
                INNER JOIN
                    t_empresa_servicio tes ON tc.id_empresa_servicio = tes.id_empresa_servicio
                INNER JOIN
                    t_empresa te ON tes.id_empresa = te.id_empresa
                INNER JOIN
                    t_persona tp ON tc.id_persona = tp.id_persona
                WHERE
                    tes.id_empresa_servicio =$1
               
                    `;
                const conductores = yield database_1.default.query(consulta, [id_empresa_servicio]);
                res.status(200).json(conductores['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener lista de conductores:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarConductor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_conductor } = req.params;
                const { nro_licencia, categoria } = req.body;
                const consulta = `
                UPDATE t_conductor 
                        SET nro_licencia= $1, categoria=$2 
                WHERE id_conductor=$3`;
                const valores = [nro_licencia, categoria, id_conductor];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar conductor:', error);
                    }
                    else {
                        console.log('conductor modificado correctamente');
                        res.status(200).json({ text: 'el conductor se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar conductor:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarConductor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_conductor } = req.params;
                const consulta = 'DELETE FROM t_conductor WHERE id_conductor =$1';
                database_1.default.query(consulta, [id_conductor], (error) => {
                    if (error) {
                        console.error('Error al eliminar conductor:', error);
                    }
                    else {
                        console.log('conductor eliminado correctamente');
                        res.json({ text: 'el conductor se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al eliminar conductores:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const conductorController = new ConductorController();
exports.default = conductorController;
