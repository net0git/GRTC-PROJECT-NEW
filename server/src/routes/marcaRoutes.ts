import { Router } from "express";

import marcaController from "../controllers/marcaController";


class MarcasRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/marca',marcaController.CrearMarca)
        this.router.get('/api/marca',marcaController.listarMarcas)
        this.router.get('/api/marca/:id_marca',marcaController.ObtenerMarca)
        this.router.put('/api/marca/:id_marca',marcaController.ModificarMarca)
    
    }
}

const marcasRoutes = new MarcasRoutes
export default marcasRoutes.router;