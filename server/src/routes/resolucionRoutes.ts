import { Router } from "express";
import resoucionController from "../controllers/resolucionController";


class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/resolucion',resoucionController.CrearResolucion)
        this.router.post('/api/resolucion/empresa/:id_empresa_servicio',resoucionController.CrearResolucionEmpresaServicio)
        this.router.post('/api/resolucion/infraestructura/:id_infraestructura',resoucionController.CrearResolucionInfraestructura)  
        this.router.get('/api/resolucion/:nro_resolucion/:anio_resolucion',resoucionController.ObtenerResolucionPorNroAnio)
        this.router.get('/api/resolucion/empresa/:id_empresa_servicio',resoucionController.ObtnerResolucionesDeEmpresaServicio)
        this.router.get('/api/resolucion/infraestructura/:id_infraestructura',resoucionController.ObtnerResolucionesDeInfraestructura)
        this.router.put('/api/resolucion/:id_resolucion',resoucionController.ModificarResolucion)
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;