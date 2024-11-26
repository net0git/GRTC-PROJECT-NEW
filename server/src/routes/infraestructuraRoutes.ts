import { Router } from "express";
import infraestructuraController from "../controllers/infraestructuraController";


class EmpresaInfraestructuraRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/infraestructura',infraestructuraController.CrearInfraestructura)
        this.router.get('/api/infraestructura',infraestructuraController.listarAllInfraestructura)
        this.router.get('/api/infraestructura/:id_infraestructura',infraestructuraController.ObtenerInfraestructuraDetalle)
        this.router.put('/api/infraestructura/:id_infraestructura',infraestructuraController.ModificarEmpresaInfraestuctura)  
        }
}

const empresaInfraestructuraRoutes = new EmpresaInfraestructuraRoutes
export default empresaInfraestructuraRoutes.router;