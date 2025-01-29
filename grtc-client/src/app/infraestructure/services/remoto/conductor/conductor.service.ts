import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ListaConductoresResponse, CrearConductorMessageResponse, ModificarConductorMessageResponse, EliminarConductorMessageResponse } from '../../../../domain/dto/ConductorResponse.dto';
import { ConductorRequest } from '../../../../domain/dto/ConductorRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  api_uri_conductor=`${environment.urlApi}/conductor`
        // this.router.get('/api/conductor/lista/:id_empresa_servicio',conductorController.listarConductoresByEmpresaServicio)
        //  this.router.get('/api/conductor',conductorController.listarTotalConductores)
        //  this.router.post('/api/conductor',conductorController.CrearConductor)
        //  this.router.put('/api/conductor/:id_conductor',conductorController.ModificarConductor)    
        //  this.router.delete('/api/conductor/:id_conductor',conductorController.EliminarConductor)

  constructor(private http: HttpClient) { }

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
