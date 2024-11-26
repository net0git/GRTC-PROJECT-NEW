import { Router } from "express";
import modeloController from '../controllers/modeloController'


class ModeloRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/modelo',modeloController.CrearModelo)
        this.router.get('/api/modelo/grupo/:id_marca',modeloController.obtenerModelosByMarca)
        this.router.put('/api/modelo/:id_modelo',modeloController.ModificarModelo)             
    }

}

const modeloRoutes = new ModeloRoutes
export default modeloRoutes.router;