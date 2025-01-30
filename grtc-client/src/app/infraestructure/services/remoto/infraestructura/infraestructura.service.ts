import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { detalleInfraestructuraResponse, ListaInfraestructuraResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';


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

  detalleInfraestructura(id_infraestructura:number):Observable<detalleInfraestructuraResponse>{
    return this.http.get<detalleInfraestructuraResponse>(this.api_uri_infraestructura+'/'+id_infraestructura)
  }
}
