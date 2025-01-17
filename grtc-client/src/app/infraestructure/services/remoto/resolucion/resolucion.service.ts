import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearResolucionEmpresaServicioMessageResponse, CrearResolucionMessageResponse, ListaResolucionResponse, ModificarResolucionMessageResponse, ResolucionResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { environment } from '../../../../../../environments/environment';
import { ResolucionModel } from '../../../../domain/models/Resolucion.model';
import { ResolucionEmpresaModel } from '../../../../domain/models/ResolucionEmpresa.model';

@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  api_uri_resolucion=`${environment.urlApi}/resolucion`

  constructor(private http: HttpClient) { }

  CrearResolucion(cuerpo_resolucion:ResolucionModel):Observable<CrearResolucionMessageResponse>{
    cuerpo_resolucion.nombre_resolucion=cuerpo_resolucion.nombre_resolucion.trim().toUpperCase()
    return this.http.post<CrearResolucionMessageResponse>(this.api_uri_resolucion,cuerpo_resolucion)
  }

  CrearResolucionEmpresaServicio(cuperpo_resolucion_empresa_servicio:ResolucionEmpresaModel):Observable<CrearResolucionEmpresaServicioMessageResponse>{
    return this.http.post<CrearResolucionEmpresaServicioMessageResponse>(this.api_uri_resolucion+'/empresa',cuperpo_resolucion_empresa_servicio)
  }

  ObternerResolucionesPorEmpresaServicio(id_empresa_servicio:number):Observable<ListaResolucionResponse[]>{
    return this.http.get<ListaResolucionResponse[]>(this.api_uri_resolucion+'/lista/empresa/'+id_empresa_servicio)
  }

  ObtenerResolucionById(id_resolucion:number):Observable<ResolucionResponse>{
    return this.http.get<ResolucionResponse>(this.api_uri_resolucion+'/'+id_resolucion)
  }

  ModificarResolucion(id_resolucion:number,cuerpo_resolucion:ResolucionModel):Observable<ModificarResolucionMessageResponse>{
    cuerpo_resolucion.nombre_resolucion=cuerpo_resolucion.nombre_resolucion.trim().toUpperCase()
    return this.http.put<ModificarResolucionMessageResponse>(this.api_uri_resolucion+`/modificar/${id_resolucion}`,cuerpo_resolucion)
  }


}
