import { Injectable } from '@angular/core';
import { CrearItinerarioMessageResponse, EliminarItinerarioMessageResponse, ListaItinerarioResponse, ModificarItinerarioMessageResponse } from '../../../../domain/dto/ItinerarioResponse.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { ItinerarioModel } from '../../../../domain/models/Itinerario.model';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  api_uri_itinerario = `${environment.urlApi}/itinerario`
  constructor(private http: HttpClient) { }

  listarItinerarioByEmpresasServicio(id_empresa_servicio: number): Observable<ListaItinerarioResponse[]> {
    return this.http.get<ListaItinerarioResponse[]>(`${this.api_uri_itinerario}/lista/empresa/${id_empresa_servicio}`)
  }

  crearItinerario(cuerpoItinerario: ItinerarioModel): Observable<CrearItinerarioMessageResponse> {
    cuerpoItinerario.origen = cuerpoItinerario.origen.trim().toUpperCase()
    cuerpoItinerario.destino = cuerpoItinerario.destino.trim().toUpperCase()
    cuerpoItinerario.itinerario = cuerpoItinerario.itinerario.trim().toUpperCase()
    cuerpoItinerario.frecuencia = cuerpoItinerario.frecuencia ? cuerpoItinerario.frecuencia.trim().toUpperCase() : null
    return this.http.post<CrearItinerarioMessageResponse>(this.api_uri_itinerario, cuerpoItinerario)
  }

  modificarItinerario(id_itinerario: number, cuerpoItinerario: any): Observable<ModificarItinerarioMessageResponse> {
    cuerpoItinerario.origen = cuerpoItinerario.origen.trim().toUpperCase()
    cuerpoItinerario.destino = cuerpoItinerario.destino.trim().toUpperCase()
    cuerpoItinerario.itinerario = cuerpoItinerario.itinerario.trim().toUpperCase()
    cuerpoItinerario.frecuencia = cuerpoItinerario.frecuencia ? cuerpoItinerario.frecuencia.trim().toUpperCase() : null
    return this.http.put<ModificarItinerarioMessageResponse>(this.api_uri_itinerario + `/${id_itinerario}`, cuerpoItinerario)
  }

  eliminarItinerario(id_itinerario: number): Observable<EliminarItinerarioMessageResponse> {
    return this.http.delete<EliminarItinerarioMessageResponse>(this.api_uri_itinerario + `/${id_itinerario}`)
  }

}
