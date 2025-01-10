import { Router } from "express";
import vehiculoController from "../controllers/vehiculoController";

class TucRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        this.router.post('/api/vehiculo',vehiculoController.CrearVehiculo)
        this.router.get('/api/vehiculo',vehiculoController.listarTotalVehiculos)
        this.router.get('/api/vehiculo/empresaservicio',vehiculoController.listarVehiculosEmpresasServicio)
        this.router.get('/api/vehiculo/lista/empresaservicio/:id_empresa_servicio',vehiculoController.listarVehiculosEmpresaServicio)
        this.router.get('/api/vehiculo/empresaservicio/:id_empresa_servicio',vehiculoController.obtenerVehiculosDetalleByEmpresaServicio)
        this.router.get('/api/vehiculo/placa/:placa',vehiculoController.ObtenerVehiculoPorPlaca)
        this.router.put('/api/vehiculo/:id_vehiculo',vehiculoController.ModificarVehiculo)    
        this.router.put('/api/vehiculo/tuc/:id_vehiculo', vehiculoController.ModificarTucVehiculoAsociado)
        this.router.put('/api/vehiculo/baja/:id_vehiculo', vehiculoController.DarBajaVehiculo)
    }   
}

const tucRoutes = new TucRoutes
export default tucRoutes.router;