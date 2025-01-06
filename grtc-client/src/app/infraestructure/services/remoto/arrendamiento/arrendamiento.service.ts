import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ListaArrendamientoResponse, CrearArrendamientoMessageResponse, ModificarArrendamientoMessageResponse, EliminarArrendamientoMessageResponse } from '../../../../domain/dto/ArrendamientoResponse.dto';
import { ArrendamientoModel } from '../../../../domain/models/Arrendamiento.model';

@Injectable({
  providedIn: 'root'
})
export class ArrendamientoService {

  api_url_arrendamiento = `${environment.urlApi}/arrendamiento`;
  constructor( private http: HttpClient) { }
// this.router.get('/api/arrendamiento/:id_empresa_servicio',arrendamientoController.ObtenerContratoArrendamientoPorEmpresa)
// this.router.get('/api/arrendamiento',arrendamientoController.ListaArrendamientos)
// this.router.get('/api/arrendamiento/:id_empresa_servicio',arrendamientoController.ObtenerContratoArrendamientoPorEmpresa)
// this.router.post('/api/arrendamiento',arrendamientoController.CrearContratoArrendamiento)
// this.router.put('/api/arrendamiento/:id_contrato',arrendamientoController.ModificarContratoArrendamiento) 
// this.router.delete('/api/arrendamiento/:id_contrato',arrendamientoController.EliminarContratoArrendamiento)   
  ListarArrendamientoByEmpresaServicio(id_empresa_servicio:number):Observable<ListaArrendamientoResponse[]>{
    return this.http.get<ListaArrendamientoResponse[]>(this.api_url_arrendamiento+'/'+id_empresa_servicio)
  }

  crearArrendamiento(cuerpo_arrendamiento:ArrendamientoModel):Observable<CrearArrendamientoMessageResponse>{
    cuerpo_arrendamiento.arrendador=cuerpo_arrendamiento.arrendador.trim().toUpperCase()
    cuerpo_arrendamiento.propiedad=cuerpo_arrendamiento.propiedad.trim().toUpperCase()
    cuerpo_arrendamiento.direccion=cuerpo_arrendamiento.direccion.trim().toUpperCase()
    return this.http.post<CrearArrendamientoMessageResponse>(this.api_url_arrendamiento,cuerpo_arrendamiento)
  }

  modificarArrendamiento(id_contrato:number,cuerpo_arrendamiento:any):Observable<ModificarArrendamientoMessageResponse>{
    cuerpo_arrendamiento.arrendador=cuerpo_arrendamiento.arrendador.trim().toUpperCase()
    cuerpo_arrendamiento.propiedad=cuerpo_arrendamiento.propiedad.trim().toUpperCase()
    cuerpo_arrendamiento.direccion=cuerpo_arrendamiento.direccion.trim().toUpperCase()
    return this.http.put<ModificarArrendamientoMessageResponse>(this.api_url_arrendamiento+`/${id_contrato}`,cuerpo_arrendamiento)
  }

  eliminarArrendamiento( id_contrato: number):Observable<EliminarArrendamientoMessageResponse>{
    return this.http.delete<EliminarArrendamientoMessageResponse>(this.api_url_arrendamiento+`/${id_contrato}`)
  }

}
