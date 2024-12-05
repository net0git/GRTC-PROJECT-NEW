import { Request, Response } from 'express';
import db from '../database/database'; // Ruta al archivo db.ts

class ModeloController{
    public async CrearModelo(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_modelo, id_marca } = req.body;

            const consulta = `
                    INSERT INTO t_modelo(
                        nombre_modelo, id_marca)
                    VALUES ($1, $2);`;
            
            const valores = [nombre_modelo,id_marca];
            
            db.query(consulta, valores, (error, resultado) => {
                if (error) {
                    console.error('Error al insertar modelo:', error);
                } else {
                    console.log('modelo insertado correctamente');
                    res.json({ text: 'El modelo se creó correctamente' });
                }
            });

         } catch (error) {
            console.error('Error fatal al crear modelo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
         }
    }

    public async obtenerModelosByMarca(req:Request, res:Response):Promise<any>{
        try {
            const { id_marca  } = req.params;
            const consulta = `
                    SELECT * FROM t_modelo 
                    WHERE 
                        id_marca=$1 `;

            const valores = [id_marca];
            
            const modelos = await db.query(consulta,valores);

            if (modelos && modelos['rows'].length > 0) {
                res.json(modelos['rows']);
            } else {
                res.status(404).json({ text: 'la lista de modelos no existe' });
            }

        } catch (error) {
            console.error('Error al obtener modelos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }    
    }

    public async ModificarModelo(req: Request, res: Response): Promise<void> {
        try {
            const { id_modelo } = req.params;
            const { nombre_modelo } = req.body;

            const consulta = `
                UPDATE t_modelo
                     SET nombre_modelo= $1
                WHERE id_modelo=$2
                `;
            const valores = [nombre_modelo, id_modelo];

            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error('Error al insertar modelo:', error);
                } else {
                    console.log('modelo modificado correctamente');
                    res.json({ text: 'el modelo se modifico correctamente' });
                }
            });
        } catch (error) {
            console.error('Error al modificar modelo:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
const modeloController = new ModeloController();
export default modeloController;