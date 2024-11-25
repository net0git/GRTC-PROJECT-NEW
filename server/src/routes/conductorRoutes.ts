import { Router } from "express";
import conductorController from '../controllers/conductorController'


class ConductorRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para las tuc - 
         this.router.get('/api/conductor/lista/:id_empresa_servicio',conductorController.listarConductoresByEmpresaServicio)
         this.router.get('/api/conductor',conductorController.listarTotalConductores)
         this.router.post('/api/conductor',conductorController.CrearConductor)
         this.router.put('/api/conductor/:id_conductor',conductorController.ModificarConductor)    
         this.router.delete('/api/conductor/:id_conductor',conductorController.EliminarConductor)
    }
}

const conductorRoutes = new ConductorRoutes
export default conductorRoutes.router;