import { Router } from "express";
import tucController from "../controllers/tucController";


class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/tuc',tucController.CrearTuc)
        this.router.get('/api/tuc/buscar/:nro_tuc',tucController.ObtenerTucPorNumero)
        this.router.get('/api/tuc/listar/:placa',tucController.listarTucPorPlaca)
        this.router.put('/api/tuc/:id',tucController.ModificarTuc)           
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;