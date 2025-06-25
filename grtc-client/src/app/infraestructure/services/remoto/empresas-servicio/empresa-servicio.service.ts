import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { crearEmpresaServicioResponse, EmpresaServicioDetalleResponse, ListaEmpresaServicioResponse, modificarEmpresaServicioResponse, modificarNotasEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaServicioModel } from '../../../../domain/models/EmpresaServicio.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServicioService {

  api_uri_empresa_servicio=`${environment.urlApi}/empresaservicio`
  constructor(private http: HttpClient) { }

  crearEmpresaServicio(cuerpo_empresa_servicio: EmpresaServicioModel): Observable<crearEmpresaServicioResponse> {
    return this.http.post<crearEmpresaServicioResponse>(`${this.api_uri_empresa_servicio}`, cuerpo_empresa_servicio)
  }

  listarEmpresasServicio():Observable<ListaEmpresaServicioResponse[]>{
    return this.http.get<ListaEmpresaServicioResponse[]>(this.api_uri_empresa_servicio)
  }

  OtenerDetalleEmpresaServicio(id_empresa_servicio:number):Observable<EmpresaServicioDetalleResponse>{
    return this.http.get<EmpresaServicioDetalleResponse>(this.api_uri_empresa_servicio+'/detalle/'+id_empresa_servicio)
  }

  ObtenerEmpresaServicio(id_empresa_servicio:number):Observable<EmpresaServicioResponse>{
    return this.http.get<EmpresaServicioResponse>(this.api_uri_empresa_servicio+'/'+id_empresa_servicio)
  }

  ModificarEmpresaServicio(id_empresa_servicio:number,cuerpo_empresa_servicio:any):Observable<modificarEmpresaServicioResponse>{
    cuerpo_empresa_servicio.id_empresa_servicio=id_empresa_servicio
    return this.http.put<modificarEmpresaServicioResponse>(this.api_uri_empresa_servicio+'/'+id_empresa_servicio,cuerpo_empresa_servicio)
  }

  BuscarEmpresaPorRuc_TipoServicio(id_tipo_servicio:number,empresa_ruc:string):Observable<EmpresaServicioResponse>{
    return this.http.get<EmpresaServicioResponse>(this.api_uri_empresa_servicio+'/'+id_tipo_servicio+'/'+empresa_ruc)
  }

  ModificarNotasEmpresaServicio(id_empresa_servicio:number, notas:string):Observable<modificarNotasEmpresaServicioResponse>{
    return this.http.put<modificarNotasEmpresaServicioResponse>(this.api_uri_empresa_servicio+'/notas/'+id_empresa_servicio,{notas})
  }

}
