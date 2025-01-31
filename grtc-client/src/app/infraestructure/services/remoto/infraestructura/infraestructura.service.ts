import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { detalleInfraestructuraResponse, InfraestructuraResponse, ListaInfraestructuraResponse, ModifcarInfraestructraMessageResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { InfraestructuraModel } from '../../../../domain/models/InfraestructuraData.model';

// import { InfraestructuraModel } from '../../../../domain/models/InfraEstructura.model';



@Injectable({
  providedIn: 'root'
})
export class InfraestructuraService {
  // this.router.post('/api/infraestructura',infraestructuraController.CrearInfraestructura)
  //       this.router.get('/api/infraestructura',infraestructuraController.listarAllInfraestructura)
  //       this.router.get('/api/infraestructura/:id_infraestructura',infraestructuraController.ObtenerInfraestructuraDetalle)
  //       this.router.put('/api/infraestructura/:id_infraestructura',infraestructuraController.ModificarEmpresaInfraestuctura)  
  api_uri_infraestructura=`${environment.urlApi}/infraestructura`
  constructor(private http: HttpClient) { }

  listarInfraestructura():Observable<ListaInfraestructuraResponse[]>{
    return this.http.get<ListaInfraestructuraResponse[]>(this.api_uri_infraestructura)
  }

  obtenerInfraestructuraDetalle(id_infraestructura:number):Observable<detalleInfraestructuraResponse>{
    return this.http.get<detalleInfraestructuraResponse>(this.api_uri_infraestructura+'/detalle/'+id_infraestructura)
  }

  obtenerInfraestructura(id_infraestructura:number):Observable<InfraestructuraResponse>{
    return this.http.get<InfraestructuraResponse>(this.api_uri_infraestructura+'/'+id_infraestructura)
  }

  modificarInfraestructura(cuerpo_infraestructura:InfraestructuraModel):Observable<ModifcarInfraestructraMessageResponse>{
    return this.http.put<ModifcarInfraestructraMessageResponse>(this.api_uri_infraestructura+'/'+cuerpo_infraestructura.id_infraestructura,cuerpo_infraestructura)
  }
}
