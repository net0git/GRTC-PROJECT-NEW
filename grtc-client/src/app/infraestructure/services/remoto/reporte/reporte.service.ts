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
