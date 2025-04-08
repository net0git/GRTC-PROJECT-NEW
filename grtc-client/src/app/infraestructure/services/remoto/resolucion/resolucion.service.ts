import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearResolucionEmpresaServicioMessageResponse, CrearResolucionInfraestructuraMessageResponse, CrearResolucionMessageResponse, ListaResolucionResponse, ModificarResolucionMessageResponse, ResolucionBusquedaResponse, ResolucionResponse, VerificarResolucionByNombreResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { environment } from '../../../../../../environments/environment';
import { ResolucionModel } from '../../../../domain/models/Resolucion.model';
import { ResolucionEmpresaModel } from '../../../../domain/models/ResolucionEmpresa.model';
import { ResolucionInfraestructuraModel } from '../../../../domain/models/ResolucionInfraestructura.model';
import { CrearItinerarioMessageResponse } from '../../../../domain/dto/ItinerarioResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  api_uri_resolucion=`${environment.urlApi}/resolucion`

  constructor(private http: HttpClient) { }

        // this.router.post('/api/resolucion',resolucionController.CrearResolucion)
        // this.router.get('/api/resolucion/:id_resolucion',resolucionController.ObtenerResolucionById)
        // this.router.post('/api/resolucion/empresa',resolucionController.CrearResolucionEmpresaServicio)
        // this.router.post('/api/resolucion/infraestructura',resolucionController.CrearResolucionInfraestructura)  
        // this.router.get('/api/resolucion/:nro_resolucion/:anio_resolucion',resolucionController.ObtenerResolucionPorNroAnio)
        // this.router.get('/api/resolucion/lista/empresa/:id_empresa_servicio',resolucionController.ObtenerResolucionesDeEmpresaServicio)
        // this.router.get('/api/resolucion/lista/infraestructura/:id_infraestructura',resolucionController.ObtnerResolucionesDeInfraestructura)
        // this.router.put('/api/resolucion/modificar/:id_resolucion',resolucionController.ModificarResolucion)
       // this.router.get('/api/resolucion/busqueda/:nro_resolucion/:anio_resolucion',resolucionController.ObtenerResolucionPorNroAnio)
       // this.router.get('/api/resolucion/verificar/:nombre_resolucion',resolucionController.VerificarResolucionByNombre)


  CrearResolucion(cuerpo_resolucion:ResolucionModel):Observable<CrearResolucionMessageResponse>{
    cuerpo_resolucion.nombre_resolucion=cuerpo_resolucion.nombre_resolucion.trim().toUpperCase()
    cuerpo_resolucion.descripcion=cuerpo_resolucion.descripcion.trim().toUpperCase()
    return this.http.post<CrearResolucionMessageResponse>(this.api_uri_resolucion,cuerpo_resolucion)
  }

  CrearResolucionEmpresaServicio(cuerpo_resolucion_empresa_servicio:ResolucionEmpresaModel):Observable<CrearResolucionEmpresaServicioMessageResponse>{
    return this.http.post<CrearResolucionEmpresaServicioMessageResponse>(this.api_uri_resolucion+'/empresa',cuerpo_resolucion_empresa_servicio)
  }

  CrearResolucionInfraestructura(cuerpo_resolucion_infraestructura:ResolucionInfraestructuraModel):Observable<CrearResolucionInfraestructuraMessageResponse>{
    return this.http.post<CrearResolucionInfraestructuraMessageResponse>(this.api_uri_resolucion+'/infraestructura', cuerpo_resolucion_infraestructura)
  }

  ObternerResolucionesPorEmpresaServicio(id_empresa_servicio:number):Observable<ListaResolucionResponse[]>{
    return this.http.get<ListaResolucionResponse[]>(this.api_uri_resolucion+'/lista/empresa/'+id_empresa_servicio)
  }

  ObternerResolucionesPorInfraestructura(id_infraestructura:number):Observable<ListaResolucionResponse[]>{
    return this.http.get<ListaResolucionResponse[]>(this.api_uri_resolucion+'/lista/infraestructura/'+id_infraestructura)
  }

  ObtenerResolucionById(id_resolucion:number):Observable<ResolucionResponse>{
    return this.http.get<ResolucionResponse>(this.api_uri_resolucion+'/'+id_resolucion)
  }

  ObtenerResolucionByNroAnio(nro_resolucion:number,anio_resolucion:string):Observable<ResolucionBusquedaResponse>{
    return this.http.get<ResolucionBusquedaResponse>(this.api_uri_resolucion+'/busqueda/'+nro_resolucion+'/'+anio_resolucion)
  }

  ModificarResolucion(id_resolucion:number,cuerpo_resolucion:ResolucionModel):Observable<ModificarResolucionMessageResponse>{
    cuerpo_resolucion.nombre_resolucion=cuerpo_resolucion.nombre_resolucion.trim().toUpperCase()
    cuerpo_resolucion.descripcion=cuerpo_resolucion.descripcion.trim().toUpperCase()
    return this.http.put<ModificarResolucionMessageResponse>(this.api_uri_resolucion+`/modificar/${id_resolucion}`,cuerpo_resolucion)
  }

  VerificarResolucionByNombre(nombre_resolucion:string):Observable<VerificarResolucionByNombreResponse>{
    return this.http.get<VerificarResolucionByNombreResponse>(this.api_uri_resolucion+'/verificar/'+nombre_resolucion)
  }


}
