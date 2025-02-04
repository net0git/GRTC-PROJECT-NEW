import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { DetalleEmpresaServicioResponse } from '../../../../../domain/dto/EmpresaServicioResponse.dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmpresaServicioService } from '../../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { ResolucionService } from '../../../../services/remoto/resolucion/resolucion.service';
import { ConductorService } from '../../../../services/remoto/conductor/conductor.service';
import { PersonaService } from '../../../../services/remoto/persona/persona.service';
import { ListaResolucionResponse } from '../../../../../domain/dto/ResolucionResponse.dto';
import { EliminarConductorMessageResponse, ListaConductoresResponse } from '../../../../../domain/dto/ConductorResponse.dto';
import { EliminarItinerarioMessageResponse, ListaItinerarioResponse } from '../../../../../domain/dto/ItinerarioResponse.dto';
import { EliminarArrendamientoMessageResponse, ListaArrendamientoResponse } from '../../../../../domain/dto/ArrendamientoResponse.dto';
import { ArrendamientoService } from '../../../../services/remoto/arrendamiento/arrendamiento.service';
import { ItinerarioService } from '../../../../services/remoto/itinerario/itinerario.service';
import { VehiculoService } from '../../../../services/remoto/vehiculo/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaVehiculosDetalleResponse, ModificarTucVehiculoAsociadoMessageResponse } from '../../../../../domain/dto/VehiculoResponse.dto';
import { HistorialVehicularService } from '../../../../services/remoto/historial-vehicular/historial-vehicular.service';
import { HistorialVehicularResponse } from '../../../../../domain/dto/HistorialVehicularResponse.dto';
import { Router } from '@angular/router'
import { EliminarPersonaMessageResponse } from '../../../../../domain/dto/PersonasResponse.dto';
import { SweetAlert } from '../../../../shared/animated-messages/sweetAlert';
import { ResolucionModel } from '../../../../../domain/models/Resolucion.model';
import { generatePDFreporte, ShowDocumentoPdfMarcado } from '../../../../../../../public/utils/pdfFunctions';
import { CredencialesService } from '../../../../services/local/credenciales/credenciales.service';
import { FormsModule } from '@angular/forms';
import { FechaConFormato_ddMMyyyy } from '../../../../../../../public/utils/formateDate';
import Swal from 'sweetalert2';
import { HistorialVehicularModel } from '../../../../../domain/models/HistorialVehicular.model';
import { TucService } from '../../../../services/remoto/tuc/tuc.service';
import { TUCModel } from '../../../../../domain/models/TUC.model';
import { CrearTUCMessageResponse, ModificarTUCResponse, TUCResponse } from '../../../../../domain/dto/TUCResponse.dto';

declare var bootstrap: any;


@Component({
  selector: 'app-detalle-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, FormsModule],
  templateUrl: './detalle-empresa-servicio.component.html',
  styleUrl: './detalle-empresa-servicio.component.css'
})
export class DetalleEmpresaServicioComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null = null;
  dataEmpresaDetalle: DetalleEmpresaServicioResponse = {
    id_empresa_servicio: 0,          // ID inicializado como 0
    id_tipo_servicio: 0,             // ID del tipo de servicio inicializado como 0
    tipo_servicio: '',               // Tipo de servicio inicializado como cadena vacía
    id_empres: 0,                    // ID de la empresa inicializado como 0
    razon_social: '',                // Razón social inicializada como cadena vacía
    ruc: '',                         // RUC inicializado como cadena vacía
    direccion: '',                   // Dirección inicializada como cadena vacía
    correo: '',                      // Correo inicializado como cadena vacía
    telefono: '',                    // Teléfono inicializado como cadena vacía
    distrito: '',                    // Distrito inicializado como cadena vacía
    provincia: '',                   // Provincia inicializada como cadena vacía
    departamento: '',                // Departamento inicializado como cadena vacía
    nota: '',                        // Nota inicializada como cadena vacía
    representante_legal: '',        // Representante legal inicializado como cadena vacía
    fecha_inicial: new Date(),       // Fecha inicializada con la fecha actual
    fecha_final: new Date(),         // Fecha final inicializada con la fecha actual
    expediente: '',                  // Expediente inicializado como cadena vacía
    estado: '',                      // Estado inicializado como cadena vacía
    porcentaje: 0                    // Porcentaje inicializado como 0
  };

  dataTuc: TUCModel = {
    id_tuc: 0,
    nro_impresion: 0,
    nro_tuc: 0, 
    placa: '', 
    razon_social: '', 
    anio_fabricacion: '', 
    marca: '',
    modalidad: '', 
    nro_part_reg: '', 
    nombre_resolucion: '', 
    condicion: '', 
    color: '', 
    nro_chasis: '', 
    nro_asientos: '', 
    carga: '', 
    peso: '', 
    fecha_exp: new Date(), 
    fecha_ven: new Date(), 
    ruta: '', 
    copia:''
  };

  private myModal: any;

  listaResoluciones: ListaResolucionResponse[] = [];
  listaConductores: ListaConductoresResponse[] = [];
  listaArrendamientos: ListaArrendamientoResponse[] = [];
  listaItinerarios: ListaItinerarioResponse[] = [];
  listaVehiculos: ListaVehiculosDetalleResponse[] = [];
  listaHistorialVehicular: HistorialVehicularResponse[] = [];

  resolucion: ResolucionModel = {
    id_resolucion: 0,
    anio_resolucion: '',
    descripcion: '',
    documento: '',
    fecha_resolucion: '',
    nombre_resolucion: '',
    nro_resolucion: null,
    tomo_resolucion: null
  };

  constructor(
    private tucService:TucService, 
    private credencialesService: CredencialesService, 
    private sweetAlert: SweetAlert, 
    private personaService: PersonaService, 
    private router: Router, 
    private historialVehicularService: HistorialVehicularService, 
    private vehiculoService: VehiculoService, 
    private itinerarioService: ItinerarioService, 
    private arrendamientoService: ArrendamientoService, 
    private conductorService: ConductorService, 
    private sanitizer: DomSanitizer, 
    private empresaServicioService: EmpresaServicioService, 
    private activatedRoute: ActivatedRoute, 
    private resolucionService: ResolucionService) { }

  ngOnInit(): void {
    this.detalleEmpresa();
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
  }

  //datos del collapse para la tabla de vehiculos----------------------------------------
  isExpanded: boolean[] = [];

  toggleCollapse(index: number) {
    // Cambiar el estado de la fila en el índice dado
    console.log(index)
    this.isExpanded[index] = !this.isExpanded[index];
  }
  //--------------------------------------------------------------------------------------

  detalleEmpresa() {
    const params = this.activatedRoute.snapshot.params
    this.empresaServicioService.DetalleEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (res: DetalleEmpresaServicioResponse) => {
        this.dataEmpresaDetalle = res;
        console.log(this.dataEmpresaDetalle);
      },
      error: (err) => {
        console.error('Error al obtener detalle de empresa:', err);
      },
      complete: () => {
        console.log('Detalle de empresa obtenido correctamente');
        this.listarResolucionesEmpresaServicio(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarConductores(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarArrendamientos(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarItinerarios(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarVehiculosPorEmpresaServicio(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarHistorialVehicular(this.dataEmpresaDetalle.id_empresa_servicio);
      }
    });
  }

  listarResolucionesEmpresaServicio(id_empresa_servicio: number) {
    this.resolucionService.ObternerResolucionesPorEmpresaServicio(id_empresa_servicio).subscribe({
      next: (data: ListaResolucionResponse[]) => {
        this.listaResoluciones = data;
        console.log('Resoluciones obtenidas:', data)

      },
      error: (err) => {
        console.error('Error al obtener resoluciones:', err);
      },
      complete: () => {
        console.log('Resoluciones obtenidas correctamente');
        // Filtrado de resoluciones que coincidan con la fecha_inicial
        const fechaInicial = this.dataEmpresaDetalle.fecha_inicial;
        const resolucionesFiltradas = this.listaResoluciones.filter(resolucion =>
          new Date(resolucion.fecha_resolucion).getTime() === new Date(fechaInicial).getTime()
        );
        console.log('Resolucion filtrada:', resolucionesFiltradas[0].id_resolucion);
        this.obternerResolucionById(resolucionesFiltradas[0].id_resolucion)
      }

    });

  }

  listarConductores(id_empresa_servicio: number) {
    this.conductorService.listarConductoresByEmpresaServicio(id_empresa_servicio).subscribe({
      next: (res: ListaConductoresResponse[]) => {
        this.listaConductores = res;
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

  listarArrendamientos(id_empresa_servicio: number) {
    this.arrendamientoService.ListarArrendamientoByEmpresaServicio(id_empresa_servicio).subscribe({
      next: (data: ListaArrendamientoResponse[]) => {
        this.listaArrendamientos = data;
        console.log(this.listaArrendamientos);
      },
      error: (err) => {
        console.error('Error al obtener arrendamientos:', err);
      },
      complete: () => {
        console.log('Arrendamientos obtenidos correctamente');
      }
    });
  }

  listarItinerarios(id_empresa_servicio: number) {
    this.itinerarioService.listarItinerarioByEmpresasServicio(id_empresa_servicio).subscribe({
      next: (data: ListaItinerarioResponse[]) => {
        this.listaItinerarios = data;
        console.log('Arrendamientos obtenidos correctamente', data);
      },
      error: (err) => {
        console.error('Error al obtener arrendamientos:', err);
      },
      complete: () => {
        console.log('Arrendamientos obtenidos correctamente');
      }
    });
  }

  listarVehiculosPorEmpresaServicio(id_empresa_servicio: number) {
    this.vehiculoService.ObeterDetalleVehiculosPorEmpresaServicio(id_empresa_servicio).subscribe({
      next: (data: ListaVehiculosDetalleResponse[]) => {
        this.listaVehiculos = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al obtener vehiculos:', err);
      },
      complete: () => {
        console.log('Vehiculos obtenidos correctamente');
      }
    });
  }

  listarHistorialVehicular(id_empresa_servicio: number) {
    this.historialVehicularService.ObtenerHistorialVehicularPorEmpresa(id_empresa_servicio).subscribe({
      next: (res: HistorialVehicularResponse[]) => {
        this.listaHistorialVehicular = res;
        console.log("historial vehicular" + this.listaHistorialVehicular);
      },
      error: (err) => {
        console.error('Error al obtener historial vehicular:', err);
      },
      complete: () => {
        console.log('historial vehicular obtenido correctamente');
      }
    });
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
        const params = this.activatedRoute.snapshot.params
        this.listarConductores(params['id_empresa_servicio'])
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

  eliminarElementoConductor(conductor: any) {
    this.sweetAlert.MensajeConfirmacionEliminar('Esta acción no se puede deshacer.')
      .then((confirmado) => {
        if (confirmado) {
          this.eliminarConductor(conductor)
        } else {
          console.log('Acción cancelada.');
        }
      });
  }

  eliminarItinerario(id_itinerario: number) {
    let eliminado = false
    this.itinerarioService.eliminarItinerario(id_itinerario).subscribe({
      next: (res: EliminarItinerarioMessageResponse) => {
        if (res.text !== 'error') {
          eliminado = true
        }
      },
      error: (err) => {
        console.error('Error al eliminar itinerario:', err);
      },
      complete: () => {
        if (eliminado) {
          this.sweetAlert.MensajeToast('Itinerario eliminado correctamente')
        } else {
          this.sweetAlert.MensajeError('No es posible eliminar un itinerario que esta activo')
        }
      }
    });
  }

  eliminarElementoItinerario(itinerario: any) {
    this.sweetAlert.MensajeConfirmacionEliminar('Esta acción no se puede deshacer.')
      .then((confirmado) => {
        if (confirmado) {
          this.eliminarItinerario(itinerario.id_detalle_ruta_itinerario)
        } else {
          console.log('Acción cancelada.');
        }
      });
  }

  eliminarElementoArrendamiento(arrendamiento: any) {

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
              this.sweetAlert.MensajeToast('Arrendamiento eliminado correctamente')
              this.listarArrendamientos(this.dataEmpresaDetalle.id_empresa_servicio)
            }
          });
        } else {
          console.log('Acción cancelada.');
        }
      });
  }

  modificarEmpresa() {
    const params = this.activatedRoute.snapshot.params
    this.router.navigate(['principal/mod-empresa-servicio/', params['id_empresa_servicio']]);
  }

  modificarConductores() {
    const params = this.activatedRoute.snapshot.params
    this.router.navigate(['principal/detalle-empresa-servicio/conductores/', params['id_empresa_servicio']]);
  }

  modificarArrendamiento() {
    const params = this.activatedRoute.snapshot.params
    this.router.navigate(['principal/detalle-empresa-servicio/arrendamiento/', params['id_empresa_servicio']]);
  }

  modificarItinerario() {
    const params = this.activatedRoute.snapshot.params
    this.router.navigate(['principal/detalle-empresa-servicio/itineario/', params['id_empresa_servicio']]);
  }

  modificarVehiculos() {
    const params = this.activatedRoute.snapshot.params
    this.router.navigate(['principal/detalle-empresa-servicio/vehiculos/', params['id_empresa_servicio']]);
  }

  obternerResolucionById(id_resolucion: number) {
    this.resolucionService.ObtenerResolucionById(id_resolucion).subscribe({
      next: (res: ResolucionModel) => {
        this.resolucion = res;
        console.log('Resolucion obtenida:', this.resolucion);

      },
      error: (err) => {
        console.error('Error al obtener resolucion:', err);
      },
      complete: () => {
        console.log('Resolucion obtenida correctamente');
        this.verDocumentoResolucion(this.resolucion.documento)
      }
    })
  }

  async verDocumentoResolucion(documento: string) {
    const nombre_usuario = this.credencialesService.credenciales.nombre_usuario;
    const fecha = FechaConFormato_ddMMyyyy(new Date());
    const mensaje = `ARCHIVO CENTRAL GRTCC - ${nombre_usuario} - ${fecha}`;
    this.pdfUrl = await ShowDocumentoPdfMarcado(documento, mensaje, this.sanitizer);
  }

  obtenerResolucionAutorizacion() {
    const fechaInicial = this.dataEmpresaDetalle.fecha_inicial;
    const resolucionesFiltradas = this.listaResoluciones.filter(resolucion =>
      new Date(resolucion.fecha_resolucion).getTime() === new Date(fechaInicial).getTime()
    );
    // console.log('Resolucion filtrada:', resolucionesFiltradas[0].id_resolucion);
    this.obternerResolucionById(resolucionesFiltradas[0].id_resolucion)

  }

  // -----------------------------------------------------------------------------------------------------------
  DarBajaVehiculo(vehiculo: any) {

    let htmltemp = ` <select id="mySelect" style='width: 80%;'> `;
    for (const resolucion of this.listaResoluciones) {
      htmltemp += `<option value="${resolucion.nombre_resolucion}">${resolucion.nombre_resolucion}</option>`;
    }
    htmltemp += '</select>';

    htmltemp += ` <div style="margin-top: 20px; text-align: left; padding-left: 45px;">
  <label class="form-check-label" for="flexCheckDefault">Otra Resolución:</label>
</div>
<input
  type="text"
  id="resolucion_referencia"
  name="resolucion_referencia"
  placeholder="Resolución de referencia"
  style="width: 80%;"
/>

<div style="margin-top: 10px; text-align: left; padding-left: 45px;">
  <label class="form-check-label" for="fecha_resolucion">Fecha de Resolución:</label>
</div>
<input
  type="date"
  id="fecha_resolucion"
  name="fecha_resolucion"
  style="width: 80%;"
/>
    `
      ;

    Swal.fire({
      title: 'estas seguro?',
      text: "si da de baja el vehiculo se desvinculara de la empresa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, dar de baja!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: formValues } = await Swal.fire({
          title: 'Bajo que Resolucion se dara de baja el Vehiculo',
          html: htmltemp,
          focusConfirm: false,
          preConfirm: () => {

            return [
              (<HTMLSelectElement>document.getElementById('mySelect')).value,
              (<HTMLSelectElement>document.getElementById('resolucion_referencia')).value,
              (<HTMLSelectElement>document.getElementById('fecha_resolucion')).value,
            ];
          }
        });

        if (formValues) {
          this.darBajaVehiculoEmpresa(vehiculo)
          this.GuardarEnHistrorialVehicular(vehiculo, formValues[0], formValues[1], formValues[2])
        }

      }
    })
  }

  GuardarEnHistrorialVehicular(vehiculo: ListaVehiculosDetalleResponse, resolucion: string, resolucion_resferencial: string, fecha_resolucion_temp: Date) {
    const params = this.activatedRoute.snapshot.params

    let dataHistorialVehicular: HistorialVehicularModel = {
      id_empresa_servicio: params['id_empresa_servicio'],
      condicion: 'BAJA',
      nombre_resolucion: resolucion,
      fecha_resolucion: new Date(fecha_resolucion_temp),
      ruta: vehiculo.itinerario,
      placa: vehiculo.placa,
      observaciones: ''
    }
    if (resolucion_resferencial == '' || resolucion_resferencial == null) {
      dataHistorialVehicular.nombre_resolucion = resolucion
      let fecha_resolucion = this.listaResoluciones.filter((res: { nombre_resolucion: string; }) => res.nombre_resolucion == resolucion);
      dataHistorialVehicular.fecha_resolucion = new Date(fecha_resolucion[0].fecha_resolucion)
    } else {
      dataHistorialVehicular.nombre_resolucion = resolucion_resferencial + ' (ref)'
    }

    this.historialVehicularService.CrearHistorialVehicular(dataHistorialVehicular).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Completado');
        this.listarHistorialVehicular(params['id_empresa_servicio'])
      }

    })

  }
  // -----------------------------------------------------------------------------------------------------------

  darBajaVehiculoEmpresa(vehiculo: any) {
    this.vehiculoService.DarBajaVehiculo(vehiculo.id_vehiculo).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("complete");
        this.listarVehiculosPorEmpresaServicio(this.dataEmpresaDetalle.id_empresa_servicio);
      }
    });
  }

  ObtenerTUCById(id_tuc:number){
    this.tucService.obtenerTUCbyId(id_tuc).subscribe({
      next:(res:TUCResponse)=>{
        this.dataTuc=res
        console.log(res)
      },
      error:(err)=>{
        console.error('Error al obtener TUC:',err);
      },
      complete:()=>{
        console.log('complete')
      }
    })
  }

  openModal(vehiculo: ListaVehiculosDetalleResponse) {

    if (vehiculo.id_tuc == null) {
      Swal.fire('No existe N° de TUC asignado')
    } else {

      this.ObtenerTUCById(vehiculo.id_tuc)
      this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
      this.myModal.show();
    }

  }

  closeModal() {
    this.myModal.hide();
  }

  generarReportePDF() {

    this.pdfUrl = generatePDFreporte(this.listaVehiculos, this.dataEmpresaDetalle, this.listaResoluciones, this.credencialesService.credenciales.nombre_usuario, this.sanitizer)

  }

  modificarTUCenVehiculo(id_tuc : number, id_vehiculo:number) {
    this.vehiculoService.ModificarTucVehiculo(id_tuc,id_vehiculo).subscribe({
      next:(res:ModificarTucVehiculoAsociadoMessageResponse)=>{
        console.log('vehiculo modificado tuc',res)
        const indice = this.listaVehiculos.findIndex(vehiculo => vehiculo.id_vehiculo === id_vehiculo);
        this.listaVehiculos[indice].id_tuc=id_tuc
      },
      error:(error:any)=>{
        console.log('error al modificar id_tuc en vehiculo'+error)
      },
      complete:()=>{
        console.log('Tuc Modificado en vechiculo');
      }
    })
  }

  crearTUC(vehiculo: ListaVehiculosDetalleResponse, nro_impresion:number, nro_tuc:number) {
    const bodyTuc: TUCModel = {
      nro_impresion: nro_impresion,
      nro_tuc: nro_tuc,
      placa: vehiculo.placa,
      razon_social: vehiculo.razon_social,
      anio_fabricacion: vehiculo.anio_fabricacion,
      marca: vehiculo.marca,
      modalidad: vehiculo.modalidad,
      nro_part_reg: vehiculo.nro_part_reg,
      nombre_resolucion: vehiculo.nombre_resolucion,
      condicion: vehiculo.estado,
      color: vehiculo.color,
      nro_chasis: vehiculo.nro_chasis,
      nro_asientos: vehiculo.nro_asientos,
      carga: vehiculo.carga,
      peso: vehiculo.peso,
      fecha_exp: new Date(vehiculo.fecha_inicial),
      fecha_ven: new Date(vehiculo.fecha_final),
      ruta: vehiculo.itinerario,
      copia: ''
    }

    this.tucService.crearTUC(bodyTuc).subscribe({
      next: (response: CrearTUCMessageResponse) => {
        console.log(response)
    
        this.modificarTUCenVehiculo(response.id_tuc,vehiculo.id_vehiculo)

      },
      error: (error) => {
        console.error('Error al crear tuc:', error);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

  modificarDuplicadosTUC() {
    const newDuplicadosTUC = this.dataTuc.copia;
    const id_tuc_temp = this.dataTuc.id_tuc;
  
    if (id_tuc_temp !== undefined) {
      this.tucService.modificarCopiaTUC(id_tuc_temp, newDuplicadosTUC).subscribe({
        next: (response: ModificarTUCResponse) => {
          console.log('Modificación exitosa', response.text);
        },
        error: (err) => {
          console.error('Error al modificar', err);
        },
        complete: () => {
          console.log('Modificación de TUC completa');
        }
      });
    } else {
      console.error('El id_tuc_temp es undefined');
    }
  }

  async CrearElementoTuc(vehiculo: ListaVehiculosDetalleResponse) {

    if (vehiculo.id_tuc == null) {
      const { value: formValues } = await Swal.fire({
        title: 'Generar TUC',
        html:
          '<input id="swal-input1" class="swal2-input"  placeholder="N° de impresion">' +
          '<input id="swal-input2" class="swal2-input" placeholder="N° de TUC">',
        focusConfirm: false,
        preConfirm: () => {
          return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value]

        }
      });

      if (formValues[0] == '' || formValues[1] == '') {
        Swal.fire(
          'Campos icompletos, intente de nuevo'
        )
      }
      else {
        //PROCEDIMIENTO DE CREACION DE TUC
         this.crearTUC(vehiculo, formValues[0], formValues[1])
      }
    }
    else {
      Swal.fire({
        title: 'Ya existe una TUC asignado a este vehiculo',
        text: "Deseas generar una nueva TUC para la placa: " + vehiculo.placa,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Generar TUC!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: formValues } = await Swal.fire({
            title: 'Generar TUC',
            html:
              '<input id="swal-input1" class="swal2-input"  placeholder="N° de impresion">' +
              '<input id="swal-input2" class="swal2-input" placeholder="N° de TUC">',
            focusConfirm: false,
            preConfirm: () => {
              return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
              (<HTMLInputElement>document.getElementById('swal-input2')).value]

            }
          });

          // Swal.fire(JSON.stringify(formValues));
          if (formValues[0] == '' || formValues[1] == '') {
            Swal.fire(
              'Campos icompletos, intente de nuevo'
            )
          }
          else {

            //PROCEDIMIENTO DE CREACION DE TUC
            console.log(formValues[0] + '  ' + formValues[1] + ' ' + vehiculo.id_vehiculo)
            this.crearTUC(vehiculo, formValues[0], formValues[1])
          }

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)


            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Creacion en Progresa'
          })
        }
      })
    }


  }
  // -----------------------------------------------------------------------------------------

  editarResolucion(id_resolucion: number) {
    this.router.navigate(['principal/mod-empresa-servicio-resolucion/' + this.dataEmpresaDetalle.id_empresa_servicio + '/' + id_resolucion]);
  }

  agregarResolucion() {
    this.router.navigate(['principal/mod-empresa-servicio-resolucion/' + this.dataEmpresaDetalle.id_empresa_servicio]);
  }

}
