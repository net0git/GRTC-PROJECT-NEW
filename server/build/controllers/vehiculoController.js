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
class VehiculoController {
    CrearVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis } = req.body;
                const consulta = `
                    INSERT INTO t_vehiculo(
                            placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16 ,$17 ,$18);
            `;
                const valores = [placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al insertar vehiculo:', error);
                    }
                    else {
                        console.log('vehiculo insertado correctamente');
                        res.json({ text: 'El vehiculo se creó correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al crear vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarTotalVehiculos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT
                            ts.denominacion as tipo_servicio,
                            e.razon_social,
                            v.id_vehiculo,
                            v.placa,
                            v.nro_part_reg,
                            v.modalidad,
                            v.estado,
                            v.carga,
                            v.peso,
                            v.categoria,
                            v.anio_fabricacion,
                            v.color,
                            v.nro_chasis,
                            v.nro_asientos,
                            v.marca,
                            v.modelo,
                            v.serie,
                            v.carroceria,
                            v.id_tuc,
                            r.fecha_resolucion as fecha_inicial,
                            es.fecha_final,
                            es.id_tipo_servicio,
                            es.id_empresa_servicio,
                            r.nombre_resolucion,
                            i.itinerario
                        FROM
                            t_vehiculo v
                        JOIN
                            t_empresa_servicio es ON v.id_empresa_servicio = es.id_empresa_servicio
                        JOIN 
                            d_tipo_servicio ts ON es.id_tipo_servicio=ts.id_tipo_servicio
                        JOIN
                            t_empresa e ON es.id_empresa=e.id_empresa
                        JOIN 
                            d_resolucion r ON v.id_resolucion=r.id_resolucion
                        JOIN 
                            t_detalle_ruta_itinerario i ON v.id_detalle_ruta_itinerario=i.id_detalle_ruta_itinerario`;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarVehiculosEmpresasServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT 
                            e.razon_social,
                            e.ruc,
                            te.fecha_inicial,
                            te.fecha_final,
                            v.placa AS placa_vehiculo,
                            v.anio_fabricacion,
                            ts.denominacion AS tipo_servicio,
                            r.itinerario 
                            
                        FROM 
                            t_empresa_servicio AS te
                        JOIN 
                            t_vehiculo AS v ON te.id_empresa_servicio = v.id_empresa_servicio
                        JOIN 
                            d_tipo_servicio AS ts ON te.id_tipo_servicio=ts.id_tipo_servicio
                        JOIN 
                            t_detalle_ruta_itinerario AS r ON v.id_detalle_ruta_itinerario = r.id_detalle_ruta_itinerario
                        JOIN 
                            t_empresa AS e ON te.id_empresa=e.id_empresa `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarVehiculosEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = `
                        SELECT 
                            *  
                        FROM 
                            t_vehiculo 
                        WHERE
                            id_empresa_servicio = $1 `;
                const vehiculos = yield database_1.default.query(consulta, [id_empresa_servicio]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    obtenerVehiculosDetalleByEmpresaServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_empresa_servicio } = req.params;
                const consulta = `
                        SELECT
                            ts.denominacion as tipo_servicio,
                            e.razon_social,
                            v.id_vehiculo,
                            v.placa,
                            v.nro_part_reg,
                            v.modalidad,
                            v.estado,
                            v.carga,
                            v.peso,
                            v.categoria,
                            v.anio_fabricacion,
                            v.color,
                            v.nro_chasis,
                            v.nro_asientos,
                            v.marca,
                            v.modelo,
                            v.serie,
                            v.carroceria,
                            v.id_tuc,
                            r.fecha_resolucion as fecha_inicial,
                            es.fecha_final,
                            r.nombre_resolucion,
                            i.itinerario
                        FROM
                            t_vehiculo v
                        JOIN
                            t_empresa_servicio AS es ON v.id_empresa_servicio = es.id_empresa_servicio
                        JOIN
                            d_tipo_servicio AS ts ON es.id_tipo_servicio = ts.id_tipo_servicio
                        JOIN
                            t_empresa AS e ON es.id_empresa=e.id_empresa
                        JOIN 
                            d_resolucion AS r ON v.id_resolucion=r.id_resolucion
                        JOIN 
                            t_detalle_ruta_itinerario AS i ON v.id_detalle_ruta_itinerario=i.id_detalle_ruta_itinerario
                        WHERE
                            es.id_empresa_servicio=$1 `;
                const vehiculos = yield database_1.default.query(consulta, [id_empresa_servicio]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerVehiculoPorPlaca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { placa } = req.params;
                const consulta = 'select * from t_vehiculo where placa = $1';
                const vehiculo = yield database_1.default.query(consulta, [placa]);
                if (vehiculo && vehiculo['rows'].length > 0) {
                    res.json(vehiculo['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'El vehiculo no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_vehiculo } = req.params;
                const { placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis } = req.body;
                const consulta = `
                UPDATE t_vehiculo
                        SET placa=$1, categoria=$2, anio_fabricacion=$3, peso=$4, carga=$5, serie=$6, nro_asientos=$7, color=$8, carroceria=$9, modalidad=$10, nro_part_reg=$11, id_detalle_ruta_itinerario=$12, id_resolucion=$13, estado=$14, marca=$15, modelo=$16, id_empresa_servicio=$17, nro_chasis=$18
                WHERE id_vehiculo=$19
                `;
                const valores = [placa, categoria, anio_fabricacion, peso, carga, serie, nro_asientos, color, carroceria, modalidad, nro_part_reg, id_detalle_ruta_itinerario, id_resolucion, estado, marca, modelo, id_empresa_servicio, nro_chasis, id_vehiculo];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar vehiculo:', error);
                    }
                    else {
                        console.log('vehiculo modificado correctamente');
                        res.json({ text: 'El vehiculo se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar vehiculo:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarTucVehiculoAsociado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_tuc, id_vehiculo } = req.body;
                const consulta = `
                UPDATE t_vehiculo
                       SET  id_tuc=$1
                WHERE id_vehiculo=$2`;
                const valores = [id_tuc, id_vehiculo];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar tuc vehiculo:', error);
                    }
                    else {
                        console.log('tuc vehiculo modificado correctamente');
                        res.json({ text: 'La tuc del vehiculo se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar vehiculo:', error);
                res.status(500).json({ text: 'Error interno del servidor' });
            }
        });
    }
    DarBajaVehiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_vehiculo } = req.params;
                const consulta = `UPDATE t_vehiculo
                            SET  id_detalle_ruta_itinerario=null, id_tuc=null, id_resolucion=null, estado=null, id_empresa_servicio=null 
                        WHERE id_vehiculo=$1`;
                const valores = [id_vehiculo];
                database_1.default.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al dar de baja al vehiculo:', error);
                    }
                    else {
                        console.log('Baja de vehiculo exitoso');
                        res.json({ text: 'Baja de vehiculo exitoso' });
                    }
                });
            }
            catch (error) {
                console.error('Error al modificar la baja del vehiculo:', error);
                res.status(500).json({ text: 'Error interno del servidor' });
            }
        });
    }
}
const vehiculoController = new VehiculoController();
exports.default = vehiculoController;
