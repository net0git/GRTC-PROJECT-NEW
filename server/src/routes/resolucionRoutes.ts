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
        this.router.get('/api/resolucion/:id_resolucion',resolucionController.ObtenerResolucionById)
        this.router.post('/api/resolucion/empresa',resolucionController.CrearResolucionEmpresaServicio)
        this.router.post('/api/resolucion/infraestructura',resolucionController.CrearResolucionInfraestructura)  
        this.router.get('/api/resolucion/busqueda/:nro_resolucion/:anio_resolucion',resolucionController.ObtenerResolucionPorNroAnio)
        this.router.get('/api/resolucion/lista/empresa/:id_empresa_servicio',resolucionController.ObtenerResolucionesDeEmpresaServicio)
        this.router.get('/api/resolucion/lista/infraestructura/:id_infraestructura',resolucionController.ObtnerResolucionesDeInfraestructura)
        this.router.put('/api/resolucion/modificar/:id_resolucion',resolucionController.ModificarResolucion)
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;