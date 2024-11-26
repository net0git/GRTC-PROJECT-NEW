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
class ArrendamientoController {
    CrearContratoArrendamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { arrendador, fecha_inicio, fecha_fin, propiedad, id_empresa_servicio, direccion, dni, departamento, provincia, distrito } = req.body;
                const consulta = `
                INSERT INTO t_contrato_arrendamiento(
                    arrendador, fecha_inicio, fecha_fin, propiedad, id_empresa_servicio, direccion, dni, departamento, provincia, distrito)
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                RETURNING id_contrato; -- Devuelve el ID de la empresa`;
                const valores = [arrendador, fecha_inicio, fecha_fin, propiedad, id_empresa_servicio, direccion, dni, departamento, provincia, distrito];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al crear contrato de arrendamiento:', error);
                        res.status(500).json({ error: 'Error interno del servidor' });
                    }
                    else {
                        const idContrato = resultado.rows[0]['id_contrato']; // ID se encuentra en la primera fila
                        res.json({ id_contrato: idContrato, text: 'el contrato se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al crear contrato de arrendamiento:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ListaArrendamientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tuc = yield database_1.default.query('select * from t_contrato_arrendamiento');
                res.json(tuc['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener contratos de arrendamientos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerContratoArrendamientoPorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = `select * from t_contrato_arrendamiento where id_empresa_servicio=$1`;
                const tuc = yield database_1.default.query(consulta, [id_empresa_servicio]);
                if (tuc && tuc['rows'].length > 0) {
                    res.status(200).json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen contratos de arrendamiento' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener contratos de arrendamiento:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarContratoArrendamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_contrato } = req.params;
                const { arrendador, fecha_inicio, fecha_fin, propiedad, id_empresa_servicio, direccion, dni, departamento, provincia, distrito } = req.body;
                const consulta = `
                    UPDATE t_contrato_arrendamiento
                        SET arrendador=$1, fecha_inicio=$2, fecha_fin=$3, propiedad=$4, id_empresa_servicio=$5, direccion=$6, dni=$7, departamento=$8, provincia=$9, distrito=$10
                    WHERE id_contrato=$11;`;
                const valores = [arrendador, fecha_inicio, fecha_fin, propiedad, id_empresa_servicio, direccion, dni, departamento, provincia, distrito, id_contrato];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar el contrato de arrendamiento:', error);
                    }
                    else {
                        console.log('contrato de arrendamiento modificado correctamente');
                        res.status(200).json({ text: 'El contrato de arrendamiento se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al modificar el contrato de arrendamiento:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarContratoArrendamiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_contrato } = req.params;
                const consulta = 'DELETE FROM t_contrato_arrendamiento WHERE id_contrato =$1';
                database_1.default.query(consulta, [id_contrato], (error) => {
                    if (error) {
                        console.error('Error al eliminar contrato de arrendamiento:', error);
                    }
                    else {
                        console.log('contrato de arrendamiento eliminado correctamente');
                        res.json({ text: 'el contrato de arrendamiento se elimino correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al eliminar el contrato de arrendamiento:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const arrendamientoController = new ArrendamientoController();
exports.default = arrendamientoController;
