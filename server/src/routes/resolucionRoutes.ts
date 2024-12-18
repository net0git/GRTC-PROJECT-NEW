import { Router } from "express";
import resolucionController from "../controllers/resolucionController";


class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/resolucion',resolucionController.CrearResolucion)
        this.router.post('/api/resolucion/empresa/:id_empresa_servicio',resolucionController.CrearResolucionEmpresaServicio)
        this.router.post('/api/resolucion/infraestructura/:id_infraestructura',resolucionController.CrearResolucionInfraestructura)  
        this.router.get('/api/resolucion/:nro_resolucion/:anio_resolucion',resolucionController.ObtenerResolucionPorNroAnio)
        this.router.get('/api/resolucion/lista/empresa/:id_empresa_servicio',resolucionController.ObtenerResolucionesDeEmpresaServicio)
        this.router.get('/api/resolucion/infraestructura/:id_infraestructura',resolucionController.ObtnerResolucionesDeInfraestructura)
        this.router.put('/api/resolucion/:id_resolucion',resolucionController.ModificarResolucion)
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;