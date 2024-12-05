import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServicioService {

  api_uri_empresa_servicio=`${environment.urlApi}/empresaservicio`
  constructor(private http: HttpClient) { }

  // this.router.post('/api/empresaservicio',empresaServicioController.CrearEmpresaServicio)
    // this.router.get('/api/empresaservicio',empresaServicioController.listarEmpresasServicios)
    // this.router.get('/api/empresaservicio/detalle/:id_empresa_servicio',empresaServicioController.ObtenerDetalleEmpresaServicio)
    // this.router.put('/api/empresaservicio/:id_empresa_servicio',empresaServicioController.ModificarEmpresaServicio)  
    // this.router.get('/api/empresaservicio/:id_tipo_servicio/:empresa_ruc',empresaServicioController.BuscarEmpresaPorRuc_TipoServicio)
    // this.router.post('/api/empresaservicio/:placa',empresaServicioController.ObtenerEmpresaByPlacaVehiculo)

  listarEmpresasServicio():Observable<ListaEmpresaServicioResponse[]>{

    return this.http.get<ListaEmpresaServicioResponse[]>(this.api_uri_empresa_servicio)

  }
}
