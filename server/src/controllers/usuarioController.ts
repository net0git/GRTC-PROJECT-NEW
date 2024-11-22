import { Request, Response } from 'express';
import { encriptar, comparar } from "../encriptador/encriptador"
import db from '../database/database'; // Ruta al archivo db.ts

class UsuarioController {
    public async listarUsuarios(req: Request, res: Response): Promise<any> {
        try {
            const usuarios = await db.query('select * from t_usuario')
            res.json(usuarios['rows']);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async listarUsuariosDetalle(req: Request, res: Response): Promise<any> {
        try {
            const consulta = `
                    SELECT
                        t_usuario.id_usuario,
                        t_usuario.nombre_usuario,
                        t_usuario.rol,
                        t_usuario.estado,
                        t_persona.nombres,
                        t_persona.ap_paterno,
                        t_persona.ap_materno,
                        t_persona.tipo_doc,
                        t_persona.documento,
                        t_persona.telefono,
                        t_persona.correo
                    FROM
                        t_usuario
                    INNER JOIN
                        t_persona ON t_usuario.id_persona = t_persona.id_persona;
            `;
            const usuarios = await db.query(consulta)
            res.json(usuarios['rows']);
        } catch (error) {
            console.error('Error al obtener detalle de usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerUsuario(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const consulta = 'select * from t_usuario where id_usuario = $1';
            const usuario = await db.query(consulta, [id]);

            if (usuario && usuario['rows'].length > 0) {
                res.json(usuario['rows']);
            } else {
                res.status(404).json({ text: 'El usuario no existe' });
            }

        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ObtenerUsuarioPorNombre(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_usuario } = req.params;
            const consulta = 'select * from t_usuario where nombre_usuario = $1';
            const usuario = await db.query(consulta, [nombre_usuario]);

            if (usuario && usuario['rows'].length > 0) {
                res.status(200).json(usuario['rows']);
            } else {
                res.status(404).json({ text: 'El usuario no existe' });
            }

        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async CrearUsuario(req: Request, res: Response) {
        try {
            const { nombre_usuario, rol, password, id_persona, estado } = req.body;
            const passwordcifrado = await encriptar(password);
            const consulta = `
                    INSERT INTO t_usuario(
                        nombre_usuario,rol,password,id_persona, estado)
                    VALUES ($1, $2, $3, $4, $5);
                `;
            const valores = [nombre_usuario, rol, passwordcifrado, id_persona, estado];
            db.query(consulta, valores, (error) => {
                if (error) {
                    console.error(`Error al crear usuario ${nombre_usuario}:`, error);
                } else {
                    console.log(`usuario ${nombre_usuario} creado correctamente`);
                    res.json({ text: `El usuario se creó correctamente ${nombre_usuario}`});
                }
            });

        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    public async ValidarLogin(req: Request, res: Response) {

    }

    public async ModificarUsuarioDatos(req: Request, res: Response): Promise<void> {

    }

    public async ModificarUsuarioPassword(req: Request, res: Response): Promise<void> {

    }
}
const usuarioController = new UsuarioController();
export default usuarioController;