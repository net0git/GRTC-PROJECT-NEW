import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class HistorialVehicularController{
    public async CrearHistorialVehicular(req: Request, res: Response): Promise<void> {
        try {
           
            const {condicion, nombre_resolucion, placa, ruta, id_empresa_servicio, fecha_resolucion} = req.body;
            const create_at = new Date();
            const consulta = `
                        INSERT INTO r_empre_histo_vehiculo(
                            condicion, create_at, nombre_resolucion, placa, ruta, id_empresa_servicio, fecha_resolucion)
                        VALUES ($1, $2, $3, $4, $5, $6, $7);`;
            
            const valores = [condicion, create_at, nombre_resolucion, placa, ruta, id_empresa_servicio, fecha_resolucion];
            
            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al insertar historial vehicular:', error);
                } else {
                    console.log('historial vehicular insertado correctamente');
                    res.json({ text: 'El historila vehicular se creó correctamente' });
                }
            });

        } catch (error) {
            console.error('Error fatalal crear historial vehicular:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerHistorialVehicularPorEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { id_empresa_servicio } = req.params;
            const consulta = `
                        select * from  r_empre_histo_vehiculo where id_empresa_servicio=$1 ORDER BY placa, create_at
                `;
            const historialVehicular = await db.query(consulta,[id_empresa_servicio]);
            
            if (historialVehicular && historialVehicular['rows'].length > 0) {
                res.json(historialVehicular['rows']);
            } else {
                res.status(404).json({ text: 'El historial vehicular no existe' });
            }

        } catch (error) {
            console.error('Error fatal al obtener historial vehicular:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerHistorialVehicularPorPlaca(req: Request, res: Response): Promise<void> {
        try {
            const { placa } = req.params;
            const consulta = `
                        SELECT ehv.*,
                            es.id_empresa AS id_empresa_servicio,
                            e.razon_social AS nombre_empresa
                        FROM r_empre_histo_vehiculo ehv
                        INNER JOIN t_empresa_servicio es ON ehv.id_empresa_servicio = es.id_empresa_servicio
                        INNER JOIN t_empresa e ON es.id_empresa = e.id_empresa
                        WHERE ehv.placa=$1
                        ORDER BY ehv.create_at`;
            const vehiculo = await db.query(consulta,[placa]);

            if (vehiculo && vehiculo['rows'].length > 0) {
                res.json(vehiculo['rows']);
            } else {
                res.status(404).json({ text: 'El historial vehicular no existe' });
            }

        } catch (error) {
            console.error('Error al obtener historial vehicular:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    
}
const historialVehicularController = new HistorialVehicularController();
export default historialVehicularController;