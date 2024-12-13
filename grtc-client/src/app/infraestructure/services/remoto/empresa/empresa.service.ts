import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { EmpresaResponse } from '../../../../domain/dto/EmpresaResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor( private http: HttpClient) { }
  // this.router.get('/api/empresa',empresaController.listarEmpresas)
  // this.router.get('/api/empresa/:id_empresa',empresaController.ObtenerEmpresaDetalle)
  // this.router.get('/api/empresa/ruc/:ruc_empresa',empresaController.ObtenerEmpresaPorRuc)
  // this.router.post('/api/empresa',empresaController.CrearEmpresa)
  // this.router.put('/api/empresa/:id_empresa',empresaController.ModificarEmpresa) 
  api_uri_empresa=`${environment.urlApi}/empresa`

  ObtenerEmpresa(id_empresa:number): Observable<EmpresaResponse>{
    return this.http.get<EmpresaResponse>(`${this.api_uri_empresa}/${id_empresa}`);
  } 
}
