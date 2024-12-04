import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';

import { PersonaModel } from '../../../../domain/models/Persona.model';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { FormsModule } from '@angular/forms';
import { UsuarioModel } from '../../../../domain/models/usuario.model';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';

import { SoloLetrasDirective } from '../../../directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../directives/solo-numeros.directive';
import { ErrorValidacion } from '../../../../domain/dto/ErrorValidacion.dto';
import { Validators } from '../../../../../../public/utils/validators';

@Component({
  selector: 'app-mod-usuario',
  standalone: true,
  imports: [NavegadorComponent, FormsModule, SoloLetrasDirective, SoloNumerosDirective],
  templateUrl: './mod-usuario.component.html',
  styleUrl: './mod-usuario.component.css'
})
export class ModUsuarioComponent implements OnInit {

  credenciales: UsuarioModel = {
    nombre_usuario: '',
    id_usuario: 0,
    id_persona: 0,
    rol: '',
  };


  dataPersona: PersonaModel = {
    id_persona: 0,
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: '',
  };

  constructor(private credencialesService: CredencialesService,
    private activateRoute: ActivatedRoute,
    private personaService: PersonaService,
    private sweetAlert: SweetAlert) { this.credenciales = this.credencialesService.credenciales }

  ngOnInit(): void {
    this.obtenerDatosPersona()
  }

  ValidarFormulario(dataPersona: PersonaModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];

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
      if (dataPersona.tipo_doc != "") {
        if (dataPersona.tipo_doc == 'DNI' && dataPersona.documento.length != 8) {
          errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 8 para el tipo de documento DNI' });
        }
        else if (dataPersona.tipo_doc == 'CE' && dataPersona.documento.length != 12) {
          errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 12 para el tipo de documento CE' });
        }
      }
      else {
        errorValidacion.push({ campo: 'Documento de identidad', mensaje: 'Seleccione el tipo de documento' });
      }
    }
    return errorValidacion;
  }

  obtenerDatosPersona() {
    console.log(this.credenciales.id_persona)
    this.personaService.ObtenerDatosPersona(this.credenciales.id_persona).subscribe({
      next: (res: PersonaModel) => {
        this.dataPersona = res
        console.log(res)
      },
      error: (err) => {
        console.error('Error al obtener persona', err);
      },
      complete: () => {
        console.log('Obtención de persona completada');
      }
    })
  }

  modificarDatosPersona() {
    const erroresValidacion = this.ValidarFormulario(this.dataPersona);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }
    this.personaService.ModificarPersona(this.credenciales.id_persona, this.dataPersona).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.error('Error al modificar persona', err);
      },
      complete: () => {
        console.log('Modificación de persona completada');
        this.sweetAlert.MensajeToast('Modificación exitosa')
      }
    })
  }
}
