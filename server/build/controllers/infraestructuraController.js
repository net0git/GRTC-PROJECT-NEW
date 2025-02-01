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
class InfraestructuraController {
    CrearInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura(
                      id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa)
                        VALUES ($1, $2, $3, $4, $5, $6, $7,$8 ,$9 ,$10 ,$11 ,$12, $13)
                    RETURNING id_infraestructura; -- Devuelve el id_infraestructura`;
                const valores = [id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al crear infraestructura:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idInfraestructura = resultado.rows[0]['id_infraestructura']; // ID se encuentra en la primera fila
                        res.json({ id_infraestructura: idInfraestructura, text: 'La infraestructura se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear emrpesa por infraestuctura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarAllInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT
                            ti.id_tipo_infraestructura,
                            ti.id_infraestructura,
                            ti.expediente,
                            ti.provincia,
                            ti.distrito,
                            ti.departamento,
                            ti.nombre_infraestructura,
                            di.denominacion AS tipo_infraestructura,
                            ti.direccion,
                            ti.fecha_act,
                            r.nombre_resolucion
                        FROM
                            t_infraestructura ti
                        JOIN
                            d_tipo_infraestructura di ON ti.id_tipo_infraestructura = di.id_tipo_infraestructura
                        JOIN 
                            t_infraestructura_resoluciones tir ON ti.id_infraestructura=tir.id_infraestructura
                        JOIN
                            d_resolucion r ON tir.id_resolucion = r.id_resolucion
                        WHERE
                            r.fecha_resolucion = ti.fecha_act;`;
                const emrpesaInfraestructura = yield database_1.default.query(consulta);
                res.json(emrpesaInfraestructura['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener las empresas por infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerInfraestructuraDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura } = req.params;
                const consulta = `
                            SELECT
                                ti.*,
                                di.denominacion AS tipo_infraestructura
                            FROM
                                t_infraestructura ti
                            JOIN
                                d_tipo_infraestructura di ON ti.id_tipo_infraestructura = di.id_tipo_infraestructura
                            WHERE ti.id_infraestructura=$1;
                     `;
                const empresaInfraestructura = yield database_1.default.query(consulta, [id_infraestructura]);
                if (empresaInfraestructura && empresaInfraestructura['rows'].length > 0) {
                    res.json(empresaInfraestructura['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'La infraestructura no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener la infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura } = req.params;
                const consulta = `
                            SELECT
                                *
                            FROM
                                t_infraestructura 
                            WHERE id_infraestructura=$1;
                     `;
                const empresaInfraestructura = yield database_1.default.query(consulta, [id_infraestructura]);
                if (empresaInfraestructura && empresaInfraestructura['rows'].length > 0) {
                    res.json(empresaInfraestructura['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'La infraestructura no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener la infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarEmpresaInfraestuctura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura } = req.params;
                const { id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa } = req.body;
                const consulta = `
                UPDATE t_infraestructura 
                     SET id_tipo_infraestructura=$1, fecha_act=$2, expediente=$3, ruc_empresa=$4, nombre_infraestructura=$5, direccion=$6, distrito=$7, provincia=$8, departamento=$9, mtc=$10, representante=$11, dni_representante=$12, empresa=$13
                WHERE id_infraestructura=$14`;
                const valores = [id_tipo_infraestructura, fecha_act, expediente, ruc_empresa, nombre_infraestructura, direccion, distrito, provincia, departamento, mtc, representante, dni_representante, empresa, id_infraestructura];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar la infraestructura:', error);
                    }
                    else {
                        console.log('La infraestructura se ha modificado correctamente');
                        res.json({ text: 'La infraestructura se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al modificar la infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const infraestructuraController = new InfraestructuraController();
exports.default = infraestructuraController;
