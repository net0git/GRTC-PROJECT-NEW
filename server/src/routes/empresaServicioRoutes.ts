import { Router } from "express";
import empresaServicioController from "../controllers/empresaServicioController";


class EmpresaServicioRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/empresaservicio',empresaServicioController.CrearEmpresaServicio)
        this.router.get('/api/empresaservicio',empresaServicioController.listarEmpresasServicios)
        this.router.get('/api/empresaservicio/:id_empresa_servicio',empresaServicioController.ObtenerEmpresaServicio)
        this.router.get('/api/empresaservicio/detalle/:id_empresa_servicio',empresaServicioController.ObtenerDetalleEmpresaServicio)
        this.router.put('/api/empresaservicio/:id_empresa_servicio',empresaServicioController.ModificarEmpresaServicio)  
        this.router.get('/api/empresaservicio/:id_tipo_servicio/:empresa_ruc',empresaServicioController.BuscarEmpresaPorRuc_TipoServicio)
        this.router.post('/api/empresaservicio/:placa',empresaServicioController.ObtenerEmpresaByPlacaVehiculo)
        this.router.put('/api/empresaservicio/notas/:id_empresa_servicio',empresaServicioController.ModificarNotasEmpresaServicio)
        }
        
       
}

const empresaServicioRoutes = new EmpresaServicioRoutes
export default empresaServicioRoutes.router;