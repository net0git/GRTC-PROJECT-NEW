import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class ReporteController{
    public async listarEmpresasByRuta(req: Request, res: Response): Promise<void>{
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
            const tuc = await db.query(consulta);
    
            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'no existen empresas por ruta'});
            }
    
        } catch (error) {
            console.error('Error al obtener empresas por ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    public async listarEmpresasPorRutaOrigen(req: Request, res: Response): Promise<void>{
        try {
            const {origen } = req.params;
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
            const tuc = await db.query(consulta,[origen]);
    
            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'no existen empresas por origen ruta'});
            }
    
        } catch (error) {
            console.error('Error al obtener empresas por origen ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    public async listarEmpresasPorRutaDestino(req: Request, res: Response): Promise<void>{
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
            const tuc = await db.query(consulta,[destino]);
    
            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'no existen empresas por destino ruta'});
            }
    
        } catch (error) {
            console.error('Error al obtener empresas por ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    public async ObtenerEmpresasPorRutaOrigenDestino(req: Request, res: Response): Promise<void>{
        try {
            const { origen,destino } = req.params;
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
            const tuc = await db.query(consulta,[origen,destino]);
    
            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'no existen empresas por origen y destino ruta'});
            }
    
        } catch (error) {
            console.error('Error al obtener empresas por ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    public async CantidadDeEmpresasPorTipoServicio(req: Request, res: Response): Promise<void>{
        try {
            const consulta = `
                SELECT tipo_servicio, cantidad_empresas
                FROM (
                    SELECT
                        ts.denominacion AS tipo_servicio,
                        COUNT(te.id_empresa) AS cantidad_empresas,
                        1 AS orden
                    FROM 
                        d_tipo_servicio AS ts
                    LEFT JOIN 
                        t_empresa_servicio AS te ON ts.id_tipo_servicio = te.id_tipo_servicio
                    GROUP BY tipo_servicio
                
                    UNION ALL
                
                    SELECT
                        'Total' AS tipo_servicio,
                        COUNT(te.id_empresa) AS cantidad_empresas,
                        2 AS orden
                    FROM 
                        t_empresa_servicio AS te
                ) AS result
                ORDER BY orden;`;
            const tuc = await db.query(consulta);
    
            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'no existen cantidades de las empresas por tipo de servicio'});
            }
    
        } catch (error) {
            console.error('Error fatal al obtener  cantidades de las empresas por tipo de servivio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
    public async CantidadDeEmpresasPorRuta(req: Request, res: Response): Promise<void>{
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
                            (tdr.origen IS NOT NULL AND tdr.origen <> '') AND (tdr.destino IS NOT NULL AND tdr.destino <> '')
                    ) AS subconsulta
                    GROUP BY origen_ruta, destino_ruta`;
            const tuc = await db.query(consulta);
    
            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'no existen cantidades de las empresas por ruta'});
            }
    
        } catch (error) {
            console.error('Error al obtener  cantidades de las empresas por  ruta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CantidadEstadoEmpresas(req: Request, res: Response): Promise<void> {
        try {
            const consulta = `
                    SELECT
                        COUNT(CASE WHEN estado = 'Activo' THEN 1 ELSE NULL END) AS empresas_activas,
                        COUNT(CASE WHEN estado = 'Alerta' THEN 1 ELSE NULL END) AS empresas_en_alerta,
                        COUNT(CASE WHEN estado = 'Inactivo' THEN 1 ELSE NULL END) AS empresas_de_baja
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
            const EstadoEmpresaServicio = await db.query(consulta);
    
            if (EstadoEmpresaServicio && EstadoEmpresaServicio['rows'].length > 0) {
                res.json(EstadoEmpresaServicio['rows']);
            } else {
                res.status(404).json({ text: 'los detalles de la empresa no existe' });
            }
    
        } catch (error) {
            console.error('Error al obtener los detalles de la empresa:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CantidadDeInfraestructura(req: Request, res: Response): Promise<any> {
        try {
            const consulta = `
                        SELECT tipo_infraestructura, cantidad_infraestructuras
                        FROM (
                            SELECT
                                ti.denominacion AS tipo_infraestructura,
                                COUNT(inf.id_infraestructura) AS cantidad_infraestructuras
                            FROM 
                                d_tipo_infraestructura AS ti
                            LEFT JOIN 
                                t_infraestructura AS inf ON ti.id_tipo_infraestructura = inf.id_tipo_infraestructura
                            GROUP BY tipo_infraestructura

                            UNION ALL

                            SELECT
                                'Total' AS tipo_infraestructura,
                                COUNT(*) AS cantidad_infraestructuras
                            FROM 
                                t_infraestructura AS inf
                        ) AS result
                        ORDER BY tipo_infraestructura;`;

            const emrpesaInfraestructura = await db.query(consulta)

            res.json(emrpesaInfraestructura['rows']);
        } catch (error) {
            console.error('Error fatal al obtener las cantidades de infraestructura:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

    }
}
const reporteController = new ReporteController();
export default reporteController;