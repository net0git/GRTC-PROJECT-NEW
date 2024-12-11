import { Router } from "express";
import itinerarioController from "../controllers/itinerarioController";

class ItinerariRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
    
        this.router.get('/api/itinerario/lista/empresa/:id_empresa_servicio',itinerarioController.listarItinearioPorEmpresa)
        this.router.post('/api/itinerario',itinerarioController.CrearItinerario)
        this.router.put('/api/itinerario/:id',itinerarioController.ModificarItinerario) 
        this.router.delete('/api/itinerario/:id',itinerarioController.EliminarItinerario)
        
    }
}

const itinerariRoutes = new ItinerariRoutes
export default itinerariRoutes.router;