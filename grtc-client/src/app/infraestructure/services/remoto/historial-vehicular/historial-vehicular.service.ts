import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { HistorialVehicularResponse, CrearHistorialVehicularMessageResponse, HistorialVehicularDetalleResponse } from '../../../../domain/dto/HistorialVehicularResponse.dto';
import { HistorialVehicularModel } from '../../../../domain/models/HistorialVehicular.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialVehicularService {

  api_uri_historial_vehicular=`${environment.urlApi}/historialvehicular`
  constructor(private http: HttpClient) { }

  ObtenerHistorialVehicularPorEmpresa(id_empresa_servicio: number): Observable<HistorialVehicularResponse[]> {
    return this.http.get<HistorialVehicularResponse[]>(`${this.api_uri_historial_vehicular}/empresa-servicio/${id_empresa_servicio}`);
  }

  ObtenerHistorialVehicularPorPlaca(placa: string): Observable<HistorialVehicularDetalleResponse[]> {
    return this.http.get<HistorialVehicularDetalleResponse[]>(`${this.api_uri_historial_vehicular}/placa/${placa}`);
  }

  CrearHistorialVehicular(historial_vehicular: HistorialVehicularModel): Observable<CrearHistorialVehicularMessageResponse> {
    return this.http.post<CrearHistorialVehicularMessageResponse>(`${this.api_uri_historial_vehicular}`, historial_vehicular);
  }
}
