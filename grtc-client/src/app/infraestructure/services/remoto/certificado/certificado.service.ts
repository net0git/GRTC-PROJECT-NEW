import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { CertificadoResponse, CrearCertificadoInfraestructuraMessageResponse, CrearCertificadoMessageResponse, ListaCertificadoResponse, ModificarCertificadoMessageResponse } from '../../../../domain/dto/CertificadoResponse.dto';
import { CertificadoModel } from '../../../../domain/models/Certificado.model';
import { CertificadoInfraestructuraModel } from '../../../../domain/models/CertificadoInfraestructura.model';
@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  api_uri_certificado=`${environment.urlApi}/certificado`

  // this.router.get('/api/certificado/lista/infraestructura/:id_infraestructura',certificadoController.ObtnerCertificadosDeInfraestructura)
  // this.router.get('/api/certificado/detalle/:id_certificado',certificadoController.ObtnerCertificadoById)
  // this.router.post('/api/certificado',certificadoController.CrearCertificado)
  // this.router.post('/api/certificado/asociar/infraestructura',certificadoController.AsociarCertificadoInfraestructura)
  // this.router.put('/api/certificado/:id_certificado',certificadoController.ModificarCertificado)  
  constructor(private http: HttpClient) { }

  listarCertificadosInfraestructura(id_infraestructura:number):Observable<ListaCertificadoResponse[]>{
    return this.http.get<ListaCertificadoResponse[]>(`${this.api_uri_certificado}/lista/infraestructura/${id_infraestructura}`);
  }

  obtenerCertificadoById(id_certificado:number):Observable<CertificadoResponse>{
    return this.http.get<CertificadoResponse>(`${this.api_uri_certificado}/detalle/${id_certificado}`)
  }

  crearCertificado(cuerpo_certificado: CertificadoModel):Observable<CrearCertificadoMessageResponse>{
    return this.http.post<CrearCertificadoMessageResponse>(`${this.api_uri_certificado}`,cuerpo_certificado)
  }

  crearCertificadoInfraestructura(cuerpo_certificado_infraestructura: CertificadoInfraestructuraModel):Observable<CrearCertificadoInfraestructuraMessageResponse>{
    return this.http.post<CrearCertificadoInfraestructuraMessageResponse>(`${this.api_uri_certificado}/asociar/infraestructura`,cuerpo_certificado_infraestructura)
  }

  modificarCertificado(id_certificado: number, cuerpo_certificado: CertificadoModel):Observable<ModificarCertificadoMessageResponse>{
    return this.http.put<ModificarCertificadoMessageResponse>(`${this.api_uri_certificado}/${id_certificado}`,cuerpo_certificado)
  }
 
}
