import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { personaMessageResponse } from '../../../../domain/dto/PersonasResponse.dto';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
api_uri_persona='http://localhost:4000/api/persona'
  constructor(private http:HttpClient) { }

  CrearPersona(cuerpo_persona:PersonaModel):Observable<personaMessageResponse>{
     return this.http.post<personaMessageResponse>(this.api_uri_persona,cuerpo_persona)
  }

  ObtenerPersona(id:number){
    return this.http.get(this.api_uri_persona+'/'+id)
  }
  ModificarPersona(id:number,cuerpo:any){
    return this.http.put(this.api_uri_persona+'/'+id,cuerpo)
  }
  

}
