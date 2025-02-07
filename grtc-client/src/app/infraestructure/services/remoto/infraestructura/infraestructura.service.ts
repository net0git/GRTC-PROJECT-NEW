import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { CrearInfraestructuraResponse, detalleInfraestructuraResponse, InfraestructuraResponse, ListaInfraestructuraResponse, ModifcarInfraestructraMessageResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { InfraestructuraModel } from '../../../../domain/models/Infraestructura.model'

// import { InfraestructuraModel } from '../../../../domain/models/InfraEstructura.model';



@Injectable({
  providedIn: 'root'
})
export class InfraestructuraService {

  api_uri_infraestructura=`${environment.urlApi}/infraestructura`
  constructor(private http: HttpClient) { }

  crearInfraestructura(cuerpo_infraestructura:InfraestructuraModel):Observable<CrearInfraestructuraResponse>{
    cuerpo_infraestructura.expediente=cuerpo_infraestructura.expediente.trim().toUpperCase()
    cuerpo_infraestructura.nombre_infraestructura=cuerpo_infraestructura.nombre_infraestructura.trim().toUpperCase()
    cuerpo_infraestructura.direccion=cuerpo_infraestructura.direccion.trim().toUpperCase()
    return this.http.post<CrearInfraestructuraResponse>(this.api_uri_infraestructura,cuerpo_infraestructura)
  }

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
    cuerpo_infraestructura.expediente=cuerpo_infraestructura.expediente.trim().toUpperCase()
    cuerpo_infraestructura.nombre_infraestructura=cuerpo_infraestructura.nombre_infraestructura.trim().toUpperCase()
    cuerpo_infraestructura.direccion=cuerpo_infraestructura.direccion.trim().toUpperCase()
    return this.http.put<ModifcarInfraestructraMessageResponse>(this.api_uri_infraestructura+'/'+cuerpo_infraestructura.id_infraestructura,cuerpo_infraestructura)
  }

  
}
