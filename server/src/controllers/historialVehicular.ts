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
    
}
const historialVehicularController = new HistorialVehicularController();
export default historialVehicularController;