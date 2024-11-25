import { Router } from "express";
import empresaController from "../controllers/empresaController";

class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
         this.router.get('/api/empresa',empresaController.listarEmpresas)
         this.router.get('/api/empresa/:id_empresa',empresaController.ObtenerEmpresaDetalle)
         this.router.get('/api/empresa/ruc/:ruc_empresa',empresaController.ObtenerEmpresaPorRuc)
         this.router.post('/api/empresa',empresaController.CrearEmpresa)
         this.router.put('/api/empresa/:id_empresa',empresaController.ModificarEmpresa)    
    }
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;