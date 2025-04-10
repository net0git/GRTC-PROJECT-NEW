import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { CrearEmpresaMessageResponse, EmpresaResponse, modificarEmpresaResponse } from '../../../../domain/dto/EmpresaResponse.dto';
import { EmpresaModel } from '../../../../domain/models/Empresa.model';

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

  ModificarEmpresa(id_empresa:number,cuerpo_empresa:EmpresaModel):Observable<modificarEmpresaResponse>{
    cuerpo_empresa.id_empresa=id_empresa
    cuerpo_empresa.razon_social=cuerpo_empresa.razon_social.trim().toUpperCase()
    cuerpo_empresa.direccion=cuerpo_empresa.direccion.trim().toUpperCase()
    cuerpo_empresa.correo?cuerpo_empresa.correo.trim().toLowerCase(): null
    return this.http.put<modificarEmpresaResponse>(`${this.api_uri_empresa}/${id_empresa}`,cuerpo_empresa)
  }

  obtenerEmpresaPorRuc(ruc:string):Observable<EmpresaResponse>{
    return this.http.get<EmpresaResponse>(`${this.api_uri_empresa}/ruc/${ruc}`);
  }

  crearEmpresa(cuerpo_empresa:EmpresaModel):Observable<CrearEmpresaMessageResponse>{
    cuerpo_empresa.razon_social=cuerpo_empresa.razon_social.trim().toUpperCase()
    cuerpo_empresa.direccion=cuerpo_empresa.direccion.trim().toUpperCase()
    cuerpo_empresa.correo?cuerpo_empresa.correo.trim().toLowerCase(): null
    return this.http.post<CrearEmpresaMessageResponse>(`${this.api_uri_empresa}`,cuerpo_empresa)
  }

}
