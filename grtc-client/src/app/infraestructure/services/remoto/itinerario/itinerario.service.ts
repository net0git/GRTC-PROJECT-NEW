import { Injectable } from '@angular/core';
import { ListaItinerarioResponse } from '../../../../domain/dto/ItinerarioResponse.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  api_uri_itinerario=`${environment.urlApi}/itinerario`
  constructor(private http: HttpClient) { }

        // this.router.get('/api/itinerario/lista/empresa/:id',itinerarioController.listarItinearioPorEmpresa)
        // this.router.post('/api/itinerario',itinerarioController.CrearItinerario)
        // this.router.put('/api/itinerario/:id',itinerarioController.ModificarItinerario) 
        // this.router.delete('/api/itinerario/:id',itinerarioController.EliminarItinerario)

  listarItinerarioByEmpresasServicio(id_empresa_servicio:number):Observable<ListaItinerarioResponse[]>{

    return this.http.get<ListaItinerarioResponse[]>(`${this.api_uri_itinerario}/lista/empresa/${id_empresa_servicio}`)

  }
}
