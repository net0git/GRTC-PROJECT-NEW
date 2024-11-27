import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaUsuariosResponse } from '../../../../domain/dto/UsuariosResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api_uri_usuario='http://localhost:4000/api/usuario'
  constructor( private http: HttpClient) { }

    //lista los usuarios incluidos sus datos personales
    listarUsuarioDetalle():Observable<ListaUsuariosResponse[]>{
      return this.http.get<ListaUsuariosResponse[]>(this.api_uri_usuario+'/detalle');
    }
  
  // this.router.get('/api/usuario',usuarioController.listarUsuarios)
  //        this.router.get('/api/usuario/detalle',usuarioController.listarUsuariosDetalle)
  //        this.router.get('/api/usuario/:id_usuario',usuarioController.ObtenerUsuario)
  //        this.router.get('/api/usuario/detalle/:nombre_usuario',usuarioController.ObtenerUsuarioPorNombre)
  
  //        this.router.post('/api/usuario/login',usuarioController.ValidarLogin)
  //        this.router.put('/api/usuario/modificar/datos/:id_usuario',usuarioController.ModificarUsuarioDatos)   
  //        this.router.put('/api/usuario/modificar/password/:id_usuario',usuarioController.ModificarUsuarioPassword) 
  
  //        this.router.post('/api/usuario/register',usuarioController.CrearUsuario)
  // CrearUsuario(usuarioBody:UsuarioModel){
  //   return this.http.post(this.api_uri_usuario+'/register',usuarioBody);
  // }

  // ObtenerUsuario(id:number){
  //   return this.http.get(this.api_uri_usuario+'/'+id);
  // }
 
  // //obrener los detalles de un solo usuairo buscado por su nombre_usuario
  // ObtenerDetalleUsuarioPorNombre(nombre_usuario:string){
  //    return this.http.get(this.api_uri_usuario+'/detalle/'+nombre_usuario)
  // }

  // //modifica solo los datos de la tabla usuario considerar en el body solo nombre_usuario, rol, estado
  // ModificarUsuarioDatos(id:number,body:any){
  //   return this.http.put(this.api_uri_usuario+'/modificar/datos/'+id,body);
  // }

  // //modificar password de usuario considerar en el body solo el password que deseamos cambiar
  // ModificarUsuarioPassword(id:number,body:any){
  //   return this.http.put(this.api_uri_usuario+'/modificar/password/'+id,body)
  // }



  
  //creamos un usuario nuevo
  

}
