import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { UsuarioModel } from '../../../../domain/models/usuario.model';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/remoto/usuario/usuario.service';
import { CrearPersonaMessageResponse, ModificarPersonaMessageResponse } from '../../../../domain/dto/PersonasResponse.dto';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CrearUsuarioResponse, ModificarDatosUsuarioResponse,ModificarPasswordUsuarioResponse } from '../../../../domain/dto/UsuariosResponse.dto';
import { ErrorValidacion } from '../../../../domain/dto/ErrorValidacion.dto';
import { Validators } from '../../../../../../public/utils/validators';
import { SoloLetrasDirective } from '../../../directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../directives/solo-numeros.directive';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';



@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, FormsModule, SoloLetrasDirective, SoloNumerosDirective],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent implements OnInit {

  dataPersona: PersonaModel = {
    id_persona:0,
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: '',
  };

  dataUsuario: UsuarioModel = {
    id_usuario: 0,
    id_persona: 0,
    nombre_usuario: '',
    password: '',
    rol: '',
    estado: '',
  };

  boton_text: string='Guardar';
  titulo:string='Crear usuario';
  modificar_usuario:boolean=false;
  

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private personaService: PersonaService, private usuarioService: UsuarioService, private sweetAlert: SweetAlert) { }

  ngOnInit(): void {
    this.CargarPagina()
  }

  // ---------------------------------------------------------
  CargarPagina(){
    const params = this.activatedRoute.snapshot.params
    console.log(params['id_usuario'])
    if(params['id_usuario']){
      this.ObtenerDatosUsuario(params['id_usuario'])
    }
    
  }
  // ---------------------------------------------------------
  IdentificarAcciionFormulario(){
    if(this.modificar_usuario){
      this.ModificarUsuarioFormulario()
      if(this.dataUsuario.password){
        this.ModificarPasswordUsuario(this.dataUsuario.password)
      }
    }else{
      this.CrearUsuarioFormulario()
    }
  }
  // ---------------------------------------------------------
  ValidarFormulario(dataPersona: PersonaModel, dataUsuario: UsuarioModel): ErrorValidacion[] {
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
    if (!this.modificar_usuario){
      if (!dataUsuario.password) {
        errorValidacion.push({ campo: 'password', mensaje: 'Campo requerido' });
      }
    }
    
    return errorValidacion;
  }

  CrearUsuarioFormulario() {
    const erroresValidacion = this.ValidarFormulario(this.dataPersona, this.dataUsuario);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }

    this.personaService.CrearPersona(this.dataPersona).pipe(
      switchMap((personaResponse: CrearPersonaMessageResponse) => {
        // Usar el id_persona devuelto por la API
        const idPersona = personaResponse.id_persona;
        this.dataUsuario.id_persona = idPersona;
        return this.usuarioService.crearUsuario(this.dataUsuario);
      })
    ).subscribe({
      next: (usuarioResponse:CrearUsuarioResponse) => {
        console.log('Usuario creado con éxito:', usuarioResponse.text);
      },
      error: (err) => {
        console.error('Error en el proceso de creación:', err);
        alert(err);
      },
      complete: () => {
        console.log('Proceso de creación completado');
        this.sweetAlert.MensajeExito('Usuario creado con éxito')
        this.router.navigate(['/principal/lista-usuarios']);
      }
    });
  }

  async ModificarUsuarioFormulario(){
    const erroresValidacion = this.ValidarFormulario(this.dataPersona, this.dataUsuario);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }
    this.ModificarDatosPersona()
    this.ModificarDatosUsuario()
    
  }
// ------------------------------------------------------------------
  ModificarDatosUsuario() {
    this.usuarioService.modificarDatosUsuario(this.dataUsuario.id_usuario,this.dataUsuario).subscribe({
      next: (res: ModificarDatosUsuarioResponse) => {
        console.log(res);
     
        this.sweetAlert.MensajeExito('Datos actualizados con éxito')
      },
      error: (err) => {
        console.log(err);
      
      },
      complete: () => {
        console.log('Proceso de modificación completado');
        this.sweetAlert.MensajeExito('Usuario modificado con éxito')
        this.router.navigate(['/principal/lista-usuarios']);
      }
    });

  }
  ModificarPasswordUsuario(password:string){
    this.usuarioService.ModificarPasswordUsuario(this.dataUsuario.id_usuario,password).subscribe({
      next: (res: ModificarPasswordUsuarioResponse) => {
        console.log(res);
        
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Proceso de modificación completado');
        this.sweetAlert.MensajeExito('Contraseña actualizada con éxito')
      }
    })
  }

  ModificarDatosPersona(){
    this.personaService.ModificarPersona(this.dataPersona.id_persona,this.dataPersona).subscribe({
      next: (res: ModificarPersonaMessageResponse) => {
        console.log(res);
        this.sweetAlert.MensajeExito('Datos actualizados con éxito')
      },
      error: (err) => {
        console.log(err);
      
      },
      complete: () => {
        console.log('Proceso de modificación completado');
      }
    });

  }
  // --------------------------------------------------------------
  ObtenerDatosUsuario(id_usuario:number){
    this.usuarioService.obtenerUsuarioDetalle(id_usuario).subscribe({
      next: (usuario:UsuarioModel) => {
        delete usuario.password
        this.dataUsuario = usuario;
        this.modificar_usuario=true
        console.log('Usuario encontrado:', usuario);
      },
      error: (err) => {
        if (err.status === 404) {
          console.error('El usuario no existe:', err);
          alert('El usuario no existe.');
        } else if (err.status === 500) {
          console.error('Error interno del servidor:', err);
          alert('Error interno del servidor. verifique la consola.');
        } else {
          console.error('Error desconocido:', err);
          alert('Ocurrió un error inesperado. Verifique el servidor.');
        }
      } ,
      complete: () => {
        console.log('Proceso de recuperacion usuario completado');
        this.ObtenerDatosPersona(this.dataUsuario.id_persona)
      }
          
    })
  }

  ObtenerDatosPersona(id_persona:number){
    this.personaService.ObtenerDatosPersona(id_persona).subscribe({
      next: (persona:PersonaModel) => {
        
        this.dataPersona = persona;
        this.modificar_usuario=true
        console.log('Persona encontrado:', persona);
      },
      error: (err) => {
        if (err.status === 404) {
          console.error('La persona no existe:', err);
          alert('La persona no existe.');
        } else if (err.status === 500) {
          console.error('Error interno del servidor:', err);
          alert('Error interno del servidor. verifique la consola.');
        } else {
          console.error('Error desconocido:', err);
          alert('Ocurrió un error inesperado. Verifique el servidor.');
        }
      } ,
      complete: () => {
        console.log('Proceso de recuperacion persona completado');
        this.titulo='Modificar Usuario'
        this.boton_text='Modificar'
      }
    })
  }
// ------------------------------------------------------------------

}
