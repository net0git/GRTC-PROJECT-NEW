import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { CrearConductorMessageResponse, ListaConductoresResponse, ModificarConductorMessageResponse, EliminarConductorMessageResponse } from '../../../../../domain/dto/ConductorResponse.dto';
import { ConductorModel } from '../../../../../domain/models/Conductor.model';
import { ConductorService } from '../../../../services/remoto/conductor/conductor.service';
import { PersonaModel } from '../../../../../domain/models/Persona.model';
import { CrearPersonaMessageResponse, EliminarPersonaMessageResponse } from '../../../../../domain/dto/PersonasResponse.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../../../services/remoto/persona/persona.service';
import { ErrorValidacion } from '../../../../../domain/dto/ErrorValidacion.dto';
import { Validators } from '../../../../../../../public/utils/validators';
import { SweetAlert } from '../../../../shared/animated-messages/sweetAlert';
import { SoloLetrasDirective } from '../../../../directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../../directives/solo-numeros.directive';


@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, FormsModule, CommonModule, SoloLetrasDirective, SoloNumerosDirective],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent implements OnInit {

  dataPersona: PersonaModel = {
    id_persona: 0,
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: ''
  };

  dataConductor: ConductorModel = {
    id_conductor: 0,
    id_persona: 0,
    nro_licencia: '',
    categoria: '',
    id_empresa_servicio: 0,
  }

  listaConductores: ListaConductoresResponse[] = [];
  id_empresa_servicio_temp: string = "";
  modificar: boolean = false;



  constructor(private activatedRoute: ActivatedRoute, private conductorService: ConductorService, private personaService: PersonaService, private sweetAlert: SweetAlert) { }

  ngOnInit(): void {
    this.ListarConductores()
  }
  GuardarDatosFormulario() {
    this.GuardarPersonaEnBD()
  }

  ListarConductores() {
    const params = this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.conductorService.listarConductoresByEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data: ListaConductoresResponse[]) => {
        this.listaConductores = data

        console.log(this.listaConductores)
      },
      error: (err) => {
        console.error('Error al obtener conductores:', err);
      },
      complete: () => {
        console.log('Conductores obtenidos correctamente');
      }
    });
  }

  ValidarFormulario(dataPersona: PersonaModel, dataConductor: ConductorModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];

    if (!dataPersona.nombres) {
      errorValidacion.push({ campo: 'nombre(s)', mensaje: 'Campo requerido' });
    }
    if (!dataPersona.ap_paterno) {
      errorValidacion.push({ campo: 'apellido paterno', mensaje: 'Campo requerido' });
    }
    if (!dataPersona.ap_materno) {
      errorValidacion.push({ campo: 'apellido materno', mensaje: 'Campo requerido' });
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
    if (!dataConductor.categoria) {
      errorValidacion.push({ campo: 'categoria', mensaje: 'campo requerido' });

    }
    return errorValidacion;
  }

  GuardarConductorEnBD(id_persona: number) {
    const params = this.activatedRoute.snapshot.params;
    this.dataConductor.id_persona = id_persona
    this.dataConductor.id_empresa_servicio = params['id_empresa_servicio']

    if (this.modificar) {
      this.conductorService.modificarConductor(this.dataConductor.id_conductor, this.dataConductor).subscribe({
        next: (data: ModificarConductorMessageResponse) => {
          console.log(data)
        },
        error: (err) => {
          console.error('Error al obtener conductores:', err);
        },
        complete: () => {
          console.log('Conductores obtenidos correctamente');
          this.limpiar()
          this.sweetAlert.MensajeToast('Modificación exitosa')
          this.ListarConductores()
        }
      });
    } else {
      this.conductorService.CrearConductor(this.dataConductor).subscribe({
        next: (data: CrearConductorMessageResponse) => {
          console.log(data)
        },
        error: (err) => {
          console.error('Error al obtener conductores:', err);
        },
        complete: () => {
          console.log('Conductores obtenidos correctamente');
          this.limpiar()
          this.sweetAlert.MensajeToast('Creación exitosa')
          this.ListarConductores()
        }
      });
    }

  }

  GuardarPersonaEnBD() {
    let id_persona = 0
    const erroresValidacion = this.ValidarFormulario(this.dataPersona, this.dataConductor);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }
    if (this.modificar) {
      console.log(this.dataPersona)
      this.personaService.ModificarPersona(this.dataPersona.id_persona, this.dataPersona).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.error('Error al modificar persona', err);
        },
        complete: () => {
          console.log('Modificación de persona completada');
          this.GuardarConductorEnBD(this.dataPersona.id_persona)
        }
      })
    } else {
      this.personaService.CrearPersona(this.dataPersona).subscribe({
        next: (data: CrearPersonaMessageResponse) => {
          console.log(data)
          id_persona = data.id_persona
        },
        error: (err) => {
          console.error('Error al obtener persona:', err);
        },
        complete: () => {
          console.log('Persona obtenida correctamente');
          this.GuardarConductorEnBD(id_persona)

        }
      });
    }

  }

  eliminarPersona(id_persona: number) {
    this.personaService.eliminarPersona(id_persona).subscribe({
      next: (res: EliminarPersonaMessageResponse) => {
        console.log(res)
      },
      error: (err) => {
        console.error('Error al eliminar persona:', err);
      },
      complete: () => {
        console.log('Persona eliminada correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Conductor eliminado correctamente')
        this.ListarConductores()
      }
    });
  }

  eliminarConductor(conductor: any) {
    this.conductorService.eliminarConductor(conductor.id_conductor).subscribe({
      next: (res: EliminarConductorMessageResponse) => {
        console.log(res)
      },
      error: (err) => {
        console.error('Error al eliminar conductor:', err);
      },
      complete: () => {
        console.log('Conductor eliminado correctamente');
        this.eliminarPersona(conductor.id_persona)
      }
    });
  }

  eliminarElemento(conductor: any) {
    this.sweetAlert.MensajeConfirmacionEliminar('Esta acción no se puede deshacer.')
      .then((confirmado) => {
        if (confirmado) {
          this.eliminarConductor(conductor)
        } else {
          console.log('Acción cancelada.');
        }
      });
  }

  obtenerConductor(dataConductor: any) {

    this.dataPersona.id_persona = dataConductor.id_persona
    this.dataPersona.nombres = dataConductor.nombres
    this.dataPersona.ap_paterno = dataConductor.ap_paterno
    this.dataPersona.ap_materno = dataConductor.ap_materno
    this.dataPersona.tipo_doc = dataConductor.tipo_doc
    this.dataPersona.documento = dataConductor.documento
    this.dataPersona.telefono = dataConductor.telefono
    this.dataPersona.correo = dataConductor.correo

    this.dataConductor.id_conductor = dataConductor.id_conductor
    this.dataConductor.nro_licencia = dataConductor.nro_licencia
    this.dataConductor.categoria = dataConductor.categoria
    this.dataConductor.id_persona = dataConductor.id_persona

    this.modificar = true
  }

  limpiar() {
    this.dataPersona.id_persona = 0
    this.dataPersona.nombres = ""
    this.dataPersona.ap_paterno = ""
    this.dataPersona.ap_materno = ""
    this.dataPersona.tipo_doc = ""
    this.dataPersona.documento = ""
    this.dataPersona.telefono = ""
    this.dataPersona.correo = ""

    this.dataConductor.id_conductor = 0
    this.dataConductor.nro_licencia = ""
    this.dataConductor.categoria = ""
    this.dataConductor.id_persona = 0

    this.modificar = false
  }

  // nota: la idea general de este codigo es que primero se crea la persona y con el id_persona se crea el conductor
  // del mismo modo se elimina primero al conductor y luego a al persona 
}
