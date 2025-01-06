import { Router } from "express";
import arrendamientoController from "../controllers/arrendamientoController";

class ArrendamientoRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{

         this.router.get('/api/arrendamiento',arrendamientoController.ListaArrendamientos)
         this.router.get('/api/arrendamiento/:id_empresa_servicio',arrendamientoController.ObtenerContratoArrendamientoPorEmpresa)
         this.router.post('/api/arrendamiento',arrendamientoController.CrearContratoArrendamiento)
         this.router.put('/api/arrendamiento/:id_contrato',arrendamientoController.ModificarContratoArrendamiento) 
         this.router.delete('/api/arrendamiento/:id_contrato',arrendamientoController.EliminarContratoArrendamiento)   
         
    }
}

const arrendamientoRoutes = new ArrendamientoRoutes
export default arrendamientoRoutes.router;