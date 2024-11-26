import { Router } from "express";
import historialVehicularController from "../controllers/historialVehicularController";


class HistorialVehicularRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
  config():void{
        this.router.post('/api/historialvehicular',historialVehicularController.CrearHistorialVehicular);
        this.router.get('/api/historialvehicular/:id_empresa_servicio',historialVehicularController.ObtenerHistorialVehicularPorEmpresa);
        this.router.get('/api/historialvehicular/:placa',historialVehicularController.ObtenerHistorialVehicularPorPlaca);
    }
}

const historialVehicularRoutes = new HistorialVehicularRoutes
export default historialVehicularRoutes.router;