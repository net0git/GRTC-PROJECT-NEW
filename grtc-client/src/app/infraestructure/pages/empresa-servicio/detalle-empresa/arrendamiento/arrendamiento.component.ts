import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { ListaArrendamientoResponse, CrearArrendamientoMessageResponse, ModificarArrendamientoMessageResponse, EliminarArrendamientoMessageResponse} from '../../../../../domain/dto/ArrendamientoResponse.dto';
import { ArrendamientoModel } from '../../../../../domain/models/Arrendamiento.model';
import { ArrendamientoService } from '../../../../services/remoto/arrendamiento/arrendamiento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert } from '../../../../shared/animated-messages/sweetAlert';
import { UbigeoService } from '../../../../services/local/ubigeo/ubigeo.service';
import { FechaConFormato } from '../../../../../../../public/utils/formateDate';
import { SoloLetrasDirective } from '../../../../directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../../directives/solo-numeros.directive';
import { ErrorValidacion } from '../../../../../domain/dto/ErrorValidacion.dto';




@Component({
  selector: 'app-arrendamiento',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, SoloLetrasDirective, SoloNumerosDirective, CommonModule, FormsModule],
  templateUrl: './arrendamiento.component.html',
  styleUrl: './arrendamiento.component.css'
})
export class ArrendamientoComponent implements OnInit {
  listaContratosArrendamiento: ListaArrendamientoResponse[] = [];
  id_empresa_servicio_temp: string = "";

  dataArrendamiento: ArrendamientoModel = {
    id_contrato: 0,
    id_empresa_servicio: 0,
    direccion: '',
    arrendador: '',
    dni: '',
    fecha_fin: '',
    fecha_inicio: '',
    propiedad: '',
    departamento: '',
    provincia: '',
    distrito: '',
  }

  departamentos: string[] = []
  provincias: string[] = []
  distritos: string[] = []

  modificar: boolean = false

  constructor(private ubigeoService: UbigeoService, private sweetAlert: SweetAlert, private router: Router, private arrendamientoService: ArrendamientoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarArrendamientos()
    this.ListaDepartamentos()
  }
  // ubigeo----------------------------------------------------------------
  ListaDepartamentos() {
    this.departamentos = this.ubigeoService.getDepartamentos()
    console.log('departamentos', this.departamentos)
  }

  onChangeDepartamento() {
    this.provincias = this.ubigeoService.getProvinciasPorDepartamento(this.dataArrendamiento.departamento)
    console.log('provincias', this.provincias)
  }

  onChangeProvincia() {
    this.distritos = this.ubigeoService.getDistritosPorProvincia(this.dataArrendamiento.provincia)
  }
  // -----------------------------------------------------------------------

  ValidarFormulario(dataArrendamiento: ArrendamientoModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];

    if (!dataArrendamiento.arrendador) {
      errorValidacion.push({ campo: 'datos del arrendador', mensaje: 'Campo requerido' });
    }
    if (!dataArrendamiento.dni) {
      errorValidacion.push({ campo: 'dni', mensaje: 'campo requerido' });
    }
    if (!dataArrendamiento.propiedad) {
      errorValidacion.push({ campo: 'nombre de la propiedad', mensaje: 'Campo requerido' });
    }
    if (!dataArrendamiento.departamento) {
      errorValidacion.push({ campo: 'departamento', mensaje: 'Campo requerido' });
    }
    if (!dataArrendamiento.provincia) {
      errorValidacion.push({ campo: 'provincia', mensaje: 'Campo requerido' });
    }
    if (!dataArrendamiento.distrito) {
      errorValidacion.push({ campo: 'distrito', mensaje: 'Campo requerido' });
    }
    if (!dataArrendamiento.fecha_inicio) {
      errorValidacion.push({ campo: 'fecha inicio', mensaje: 'Campo requerido' });
    }
    
    return errorValidacion;
  }

  listarArrendamientos() {
    const params = this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.arrendamientoService.ListarArrendamientoByEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data: ListaArrendamientoResponse[]) => {
        this.listaContratosArrendamiento = data;
        console.log(this.listaContratosArrendamiento)
      },
      error: (err) => {
        console.error('Error al obtener arrendamientos:', err);
      },
      complete: () => {
        console.log('Arrendamientos obtenidos correctamente');
      }
    });
  }

  crearArrendamiento() {
    const params = this.activatedRoute.snapshot.params;
    this.dataArrendamiento.id_empresa_servicio = params['id_empresa_servicio']
    this.arrendamientoService.crearArrendamiento(this.dataArrendamiento).subscribe({
      next: (data: CrearArrendamientoMessageResponse) => {
        console.log(data)
      },
      error: (err) => {
        console.error('Error al obtener arrendamientos:', err);
      },
      complete: () => {
        console.log('Arrendamientos obtenidos correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Arrendamiento creado correctamente')
        this.listarArrendamientos()
      }
    });
  }

  modificarArrendamiento() {
      
    this.arrendamientoService.modificarArrendamiento(this.dataArrendamiento.id_contrato,this.dataArrendamiento).subscribe({
      next: (data: ModificarArrendamientoMessageResponse) => {
        console.log(data)
      },
      error: (err) => {
        console.error('Error al obtener arrendamientos:', err);
      },
      complete: () => {
        console.log('Arrendamientos obtenidos correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Arrendamiento modificado correctamente')
        this.listarArrendamientos()
      }
    });
  }

  GuardarDatosFormulario() {
    const erroresValidacion = this.ValidarFormulario(this.dataArrendamiento);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }
    if (this.modificar) {
      this.modificarArrendamiento()
    } else {
      this.crearArrendamiento()
    }

  }

  obtenerArrendamiento(arrendamiento: any) {

    this.dataArrendamiento.id_contrato = arrendamiento.id_contrato
    this.dataArrendamiento.id_empresa_servicio = arrendamiento.id_empresa_servicio
    this.dataArrendamiento.direccion = arrendamiento.direccion
    this.dataArrendamiento.arrendador = arrendamiento.arrendador
    this.dataArrendamiento.dni = arrendamiento.dni
    this.dataArrendamiento.fecha_fin = FechaConFormato(arrendamiento.fecha_fin)
    this.dataArrendamiento.fecha_inicio = FechaConFormato(arrendamiento.fecha_inicio)
    this.dataArrendamiento.propiedad = arrendamiento.propiedad
    this.dataArrendamiento.departamento = arrendamiento.departamento
    this.dataArrendamiento.provincia = arrendamiento.provincia
    this.dataArrendamiento.distrito = arrendamiento.distrito
    this.onChangeDepartamento();
    this.onChangeProvincia();
    this.modificar = true;
  }

  eliminarArrendamiento(arrendamiento: any) {

    this.sweetAlert.MensajeConfirmacionEliminar('Esta acción no se puede deshacer.')
      .then((confirmado) => {
        if (confirmado) {
          this.arrendamientoService.eliminarArrendamiento(arrendamiento.id_contrato).subscribe({
            next: (res: EliminarArrendamientoMessageResponse) => {
              console.log(res)
            },
            error: (err) => {
              console.error('Error al eliminar arrendamiento:', err);
            },
            complete: () => {
              console.log('Arrendamiento eliminado correctamente');
              this.limpiar()
              this.sweetAlert.MensajeToast('Arrendamiento eliminado correctamente')
              this.listarArrendamientos()
            }
          });
        } else {
          console.log('Acción cancelada.');
        }
      });
  } 

  limpiar() {
    this.dataArrendamiento.id_contrato = 0
    this.dataArrendamiento.id_empresa_servicio = 0
    this.dataArrendamiento.direccion = ""
    this.dataArrendamiento.arrendador = ""
    this.dataArrendamiento.dni = ""
    this.dataArrendamiento.fecha_fin = ""
    this.dataArrendamiento.fecha_inicio = ""
    this.dataArrendamiento.propiedad = ""
    this.dataArrendamiento.departamento = ""
    this.dataArrendamiento.provincia = ""
    this.dataArrendamiento.distrito = ""
    this.modificar = false;
  }


}
