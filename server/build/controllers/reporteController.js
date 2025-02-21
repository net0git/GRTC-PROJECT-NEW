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
class ReporteController {
    listarEmpresasByRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT DISTINCT
                            tdr.origen AS origen_ruta,
                            tdr.destino AS destino_ruta,
                            e.razon_social AS nombre_empresa
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        JOIN 
                            t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS e ON te.id_empresa = e.id_empresa
                        WHERE 
                            (tdr.origen IS NOT NULL AND tdr.origen <> '') AND (tdr.destino IS NOT NULL AND tdr.destino <> '');
                    `;
                const tuc = yield database_1.default.query(consulta);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarEmpresasPorRutaOrigen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen } = req.params;
                const consulta = `
                            SELECT DISTINCT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                e.razon_social AS nombre_empresa
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                            JOIN 
                                t_empresa AS e ON te.id_empresa = e.id_empresa
                            WHERE 
                                tdr.origen =$1;
                    `;
                const tuc = yield database_1.default.query(consulta, [origen]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por origen ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por origen ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarEmpresasPorRutaDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { destino } = req.params;
                const consulta = `
                                SELECT DISTINCT
                                    tdr.origen AS origen_ruta,
                                    tdr.destino AS destino_ruta,
                                    e.razon_social AS nombre_empresa
                                FROM 
                                    t_detalle_ruta_itinerario AS tdr
                                JOIN 
                                    t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                                JOIN 
                                    t_empresa AS e ON te.id_empresa = e.id_empresa
                                WHERE 
                                    tdr.destino = $1;
                    `;
                const tuc = yield database_1.default.query(consulta, [destino]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por destino ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerEmpresasPorRutaOrigenDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino } = req.params;
                const consulta = `
                            SELECT DISTINCT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                e.razon_social AS nombre_empresa
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                            JOIN 
                                t_empresa AS e ON te.id_empresa = e.id_empresa
                            WHERE 
                                tdr.origen =$1 AND tdr.destino = $2;
                    `;
                const tuc = yield database_1.default.query(consulta, [origen, destino]);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen empresas por origen y destino ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener empresas por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadDeEmpresasPorTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                SELECT 
                    dts.id_tipo_servicio,
                    dts.denominacion AS tipo_servicio, 
                    COUNT(te.id_empresa) AS cantidad_empresas
                FROM t_empresa_servicio tes
                JOIN d_tipo_servicio dts ON tes.id_tipo_servicio = dts.id_tipo_servicio
                JOIN t_empresa te ON tes.id_empresa = te.id_empresa
                GROUP BY dts.id_tipo_servicio, dts.denominacion
                ORDER BY id_tipo_servicio ASC;`;
                const tuc = yield database_1.default.query(consulta);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen cantidades de las empresas por tipo de servicio' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener  cantidades de las empresas por tipo de servivio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadDeEmpresasPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                    SELECT
                        origen_ruta,
                        destino_ruta,
                        COUNT(nombre_empresa) AS cantidad_empresas
                    FROM (
                        SELECT DISTINCT
                            tdr.origen AS origen_ruta,
                            tdr.destino AS destino_ruta,
                            e.razon_social AS nombre_empresa
                        FROM 
                            t_detalle_ruta_itinerario AS tdr
                        JOIN 
                            t_empresa_servicio AS te ON tdr.id_empresa_servicio = te.id_empresa_servicio
                        JOIN 
                            t_empresa AS e ON te.id_empresa = e.id_empresa
                        WHERE 
                            (tdr.origen IS NOT NULL AND tdr.origen <> '') 
                            AND (tdr.destino IS NOT NULL AND tdr.destino <> '')
                    ) AS subconsulta
                    GROUP BY origen_ruta, destino_ruta;`;
                const tuc = yield database_1.default.query(consulta);
                if (tuc && tuc['rows'].length > 0) {
                    res.json(tuc['rows']);
                }
                else {
                    res.status(404).json({ text: 'no existen cantidades de las empresas por ruta' });
                }
            }
            catch (error) {
                console.error('Error al obtener  cantidades de las empresas por  ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadEstadoEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                    SELECT
                        COUNT(CASE WHEN estado = 'Activo' THEN 1 ELSE NULL END) AS activo,
                        COUNT(CASE WHEN estado = 'Alerta' THEN 1 ELSE NULL END) AS alerta,
                        COUNT(CASE WHEN estado = 'Inactivo' THEN 1 ELSE NULL END) AS inactivo
                    FROM (
                        SELECT tes.id_empresa_servicio, te.*, CONCAT(pe.nombres, ' ', pe.ap_paterno, ' ', pe.ap_materno) AS representante_legal, tes.expediente, tes.fecha_inicial, tes.fecha_final,
                            CASE
                                WHEN CURRENT_DATE < tes.fecha_final - INTERVAL '6 months' THEN 'Activo'
                                WHEN CURRENT_DATE >= tes.fecha_final - INTERVAL '6 months' AND CURRENT_DATE <= tes.fecha_final THEN 'Alerta'
                                WHEN CURRENT_DATE > tes.fecha_final THEN 'Inactivo'
                            END AS estado
                        FROM t_empresa_servicio AS tes
                        JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                        JOIN t_persona AS pe ON te.id_representante_legal = pe.id_persona
                    ) AS empresas_estado;`;
                const EstadoEmpresaServicio = yield database_1.default.query(consulta);
                if (EstadoEmpresaServicio && EstadoEmpresaServicio['rows'].length > 0) {
                    res.json(EstadoEmpresaServicio['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'los detalles de la empresa no existe' });
                }
            }
            catch (error) {
                console.error('Error al obtener los detalles de la empresa:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadDeInfraestructura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                        SELECT id_tipo_infraestructura,tipo_infraestructura, cantidad_infraestructuras
                        FROM (
                            SELECT
								ti.id_tipo_infraestructura,
                                ti.denominacion AS tipo_infraestructura,
                                COUNT(inf.id_infraestructura) AS cantidad_infraestructuras
                            FROM 
                                d_tipo_infraestructura AS ti
                            LEFT JOIN 
                                t_infraestructura AS inf ON ti.id_tipo_infraestructura = inf.id_tipo_infraestructura
                            GROUP BY tipo_infraestructura, ti.id_tipo_infraestructura
                        ) AS result
                        ORDER BY id_tipo_infraestructura`;
                const emrpesaInfraestructura = yield database_1.default.query(consulta);
                res.json(emrpesaInfraestructura['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener las cantidades de infraestructura:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadDeConductores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                    SELECT COUNT(id_conductor) AS cantidad_conductores
                    FROM t_conductor
                        `;
                const conductores = yield database_1.default.query(consulta);
                res.json(conductores['rows'][0]);
            }
            catch (error) {
                console.error('Error fatal al obtener las cantidades de conductores:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarReporteEmpresasServicios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //devuelve todas las empresas que estan registradas como servicio, juntamente con su estado de acuerdo a la fecha inicial de apertura
                // --empresas activas, inactivas y encondicion de alerta (empresa, id_tipo_servicio, tipo_servicio, fecha_activacion, fecha_vencimiento)
                const consulta = `
                            SELECT
                               es.expediente, 
								es.id_empresa_servicio,
                                e.razon_social,
                                e.ruc,
								 e.departamento,
								 e.distrito,
								 e.provincia,
								 p.nombres,
								 p.ap_paterno,
								 p.ap_materno,
								 p.documento,
								 p.telefono,
                                es.id_tipo_servicio AS id_tipo_servicio, 
                                ts.denominacion AS tipo_servicio,
                                es.fecha_inicial,
                                es.fecha_final,
                                
                                CASE
                                    WHEN CURRENT_DATE < es.fecha_final - INTERVAL '6 months' THEN 'Activo'
                                    WHEN CURRENT_DATE >= es.fecha_final - INTERVAL '6 months' AND CURRENT_DATE <= es.fecha_final THEN 'Alerta'
                                    WHEN CURRENT_DATE > es.fecha_final THEN 'Inactivo'
                                END AS estado,
                                CASE
                                    WHEN CURRENT_DATE < es.fecha_final THEN 
                                        ROUND(CAST(EXTRACT(EPOCH FROM AGE(CURRENT_DATE, es.fecha_inicial)) / 
                                            EXTRACT(EPOCH FROM AGE(es.fecha_final, es.fecha_inicial)) * 100 AS numeric), 2)
                                    ELSE 100.00
                                END AS porcentaje
                            FROM
                                t_empresa_servicio es
                            JOIN t_empresa e ON es.id_empresa = e.id_empresa
                            JOIN d_tipo_servicio ts ON es.id_tipo_servicio = ts.id_tipo_servicio
							JOIN t_persona p ON e.id_representante_legal = p.id_persona
                            ORDER BY
                                es.expediente;
                    `;
                const empresaServicios = yield database_1.default.query(consulta);
                res.status(200).json(empresaServicios['rows']);
            }
            catch (error) {
                console.error('Error faltal al obtener empresas por servicio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarReporteTotalVehiculos(req, res) {
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
    listarVehiculosPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = ` 
                            SELECT DISTINCT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                tv.placa AS placa_vehiculo,
                                tv.modalidad AS modalidad_vehiculo,
                                te.razon_social AS nombre_empresa
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_vehiculo AS tv ON tdr.id_detalle_ruta_itinerario = tv.id_detalle_ruta_itinerario
                            JOIN 
                                t_empresa_servicio AS tes ON tv.id_empresa_servicio = tes.id_empresa_servicio
                            JOIN 
                                t_empresa AS te ON tes.id_empresa = te.id_empresa;`;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarVehiculosPorRutaOrigen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen } = req.params;
                const consulta = ` 
                            SELECT DISTINCT 
                                dr.origen AS origen_ruta,
                                dr.destino AS destino_ruta,
                                v.placa AS placa_vehiculo,
                                v.modalidad AS modalidad_vehiculo,
                                te.razon_social AS nombre_empresa
                            FROM t_detalle_ruta_itinerario AS dr
                            INNER JOIN t_vehiculo AS v ON dr.id_detalle_ruta_itinerario = v.id_detalle_ruta_itinerario
                            INNER JOIN t_empresa_servicio AS tes ON v.id_empresa_servicio = tes.id_empresa_servicio
                            INNER JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                            WHERE dr.origen = $1 
                             `;
                const vehiculos = yield database_1.default.query(consulta, [origen]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por origen de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarVehiculosPorDestinoRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { destino } = req.params;
                const consulta = ` 
                                SELECT DISTINCT 
                                    dr.origen AS origen_ruta,
                                    dr.destino AS destino_ruta,
                                    v.placa AS placa_vehiculo,
                                    v.modalidad AS modalidad_vehiculo,
                                    te.razon_social AS nombre_empresa
                                FROM t_detalle_ruta_itinerario AS dr
                                INNER JOIN t_vehiculo AS v ON dr.id_detalle_ruta_itinerario = v.id_detalle_ruta_itinerario
                                INNER JOIN t_empresa_servicio AS tes ON v.id_empresa_servicio = tes.id_empresa_servicio
                                INNER JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                                WHERE  dr.destino = $1;
                             `;
                const vehiculos = yield database_1.default.query(consulta, [destino]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por destino de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    obtenerVehiculosPorRutaOrigenDestino(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { origen, destino } = req.params;
                const consulta = ` 
                                    SELECT DISTINCT 
                                        dr.origen AS origen_ruta,
                                        dr.destino AS destino_ruta,
                                        v.placa AS placa_vehiculo,
                                        v.modalidad AS modalidad_vehiculo,
                                        te.razon_social AS nombre_empresa
                                    FROM t_detalle_ruta_itinerario AS dr
                                    INNER JOIN t_vehiculo AS v ON dr.id_detalle_ruta_itinerario = v.id_detalle_ruta_itinerario
                                    INNER JOIN t_empresa_servicio AS tes ON v.id_empresa_servicio = tes.id_empresa_servicio
                                    INNER JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                                    WHERE dr.origen = $1 AND dr.destino = $2
                                    ORDER BY te.razon_social;
                             `;
                const vehiculos = yield database_1.default.query(consulta, [origen, destino]);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener vehiculos por origen y destino de ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadVehiculosPorTipoServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                            SELECT
                                ts.id_tipo_servicio,
                                ts.denominacion AS tipo_servicio,
                                COUNT(tv.id_vehiculo) AS cantidad_vehiculos
                            FROM 
                                d_tipo_servicio AS ts
                            LEFT JOIN 
                                t_empresa_servicio AS tes ON ts.id_tipo_servicio = tes.id_tipo_servicio
                            LEFT JOIN 
                                t_vehiculo AS tv ON tes.id_empresa_servicio = tv.id_empresa_servicio
                            GROUP BY tipo_servicio, ts.id_tipo_servicio
                            ORDER BY ts.id_tipo_servicio
                            `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener cantidades de vehiculos por tipo de sercio:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    CantidadVehiculosPorRuta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = ` 
                            SELECT
                                tdr.origen AS origen_ruta,
                                tdr.destino AS destino_ruta,
                                COUNT(DISTINCT tv.placa) AS cantidad_vehiculos
                            FROM 
                                t_detalle_ruta_itinerario AS tdr
                            JOIN 
                                t_vehiculo AS tv ON tdr.id_detalle_ruta_itinerario = tv.id_detalle_ruta_itinerario
                            JOIN 
                                t_empresa_servicio AS tes ON tv.id_empresa_servicio = tes.id_empresa_servicio
                            JOIN 
                                t_empresa AS te ON tes.id_empresa = te.id_empresa
                            GROUP BY
                                tdr.origen, tdr.destino;
                             `;
                const vehiculos = yield database_1.default.query(consulta);
                res.json(vehiculos['rows']);
            }
            catch (error) {
                console.error('Error al obtener cantidad de vehiculos por ruta:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const reporteController = new ReporteController();
exports.default = reporteController;
