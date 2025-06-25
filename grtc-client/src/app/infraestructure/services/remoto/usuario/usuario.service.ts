import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ListaUsuariosResponse } from '../../../../domain/dto/UsuariosResponse.dto';
import { UsuarioModel } from '../../../../domain/models/usuario.model';
import { CrearUsuarioResponse } from '../../../../domain/dto/UsuariosResponse.dto';
import { ErrorValidacion } from '../../../../domain/dto/ErrorValidacion.dto';
import { environment } from '../../../../../../environments/environment';
import { ModificarDatosUsuarioResponse, ModificarPasswordUsuarioResponse } from '../../../../domain/dto/UsuariosResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api_uri_usuario=`${environment.urlApi}/usuario`
  constructor( private http: HttpClient) { }

  validarUsuarioForm(cuerpo_usuario: UsuarioModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (!cuerpo_usuario.nombre_usuario) {
      errorValidacion.push({ campo: 'nombre_usuario', mensaje: 'Campo requerido' });
    }
    if (!cuerpo_usuario.password) {
      errorValidacion.push({ campo: 'password', mensaje: 'Campo requerido' });
    }
    if (!cuerpo_usuario.estado) {
      errorValidacion.push({ campo: 'estado', mensaje: 'Campo requerido' });
    }
    return errorValidacion;
  }

    //lista los usuarios incluidos sus datos personales
    listarUsuarioDetalle():Observable<ListaUsuariosResponse[]>{
      return this.http.get<ListaUsuariosResponse[]>(this.api_uri_usuario+'/detalle');
    }
  
    crearUsuario(cuerpo_usuario:UsuarioModel):Observable<CrearUsuarioResponse>{
      const erroresValidacion = this.validarUsuarioForm(cuerpo_usuario);
      if (erroresValidacion.length > 0) {
        let errorMensaje = '';
        erroresValidacion.forEach(error => {
          errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
        });
        return throwError(() => errorMensaje);
      }

      cuerpo_usuario.nombre_usuario=cuerpo_usuario.nombre_usuario.trim().toUpperCase()
      return this.http.post<CrearUsuarioResponse>(this.api_uri_usuario+'/crear',cuerpo_usuario);
    }

    obtenerUsuarioDetalle(id_usuario:number):Observable<UsuarioModel>{
      return this.http.get<UsuarioModel>(this.api_uri_usuario+'/'+id_usuario)
    }

    modificarDatosUsuario(id_usuario:number,cuerpo_usuario:UsuarioModel):Observable<ModificarDatosUsuarioResponse>{
      cuerpo_usuario.nombre_usuario=cuerpo_usuario.nombre_usuario.trim().toUpperCase()
      return this.http.put<ModificarDatosUsuarioResponse>(this.api_uri_usuario+'/modificar/datos/'+id_usuario,cuerpo_usuario);
    }

    ModificarPasswordUsuario(id_usuario:number,password:string):Observable<ModificarPasswordUsuarioResponse>{
      return this.http.put<ModificarPasswordUsuarioResponse>(this.api_uri_usuario+'/modificar/password/'+id_usuario,{password:password});
    }

}
