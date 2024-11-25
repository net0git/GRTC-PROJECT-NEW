import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class CertificadoController {
    public async CrearCertificado(req: Request, res: Response): Promise<void> {
        try {
            const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;

            const consulta = `
                INSERT INTO d_certificado(
                    nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento)
                    VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id_certificado; -- Devuelve el ID del certificado insertado`;

            const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar certificado:', error);
                } else {
                    const idCertificado = resultado.rows[0]['id_certificado']; // ID se encuentra en la primera fila
                    console.log('datos de certificado en BD:', idCertificado);
                    res.status(200).json({ id_certificado: idCertificado, text: 'La certificado se creó correctamente' });
                }
            });

        } catch (error) {
            console.error('Error fatal al crear certificado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ModificarCertificado(req: Request, res: Response): Promise<void> {
        try {
            const { id_certificado } = req.params;
            const { nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento } = req.body;

            const consulta = `
                UPDATE d_certificado 
                    SET nro_certificado= $1, anio_certificado= $2, fecha_certificado= $3, nombre_certificado= $4, tomo_certificado= $5, documento=$6
                WHERE id_certificado=$7`;
            const valores = [nro_certificado, anio_certificado, fecha_certificado, nombre_certificado, tomo_certificado, documento, id_certificado];

            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al modificar certificado:', error);
                } else {
                    console.log('certificado modificado correctamente');
                    res.status(200).json({ text: 'El certificado se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error fatal al modificar certificado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtnerCertificadosDeInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { id_infraestructura } = req.params;
            const consulta = `
                    SELECT ce.*
                        FROM d_certificado ce
                        JOIN t_infraestructura_certificados ir ON ce.id_certificado = ir.id_certificado
                    WHERE ir.id_infraestructura =$1
                    ORDER BY ce.fecha_certificado`;
            const tuc = await db.query(consulta, [id_infraestructura]);

            if (tuc && tuc['rows'].length > 0) {
                res.json(tuc['rows']);
            } else {
                res.status(404).json({ text: 'los certificados correspondientes a la infraestrucutra no existen' });
            }

        } catch (error) {
            console.error('Error fatal al obtener certificado:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async AsociarCertificadoInfraestructura(req: Request, res: Response): Promise<void> {
        try {
            const { id_infraestructura, id_certificado } = req.body;
            const consulta = `
                INSERT INTO t_infraestructura_certificados(
                    id_infraestructura,id_certificado)
                VALUES ($1, $2);`;

            const valores = [id_infraestructura, id_certificado];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar certificado a la infraestructura:', error);
                } else {
                    console.log('certificado insertado correctamente');
                    res.json({ text: 'El certificado asociado a la infraestructura correctamente' });
                }
            });

        } catch (error) {
            console.error('Error fatal al asoiar certificado a infraestructura:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const certificadoController = new CertificadoController();
export default certificadoController;