import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaResolucionResponse, ResolucionResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  api_uri_resolucion=`${environment.urlApi}/resolucion`


        // this.router.post('/api/resolucion',resoucionController.CrearResolucion)
        // this.router.post('/api/resolucion/empresa/:id_empresa_servicio',resoucionController.CrearResolucionEmpresaServicio)
        // this.router.post('/api/resolucion/infraestructura/:id_infraestructura',resoucionController.CrearResolucionInfraestructura)  
        // this.router.get('/api/resolucion/:nro_resolucion/:anio_resolucion',resoucionController.ObtenerResolucionPorNroAnio)
        // this.router.get('/api/resolucion/empresa/:id_empresa_servicio',resoucionController.ObtnerResolucionesDeEmpresaServicio)
        // this.router.get('/api/resolucion/infraestructura/:id_infraestructura',resoucionController.ObtnerResolucionesDeInfraestructura)
        // this.router.put('/api/resolucion/:id_resolucion',resoucionController.ModificarResolucion)
  constructor(private http: HttpClient) { }

  ObternerResolucionesPorEmpresaServicio(id_empresa_servicio:number):Observable<ListaResolucionResponse[]>{
    return this.http.get<ListaResolucionResponse[]>(this.api_uri_resolucion+'/lista/empresa/'+id_empresa_servicio)
  }

  ObtenerResolucionById(id_resolucion:number):Observable<ResolucionResponse>{
    return this.http.get<ResolucionResponse>(this.api_uri_resolucion+'/'+id_resolucion)
  }


}
