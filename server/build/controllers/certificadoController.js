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
class CertificadoController {
    CrearCertificado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;
                const consulta = `
                INSERT INTO d_certificado(
                    nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento)
                    VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id_certificado; -- Devuelve el ID del certificado insertado`;
                const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar certificado:', error);
                    }
                    else {
                        const idCertificado = resultado.rows[0]['id_certificado']; // ID se encuentra en la primera fila
                        console.log('datos de certificado en BD:', idCertificado);
                        res.status(200).json({ id_certificado: idCertificado, text: 'La certificado se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al crear certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarCertificado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_certificado } = req.params;
                const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;
                const consulta = `
                UPDATE d_certificado 
                    SET nro_certificado= $1, anio_certificado= $2, fecha_certificado= $3, nombre_certificado= $4, tomo_certificado= $5, documento=$6
                WHERE id_certificado=$7`;
                const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento, id_certificado];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar certificado:', error);
                    }
                    else {
                        console.log('certificado modificado correctamente');
                        res.status(200).json({ text: 'El certificado se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al modificar certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtnerCertificadosDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura } = req.params;
                const consulta = `
                    SELECT ce.*
                        FROM d_certificado ce
                        JOIN t_infraestructura_certificados ir ON ce.id_certificado = ir.id_certificado
                    WHERE ir.id_infraestructura =$1
                    ORDER BY ce.fecha_certificado`;
                const certificado = yield database_1.default.query(consulta, [id_infraestructura]);
                if (certificado && certificado['rows'].length > 0) {
                    res.json(certificado['rows']);
                }
                else {
                    res.status(404).json({ text: 'los certificados correspondientes a la infraestrucutra no existen' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtnerCertificadoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_certificado } = req.params;
                const consulta = `
                    SELECT *
                    FROM d_certificado 
                    WHERE id_certificado =$1
             `;
                const certificado = yield database_1.default.query(consulta, [id_certificado]);
                if (certificado && certificado['rows'].length > 0) {
                    res.json(certificado['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'los certificados correspondientes a la infraestrucutra no existen' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener certificado:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    AsociarCertificadoInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_infraestructura, id_certificado } = req.body;
                const consulta = `
                INSERT INTO t_infraestructura_certificados(
                    id_infraestructura,id_certificado)
                VALUES ($1, $2);`;
                const valores = [id_infraestructura, id_certificado];
                database_1.default.query(consulta, valores, (error, resultado) => {
                    if (error) {
                        console.error('Error al insertar certificado a la infraestructura:', error);
                    }
                    else {
                        console.log('certificado insertado correctamente');
                        res.json({ text: 'El certificado asociado a la infraestructura correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al asoiar certificado a infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const certificadoController = new CertificadoController();
exports.default = certificadoController;
