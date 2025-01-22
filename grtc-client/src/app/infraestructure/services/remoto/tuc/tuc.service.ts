import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { TUCModel } from '../../../../domain/models/TUC.model';
import { CrearTUCMessageResponse, ModificarTUCResponse, TUCResponse } from '../../../../domain/dto/TUCResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class TucService {

  api_uri_tuc=`${environment.urlApi}/tuc`
  constructor(private http: HttpClient) { }

        // this.router.post('/api/tuc',tucController.CrearTuc)
        // this.router.get('/api/tuc/buscar/:nro_tuc',tucController.ObtenerTucPorNumero)
        // this.router.get('/api/tuc/detalle/:id_tuc',tucController.ObtenerTucPorId)
        // this.router.get('/api/tuc/listar/:placa',tucController.listarTucPorPlaca)
        // this.router.put('/api/tuc/:id_tuc',tucController.ModificarTuc)  

  crearTUC(data_tuc:TUCModel):Observable<CrearTUCMessageResponse>{
    return this.http.post<CrearTUCMessageResponse>(this.api_uri_tuc,data_tuc)
  }

  obtenerTUCbyId(id_tuc:number):Observable<TUCResponse>{
    return this.http.get<TUCResponse>(this.api_uri_tuc+'/detalle/'+id_tuc)
  }

  modificarCopiaTUC(id_tuc:number, copia:string):Observable<ModificarTUCResponse>{
    return this.http.put<ModificarTUCResponse>(this.api_uri_tuc+'/modificar/'+id_tuc,{copia})
  }
}
