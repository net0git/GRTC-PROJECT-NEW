import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ListaArrendamientoResponse } from '../../../../domain/dto/ArrendamientoResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ArrendamientoService {

  api_url_arrendamiento = `${environment.urlApi}/arrendamiento`;
  constructor( private http: HttpClient) { }
// this.router.get('/api/arrendamiento/:id_empresa_servicio',arrendamientoController.ObtenerContratoArrendamientoPorEmpresa)
  ListarArrendamientoByEmpresaServicio(id_empresa_servicio:number):Observable<ListaArrendamientoResponse[]>{
    return this.http.get<ListaArrendamientoResponse[]>(this.api_url_arrendamiento+'/'+id_empresa_servicio)
  }


}
