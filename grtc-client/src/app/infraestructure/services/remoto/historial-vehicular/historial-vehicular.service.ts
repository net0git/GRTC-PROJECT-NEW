import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialVehicularService {

  // this.router.post('/api/historialvehicular',historialVehicularController.CrearHistorialVehicular);
  // this.router.get('/api/historialvehicular/:id_empresa_servicio',historialVehicularController.ObtenerHistorialVehicularPorEmpresa);
  // this.router.get('/api/historialvehicular/:placa',historialVehicularController.ObtenerHistorialVehicularPorPlaca);

  constructor(http: HttpClient) { }

  // ObtenerHistorialVehicularPorEmpresa(id_empresa_servicio: string): Observable<any> {
  //   return this.http.get(`/api/historialvehicular/${id_empresa_servicio}`);
  // }

  // ObtenerHistorialVehicularPorPlaca(placa: string): Observable<any> {
  //   return this.http.get(`/api/historialvehicular/${placa}`);
  // }

  // CrearHistorialVehicular(historial_vehicular: any): Observable<any> {
  //   return this.http.post(`/api/historialvehicular`, historial_vehicular);
  // }
}
