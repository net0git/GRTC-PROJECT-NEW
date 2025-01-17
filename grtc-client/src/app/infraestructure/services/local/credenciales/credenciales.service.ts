import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  private usuario: UsuarioModel = {
    id_usuario: 1,
    id_persona: 1,
    nombre_usuario: '',
    rol: '',
  };

  constructor() { }

  get credenciales(): UsuarioModel {
    return this.usuario;
  }

  set credenciales(value: UsuarioModel) {
    this.usuario = value;
  }

  clear(): void {
    this.usuario = {
      id_usuario: 0,
      id_persona: 0,
      nombre_usuario: '',
      rol: '',
    };
  }

}
