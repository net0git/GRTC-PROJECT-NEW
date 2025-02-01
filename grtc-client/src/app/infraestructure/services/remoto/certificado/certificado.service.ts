import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ListaCertificadoResponse } from '../../../../domain/dto/CertificadoResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  api_uri_certificado=`${environment.urlApi}/certificado`

  // this.router.get('/api/certificado/:id_infraestructura',certificadoController.ObtnerCertificadosDeInfraestructura)
  //        this.router.post('/api/certificado',certificadoController.CrearCertificado)
  //        this.router.post('/api/certificado/asociar/infraestructura',certificadoController.AsociarCertificadoInfraestructura)
  //        this.router.put('/api/certificado/:id_certificado',certificadoController.ModificarCertificado)  
  constructor(private http: HttpClient) { }

  listarCertificadosInfraestructura(id_infraestructura:number):Observable<ListaCertificadoResponse[]>{
    return this.http.get<ListaCertificadoResponse[]>(`${this.api_uri_certificado}/${id_infraestructura}`);
  }
 
}
