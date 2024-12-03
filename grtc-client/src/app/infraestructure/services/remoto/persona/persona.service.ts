import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { personaMessageResponse } from '../../../../domain/dto/PersonasResponse.dto';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../../../domain/dto/ErrorValidacion.dto';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
api_uri_persona='http://localhost:4000/api/persona'
  constructor(private http:HttpClient) { }

  validarPersonaForm(cuerpo_persona: PersonaModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (!cuerpo_persona.nombres) {
      errorValidacion.push({ campo: 'nombres', mensaje: 'Campo requerido' });
    }
    if (!cuerpo_persona.ap_paterno) {
      errorValidacion.push({ campo: 'apellido paterno', mensaje: 'Campo requerido' });
    }
    if (!cuerpo_persona.ap_materno) {
      errorValidacion.push({ campo: 'apellido materno', mensaje: 'Campo requerido' });
    }
    return errorValidacion;
  }

  CrearPersona(cuerpo_persona:PersonaModel):Observable<personaMessageResponse>{
    cuerpo_persona.nombres=cuerpo_persona.nombres.trim().toUpperCase()
    cuerpo_persona.ap_paterno=cuerpo_persona.ap_paterno.trim().toUpperCase()
    cuerpo_persona.ap_materno=cuerpo_persona.ap_materno.trim().toUpperCase()

    const erroresValidacion=this.validarPersonaForm(cuerpo_persona)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      return throwError(() => errorMensaje);
    }

     return this.http.post<personaMessageResponse>(this.api_uri_persona,cuerpo_persona)
  }

  ObtenerDatosPersona(id_persona:number):Observable<PersonaModel>{
    return this.http.get<PersonaModel>(this.api_uri_persona+`/${id_persona}`)
  }

  ModificarPersona(id_persona:number,cuerpo_persona:any):Observable<personaMessageResponse>{
    cuerpo_persona.nombres=cuerpo_persona.nombres.trim().toUpperCase()
    cuerpo_persona.ap_paterno=cuerpo_persona.ap_paterno.trim().toUpperCase()
    cuerpo_persona.ap_materno=cuerpo_persona.ap_materno.trim().toUpperCase()
    return this.http.put<personaMessageResponse>(this.api_uri_persona+`/modificar/datos/${id_persona}`,cuerpo_persona)
  }
  

}
