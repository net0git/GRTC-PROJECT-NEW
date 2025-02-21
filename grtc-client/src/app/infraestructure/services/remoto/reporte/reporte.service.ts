import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ListaEmpresaServicioReporteResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { ListaVehiculosDetallReporteResponse } from '../../../../domain/dto/VehiculoResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  api_url_reporte = `${environment.urlApi}/reporte`;

  // this.router.get('/api/reporte/lista/empresas/ruta',reporteController.listarEmpresasByRuta)
  // this.router.post('/api/reporte/lista/empresas/ruta/origen/:origen',reporteController.listarEmpresasPorRutaOrigen)
  // this.router.post('/api/reporte/lista/empresas/ruta/destino/:destino',reporteController.listarEmpresasPorRutaDestino)
  // this.router.post('/api/reporte/lista/empresas/ruta/origen/:origen/destino/:destino',reporteController.ObtenerEmpresasPorRutaOrigenDestino)
  // this.router.get('/api/reporte/cantidad/empresas/tiposervicio',reporteController.CantidadDeEmpresasPorTipoServicio)
  // this.router.get('/api/reporte/cantidad/empresas/ruta',reporteController.CantidadDeEmpresasPorRuta)
  // this.router.get('/api/reporte/estado/empresas',reporteController.CantidadEstadoEmpresas)
  // this.router.get('/api/reporte/cantidad/infraestructura',reporteController.CantidadDeInfraestructura)
  // this.router.get('/api/reporte/vehiculos/ruta',reporteController.listarVehiculosPorRuta)
  // this.router.get('/api/reporte/vehiculos/ruta/origen/:origen',reporteController.listarVehiculosPorRutaOrigen)
  // this.router.get('/api/reporte/vehiculos/ruta/destino/:destino',reporteController.listarVehiculosPorDestinoRuta)
  // this.router.get('/api/reporte/vehiculos/ruta/origen/:origen/destino/:destino',reporteController.obtenerVehiculosPorRutaOrigenDestino)
  // this.router.get('/api/reporte/cantidad/vehiculos',reporteController.CantidadVehiculosPorTipoServicio)
  // this.router.get('/api/reporte/cantidad/vehiculos/ruta',reporteController.CantidadVehiculosPorRuta)

  //this.router.get('/api/reporte/lista/detalle/empresas-servicio', reporteController.listarReporteEmpresasServicios)

  constructor(private http: HttpClient) { }

  CantidadVehiculosRuta(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/cantidad/vehiculos/ruta`);
  }

  CantidadEmpresasRuta(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/cantidad/empresas/ruta`);
  }

  ObtenerVehiculosPorRutaOrigenDestino(origen: string, destino: string): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/vehiculos/ruta/origen/${origen}/destino/${destino}`);
  }

  // /api/reporte/empresas/ruta/origen/:origen/destino/:destino
  ObtenerEmpresasPorRutaOrigenDestino(origen: string, destino: string): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/empresas/ruta/origen/${origen}/destino/${destino}`);
  }

  CantidadEmpresasPorTipoServicio(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/cantidad/empresas/tiposervicio`);
  }

  CantidadEstadoEmpresas(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/estado/empresas`);
  }

  CantidadVehiculosPorTipoServicio(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/cantidad/vehiculos`);
  }

  CantidadDeInfraestructura(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/cantidad/infraestructura`);
  }

  CantidadDeConductores(): Observable<any> {
    return this.http.get<any>(`${this.api_url_reporte}/cantidad/conductores`);
  }

  ListarEmpresasServicios(): Observable<ListaEmpresaServicioReporteResponse[]> {
    return this.http.get<ListaEmpresaServicioReporteResponse[]>(`${this.api_url_reporte}/lista/detalle/empresas-servicio`);
  }

  //         this.router.get('/api/reporte/lista/detalle/vehiculos',reporteController.listarReporteTotalVehiculos)
  ListarReporteTotalVehiculos(): Observable<ListaVehiculosDetallReporteResponse[]> {
    return this.http.get<ListaVehiculosDetallReporteResponse[]>(`${this.api_url_reporte}/lista/detalle/vehiculos`);
  }
}
