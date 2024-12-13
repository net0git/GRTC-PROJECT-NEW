import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts


class EmpresaServicioController{
    public async CrearEmpresaServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final } = req.body;
        
            const consulta = `
                INSERT INTO t_empresa_servicio(id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final )
                    VALUES ($1, $2, $3, $4, $5)
                RETURNING id_empresa_servicio; -- Devuelve el ID de la empresa`;
            
            const valores = [ id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final];
           
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar empresa:', error);
                }else{
                    const idEmpresa = resultado.rows[0]['id_empresa_servicio']; // ID se encuentra en la primera fila
                    res.status(200).json({id_empresa_servicio:idEmpresa,text: 'La emrpesa_servicio se creó correctamente' });
                }
            });
            
         } catch (error) {
            console.error('Error fatal al crear la empresa por sevicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }
    public async ObtenerEmpresaServicio(req:Request, res:Response):Promise<any>{
        try {
            //devuelve todas las empresas que estan registradas como servicio, juntamente con su estado de acuerdo a la fecha inicial de apertura
            // --empresas activas, inactivas y encondicion de alerta (empresa, id_tipo_servicio, tipo_servicio, fecha_activacion, fecha_vencimiento)
            const { id_empresa_servicio } = req.params;
            const consulta = `
                            select * 
                            from t_empresa_servicio 
                            where id_empresa_servicio=$1 
                    `;
            const empresaServicios=await db.query(consulta,[id_empresa_servicio])
            res.json(empresaServicios['rows'][0]);
        } catch (error) {
            console.error('Error al obtener empresa por servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async listarEmpresasServicios(req:Request, res:Response):Promise<any>{
        try {
            const consulta = `
                            SELECT
                                es.id_empresa_servicio,
                                e.razon_social AS empresa,
                                e.ruc,
                                es.id_tipo_servicio AS id_tipo_servicio, 
                                ts.denominacion AS tipo_servicio,
                                es.fecha_inicial,
                                es.fecha_final,
                                es.expediente,
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
                            ORDER BY
                                es.expediente;
                    `;
            const empresaServicios=await db.query(consulta)
            res.status(200).json(empresaServicios['rows']);
        } catch (error) {
            console.error('Error faltal al obtener empresas por servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ObtenerDetalleEmpresaServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id_empresa_servicio } = req.params;
            const consulta = `
                            SELECT 
                                tes.id_empresa_servicio,
                                ts.denominacion as tipo_servicio ,
                                ts.id_tipo_servicio,
                                te.* ,CONCAT(pe.nombres,' ',pe.ap_paterno,' ',pe.ap_materno) AS representante_legal, 
                                tes.expediente, tes.fecha_inicial, 
                                tes.fecha_final,
                                CASE
                                    WHEN CURRENT_DATE < tes.fecha_final - INTERVAL '6 months' THEN 'Activo'
                                    WHEN CURRENT_DATE >= tes.fecha_final - INTERVAL '6 months' AND CURRENT_DATE <= tes.fecha_final THEN 'Alerta'
                                    WHEN CURRENT_DATE > tes.fecha_final THEN 'Inactivo'
                                END AS estado,
                                CASE
                                    WHEN CURRENT_DATE < tes.fecha_final THEN 
                                        ROUND(CAST(EXTRACT(EPOCH FROM AGE(CURRENT_DATE, tes.fecha_inicial)) / 
                                            EXTRACT(EPOCH FROM AGE(tes.fecha_final, tes.fecha_inicial)) * 100 AS numeric), 2)
                                    ELSE 100.00
                                END AS porcentaje
                            FROM t_empresa_servicio AS tes
                            JOIN t_empresa AS te ON tes.id_empresa = te.id_empresa
                            JOIN d_tipo_servicio AS ts ON tes.id_tipo_servicio=ts.id_tipo_servicio
                            JOIN t_persona AS pe ON te.id_representante_legal=pe.id_persona
                            WHERE tes.id_empresa_servicio =$1;
            `;
            const empresaServicio = await db.query(consulta,[id_empresa_servicio]);

            if (empresaServicio && empresaServicio['rows'].length > 0) {
                res.json(empresaServicio['rows'][0]);
            } else {
                res.status(404).json({ text: 'los detalles de la empresa no existe' });
            }

        } catch (error) {
            console.error('Error al obtener los detalles de la empresa:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ModificarEmpresaServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id_empresa_servicio } = req.params;
            const { id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final } = req.body;

            const consulta = `
                UPDATE t_empresa_servicio 
                    SET  id_tipo_servicio=$1, id_empresa=$2, fecha_inicial=$3, expediente=$4, fecha_final=$5
                WHERE id_empresa_servicio=$6
                `;
            const valores = [ id_tipo_servicio, id_empresa, fecha_inicial, expediente, fecha_final, id_empresa_servicio];

            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al modificar empresa por sevicio:', error);
                } else {
                    console.log('empresa por servicio se  modificado correctamente');
                    res.status(200).json({ text: 'la empresa por servicio se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error fatal al modificar la empresa por servicio:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async BuscarEmpresaPorRuc_TipoServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id_tipo_servicio, empresa_ruc } = req.params;
            const consulta = `
                    SELECT *
                    FROM t_empresa_servicio
                    WHERE id_tipo_servicio = $1
                    AND id_empresa IN (
                        SELECT id_empresa
                        FROM t_empresa
                        WHERE ruc = $2);`;
            const empresa_servicio = await db.query(consulta,[id_tipo_servicio, empresa_ruc]);
            
            if (empresa_servicio && empresa_servicio['rows'].length > 0) {
                res.json(empresa_servicio['rows']);
            } else {
                res.status(404).json({ text: 'la empresa por tipo de servicio y ruc no existe ' });
            }

        } catch (error) {
            console.error('Error al obtener empresa por servicio y ruc:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerEmpresaByPlacaVehiculo(req: Request, res: Response): Promise<void> {
        try {
            const { placa } = req.params;
            const consulta = `
                        SELECT
                            e.razon_social
                            
                        FROM
                            t_vehiculo v 
                        JOIN
                            t_empresa_servicio es ON v.id_empresa_servicio = es.id_empresa_servicio
                        JOIN
                            t_empresa e ON es.id_empresa=e.id_empresa
                        
                        WHERE
                            v.placa=$1
                    `;
            const tuc = await db.query(consulta,[placa]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text:'la empresa buscada por placa no existe'});
            }

        } catch (error) {
            console.error('Error al obtener empresa:', error);
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    }

}

const empresaServicioController = new EmpresaServicioController();
export default empresaServicioController;