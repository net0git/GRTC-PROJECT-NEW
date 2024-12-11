import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class ItinerarioController{
    
    public async CrearItinerario(req: Request, res: Response): Promise<void> {
        try {
            const { origen, destino,itinerario, frecuencia, id_empresa_servicio } = req.body;
            const consulta = `
                INSERT INTO t_detalle_ruta_itinerario(
                       origen, destino,itinerario, frecuencia, id_empresa_servicio)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id_detalle_ruta_itinerario; -- Devuelve el ID de la empresa 
                    `;
            
            const valores = [origen, destino,itinerario, frecuencia, id_empresa_servicio];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar itinerario:', error);
                    res.status(500).json({ error: 'Error interno del servidor' });
                }else{
                    const idItinerario = resultado.rows[0]['id_detalle_ruta_itinerario']; // ID se encuentra en la primera fila
                 
                    res.json({id_detalle_ruta_itinerario:idItinerario,text: 'El itinerario se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error al crear itinerario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }
    

    public async listarItinearioPorEmpresa(req:Request, res:Response):Promise<any>{
        try {
            const { id_empresa_servicio } = req.params;
            const consulta= 'select * from t_detalle_ruta_itinerario where id_empresa_servicio = $1';
            const itinerarios = await db.query(consulta,[id_empresa_servicio]);

            if (itinerarios && itinerarios['rows'].length > 0) {
                res.json(itinerarios['rows']);
            } else {
                res.status(404).json({ text: 'la lista no existe' });
            }

        } catch (error) {
            console.error('Error al obtener lista de itinerario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

    public async ModificarItinerario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { origen, destino,itinerario, frecuencia, id_empresa_servicio } = req.body;

            const consulta = `
                UPDATE t_detalle_ruta_itinerario 
                SET origen=$1, destino=$2, itinerario=$3, frecuencia=$4, id_empresa_servicio=$5
                WHERE id_detalle_ruta_itinerario=$6
                `;
            const valores = [ origen, destino,itinerario, frecuencia, id_empresa_servicio, id];

            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al modificar irinerario:', error);
                } else {
                    console.log('itinerario modificado correctamente');
                    res.json({ text: 'El itinerario se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar itinerario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    public async EliminarItinerario(req: Request, res: Response): Promise<void> {
        try {
            const {id} =req.params;
            
            const consulta='DELETE FROM t_detalle_ruta_itinerario WHERE id_detalle_ruta_itinerario  =$1';

            db.query(consulta, [id] ,(error, resultado) => {
                if (error) {
                    console.error('Error al eliminar itinerario :', error);
                    res.json({ text: 'error' });
                } else {
                    console.log('itinerario eliminado correctamente');
                    res.json({ text: 'el itinerario se elimino correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al eliminar itinerario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
const itinerarioController = new ItinerarioController();
export default itinerarioController;