import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class ResoucionController {
    public async CrearResolucion(req: Request, res: Response): Promise<void> {
        try {
            const { nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion } = req.body;

            const consulta = `
                INSERT INTO d_resolucion(
                        nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING id_resolucion; -- Devuelve el ID de la resolucion insertada
                
            `;

            const valores = [nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar resolución:', error);
                    if ((error as any).code === '23505') {
                        res.status(409).json({ text: 'Ya existe una resolución con ese nombre' });
                    } else {
                        res.status(500).json({ error: 'Error al insertar la resolución' });
                    }
                } else {
                    const idResolucion = resultado.rows[0]['id_resolucion']; // ID se encuentra en la primera fila
                    console.log('datos de certificado en BD:', idResolucion);
                    res.json({ id_resolucion: idResolucion, text: 'La resolucion se creó correctamente' });
                }
            });

        } catch (error) {
            console.error('Error al crear resolucion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearResolucionEmpresaServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id_empresa_servicio, id_resolucion } = req.body;
            const consulta = `
                INSERT INTO t_empresa_servicio_resoluciones(
                    id_empresa_servicio,id_resolucion)
                VALUES ($1, $2);`;
            const valores = [id_empresa_servicio, id_resolucion];

            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al insertar resolucione a empresa por servicio:', error);
                } else {
                    console.log('resolucion insertado correctamente');
                    res.json({ text: 'La resolucion se asocio correctamente' });
                }
            });
            

        } catch (error) {
            console.error('Error al crear resolucion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearResolucionInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { id_infraestructura, id_resolucion } = req.body;
            const consulta = `
                INSERT INTO t_infraestructura_resoluciones(
                    id_infraestructura,id_resolucion)
                    VALUES ($1, $2);
            `;

            const valores = [id_infraestructura, id_resolucion];

            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al insertar resolucion a la infraestructura:', error);
                } else {
                    console.log('resolucion insertado correctamente');
                    res.json({ text: 'La resolucion se inserto correctamente' });
                }
            });

        } catch (error) {
            console.error('Error al crear resolucion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerResolucionPorNroAnio(req: Request, res: Response): Promise<void> {
        try {
            const { nro_resolucion, anio_resolucion } = req.params;
            const consulta = `
                            SELECT 
                                r.id_resolucion, 
                                r.nro_resolucion, 
                                r.anio_resolucion, 
                                r.fecha_resolucion, 
                                r.tomo_resolucion, 
                                r.nombre_resolucion, 
                                r.documento, 
                                r.descripcion,
                                es.id_empresa_servicio AS empresa_cod_id,
                                esv.expediente, 
                                e.razon_social AS nombre_empresa,
                                'e' AS tipo -- Empresa
                            FROM d_resolucion AS r
                            INNER JOIN t_empresa_servicio_resoluciones AS es ON r.id_resolucion = es.id_resolucion
                            INNER JOIN t_empresa_servicio AS esv ON es.id_empresa_servicio = esv.id_empresa_servicio
                            INNER JOIN t_empresa AS e ON esv.id_empresa = e.id_empresa
                            WHERE r.nro_resolucion = $1 AND r.anio_resolucion = $2

                            UNION

                            -- Resoluciones de t_infraestructura_resoluciones
                            SELECT 
                                r.id_resolucion, 
                                r.nro_resolucion, 
                                r.anio_resolucion, 
                                r.fecha_resolucion, 
                                r.tomo_resolucion, 
                                r.nombre_resolucion, 
                                r.documento, 
                                r.descripcion,
                                ir.id_infraestructura AS empresa_cod_id,
                                e.expediente, 
                                e.nombre_infraestructura AS nombre_empresa,
                                'i' AS tipo -- Infraestructura
                            FROM d_resolucion AS r
                            INNER JOIN t_infraestructura_resoluciones AS ir ON r.id_resolucion = ir.id_resolucion
                            INNER JOIN t_infraestructura AS e ON ir.id_infraestructura = e.id_infraestructura
                            WHERE r.nro_resolucion = $1 AND r.anio_resolucion = $2;
                
            `;
            const resolucion = await db.query(consulta, [nro_resolucion, anio_resolucion]);

            if (resolucion && resolucion['rows'].length > 0) {
                res.json(resolucion['rows'][0]);
            } else {
                res.status(404).json({ text: 'La resolucion no existe' });
            }

        } catch (error) {
            console.error('Error al obtener resolucion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerResolucionesDeEmpresaServicio(req: Request, res: Response): Promise<void> {
        try {
            const { id_empresa_servicio } = req.params;
            const consulta = `
                SELECT 
                    r.id_resolucion,
                    r.anio_resolucion,
                    r.nro_resolucion,
                    r.fecha_resolucion,
                    r.tomo_resolucion,
                    r.nombre_resolucion,
                    r.descripcion
                FROM d_resolucion r
                JOIN t_empresa_servicio_resoluciones ir ON r.id_resolucion = ir.id_resolucion
                WHERE ir.id_empresa_servicio =$1
                ORDER BY r.fecha_resolucion `;
            const tuc = await db.query(consulta, [id_empresa_servicio]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text: 'las resoluciones correspondientes a la empresa no existen' });
            }

        } catch (error) {
            console.error('Error al obtener resoluciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerResolucionById(req: Request, res: Response): Promise<void> {
        try {
            const { id_resolucion } = req.params;
            const consulta = `
                    SELECT 
                        *
                    FROM d_resolucion 
                    WHERE id_resolucion =$1 `;
            const resolucion = await db.query(consulta, [id_resolucion]);

            if (resolucion && resolucion['rows'].length > 0) {
                res.json(resolucion['rows'][0]);
            } else {
                res.status(404).json({ text: 'las resoluciones correspondientes a la empresa no existen' });
            }

        } catch (error) {
            console.error('Error al obtener resoluciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async VerificarResolucionByNombre(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_resolucion } = req.params;
            const consulta = `
                SELECT 
                    *
                FROM d_resolucion 
                WHERE nombre_resolucion = $1
            `;
            const resolucion = await db.query(consulta, [nombre_resolucion]);
    
            if (resolucion && resolucion['rows'].length > 0) {
                res.json({ existe: true });
            } else {
                res.json({ existe: false });
            }
    
        } catch (error) {
            console.error('Error al obtener resoluciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    

    public async ObtnerResolucionesDeInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { id_infraestructura } = req.params;
            const consulta = `
                    SELECT r.*
                    FROM d_resolucion r
                    JOIN t_infraestructura_resoluciones ir ON r.id_resolucion = ir.id_resolucion
                    WHERE ir.id_infraestructura =$1
                    ORDER BY r.fecha_resolucion`;
            const tuc = await db.query(consulta, [id_infraestructura]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text: 'las resoluciones correspondientes a la infraestrucutra no existen' });
            }

        } catch (error) {
            console.error('Error al obtener resoluciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ModificarResolucion(req: Request, res: Response): Promise<void> {
        try {
            const { id_resolucion } = req.params;
            const { nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion } = req.body;

            const consulta = `
                UPDATE public.d_resolucion 
                    SET nro_resolucion= $1, anio_resolucion= $2, fecha_resolucion= $3, nombre_resolucion= $4, tomo_resolucion= $5, documento= $6, descripcion=$7
                WHERE id_resolucion=$8
                `;
            const valores = [nro_resolucion, anio_resolucion, fecha_resolucion, nombre_resolucion, tomo_resolucion, documento, descripcion, id_resolucion];

            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al modificar resolucion:', error);
            
                    if ((error as any).code === '23505') {
                        res.status(409).json({ text: 'Ya existe una resolución con ese nombre' });
                    } else {
                        res.status(500).json({ text: 'Error al modificar resolución' });
                    }
                } else {
                    console.log('Resolución modificada correctamente');
                    res.status(200).json({ text: 'La resolución se modificó correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar resolucion:', error);
            res.status(500).json({ text: 'Error interno del servidor' });
        }
    }

}
const resolucionController = new ResoucionController();
export default resolucionController;