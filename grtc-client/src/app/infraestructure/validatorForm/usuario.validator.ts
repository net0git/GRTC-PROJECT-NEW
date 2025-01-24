import { Validators } from '../../../../public/utils/validators';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { PersonaModel } from '../../domain/models/Persona.model';
import { UsuarioModel } from '../../domain/models/usuario.model';

export function ValidarFormulario(dataPersona: PersonaModel, dataUsuario: UsuarioModel, modificar: boolean): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (!dataPersona.nombres) {
      errorValidacion.push({ campo: 'nombres', mensaje: 'Campo requerido' });
    }
    if (!dataPersona.ap_paterno) {
      errorValidacion.push({ campo: 'ap_paterno', mensaje: 'Campo requerido' });
    }
    if (!dataPersona.ap_materno) {
      errorValidacion.push({ campo: 'ap_materno', mensaje: 'Campo requerido' });
    }
    if (dataPersona.telefono.length > 0) {
      if (!Validators.validarTelefono(dataPersona.telefono)) {
        errorValidacion.push({ campo: 'telefono', mensaje: 'Campo no válido' });
      }
    }
    if (dataPersona.correo.length > 0) {
      if (!Validators.validarCorreo(dataPersona.correo)) {
        errorValidacion.push({ campo: 'Correo', mensaje: 'Campo no válido' });
      }
    }
    if (dataPersona.documento.length > 0) {
      if (dataPersona.tipo_doc!=""){
        if(dataPersona.tipo_doc=='DNI' && dataPersona.documento.length!=8 ){
          errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 8 para el tipo de documento DNI' });     
        }
        else if(dataPersona.tipo_doc=='CE' && dataPersona.documento.length!=12){
          errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 12 para el tipo de documento CE' });
        }    
      }
      else{
          errorValidacion.push({ campo: 'Documento de identidad', mensaje: 'Seleccione el tipo de documento' });
      }
    }
    if (!dataUsuario.nombre_usuario) {
      errorValidacion.push({ campo: 'nombre_usuario', mensaje: 'Campo requerido' });
    }
    if (!dataUsuario.rol) {
      errorValidacion.push({ campo: 'rol', mensaje: 'Campo requerido' });
    }
    if (!dataUsuario.estado) {
      errorValidacion.push({ campo: 'estado', mensaje: 'Campo requerido' });
    }
    if (!modificar){
      if (!dataUsuario.password) {
        errorValidacion.push({ campo: 'password', mensaje: 'Campo requerido' });
      }
    }
    
    return errorValidacion;
  }