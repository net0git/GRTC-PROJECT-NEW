import { Router } from "express";
import usuarioController from "../controllers/usuarioController";


class UsuariosRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
  
         this.router.get('/api/usuario',usuarioController.listarUsuarios)
         this.router.get('/api/usuario/detalle',usuarioController.listarUsuariosDetalle)
         this.router.get('/api/usuario/:id_usuario',usuarioController.ObtenerUsuario)
         this.router.get('/api/usuario/detalle/:nombre_usuario',usuarioController.ObtenerUsuarioPorNombre)
         this.router.post('/api/usuario/crear',usuarioController.CrearUsuario)
         this.router.post('/api/usuario/login',usuarioController.ValidarLogin)
         this.router.put('/api/usuario/modificar/datos/:id_usuario',usuarioController.ModificarUsuarioDatos)   
         this.router.put('/api/usuario/modificar/password/:id_usuario',usuarioController.ModificarUsuarioPassword) 
          
    }
}

const usuariosRoutes = new UsuariosRoutes
export default usuariosRoutes.router;