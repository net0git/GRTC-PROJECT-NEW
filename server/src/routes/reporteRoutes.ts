import { Router } from "express";
import reporteController from "../controllers/reporteController";


class ReporteRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();  
    }
    config():void{

        this.router.get('/api/reporte/lista/empresas/ruta',reporteController.listarEmpresasByRuta)
        this.router.post('/api/reporte/lista/empresas/ruta/origen/:origen',reporteController.listarEmpresasPorRutaOrigen)
        this.router.post('/api/reporte/lista/empresas/ruta/destino/:destino',reporteController.listarEmpresasPorRutaDestino)
        this.router.get('/api/reporte/empresas/ruta/origen/:origen/destino/:destino',reporteController.ObtenerEmpresasPorRutaOrigenDestino)
        this.router.get('/api/reporte/cantidad/empresas/tiposervicio',reporteController.CantidadDeEmpresasPorTipoServicio)
        this.router.get('/api/reporte/cantidad/empresas/ruta',reporteController.CantidadDeEmpresasPorRuta)
        this.router.get('/api/reporte/estado/empresas',reporteController.CantidadEstadoEmpresas)
        this.router.get('/api/reporte/cantidad/infraestructura',reporteController.CantidadDeInfraestructura)
        this.router.get('/api/reporte/vehiculos/ruta',reporteController.listarVehiculosPorRuta)
        this.router.get('/api/reporte/vehiculos/ruta/origen/:origen',reporteController.listarVehiculosPorRutaOrigen)
        this.router.get('/api/reporte/vehiculos/ruta/destino/:destino',reporteController.listarVehiculosPorDestinoRuta)
        this.router.get('/api/reporte/vehiculos/ruta/origen/:origen/destino/:destino',reporteController.obtenerVehiculosPorRutaOrigenDestino)
        this.router.get('/api/reporte/cantidad/vehiculos',reporteController.CantidadVehiculosPorTipoServicio)
        this.router.get('/api/reporte/cantidad/vehiculos/ruta',reporteController.CantidadVehiculosPorRuta)
        this.router.get('/api/reporte/cantidad/conductores',reporteController.CantidadDeConductores)
    }


}

const reporteRoutes = new ReporteRoutes
export default reporteRoutes.router;