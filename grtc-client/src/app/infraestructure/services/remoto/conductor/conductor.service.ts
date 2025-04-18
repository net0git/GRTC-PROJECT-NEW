import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ListaConductoresResponse, CrearConductorMessageResponse, ModificarConductorMessageResponse, EliminarConductorMessageResponse, ListaTotalConductorResponse } from '../../../../domain/dto/ConductorResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  api_uri_conductor=`${environment.urlApi}/conductor`
  constructor(private http: HttpClient) { }

  listarTotalConductores():Observable<ListaTotalConductorResponse[]>{
    return this.http.get<ListaTotalConductorResponse[]>(this.api_uri_conductor)
  }

  listarConductoresByEmpresaServicio(id_empresa_servicio:number):Observable<ListaConductoresResponse[]>{
    return this.http.get<ListaConductoresResponse[]>(this.api_uri_conductor+'/lista/empresa/'+id_empresa_servicio)
  }

  CrearConductor(cuerpo_conductor: any):Observable<CrearConductorMessageResponse>{
    return this.http.post<CrearConductorMessageResponse>(this.api_uri_conductor,cuerpo_conductor)
  }

  modificarConductor(id_conductor:number,cuerpo_conductor:any):Observable<ModificarConductorMessageResponse>{
    return this.http.put<ModificarConductorMessageResponse>(this.api_uri_conductor+`/${id_conductor}`,cuerpo_conductor)
  }

  eliminarConductor(id_conductor:number):Observable<EliminarConductorMessageResponse>{
    return this.http.delete<EliminarConductorMessageResponse>(this.api_uri_conductor+`/${id_conductor}`)
  }
}
