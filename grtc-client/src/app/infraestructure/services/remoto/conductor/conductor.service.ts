import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ListaConductoresResponse } from '../../../../domain/dto/ConductorResponse.dto';

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

}
