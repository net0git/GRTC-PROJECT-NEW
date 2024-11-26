import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class RutaController{
    public async listarRutas(req:Request, res:Response):Promise<any>{
        try {
            const rutas=await db.query('select * from t_detalle_ruta_itinerario')
            res.status(200).json(rutas['rows']);
        } catch (error) {
            console.error('Error fatal al obtener rutas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        } 
    }

    public async listarRutasOrigen(req:Request, res:Response):Promise<any>{
        try {
            const consulta = `
                SELECT DISTINCT
                    tdr.origen AS origen_ruta
                FROM 
                    t_detalle_ruta_itinerario AS tdr
                WHERE 
                    (tdr.origen IS NOT NULL AND tdr.origen <> '')`;
            const rutas=await db.query(consulta)
            res.status(200).json(rutas['rows']);
        } catch (error) {
            console.error('Error fatal al obtener rutas origen:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }  
    }
    
    public async listarRutasDestino(req:Request, res:Response):Promise<any>{
        try {
            const consulta = `
                SELECT DISTINCT
                    tdr.destino AS destino_ruta
                FROM 
                    t_detalle_ruta_itinerario AS tdr
                WHERE 
                    (tdr.destino IS NOT NULL AND tdr.destino <> '');`;
            const rutas=await db.query(consulta)
            res.status(200).json(rutas['rows']);
        } catch (error) {
            console.error('Error al obtener rutas destino:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
        
    }

}
const rutaController = new RutaController();
export default rutaController;