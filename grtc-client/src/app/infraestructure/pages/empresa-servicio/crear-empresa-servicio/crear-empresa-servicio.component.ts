import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { UbigeoService } from '../../../services/local/ubigeo/ubigeo.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaServicioModel } from '../../../../domain/models/EmpresaServicio.model';
import { EmpresaModel } from '../../../../domain/models/Empresa.model';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { ResolucionModel } from '../../../../domain/models/Resolucion.model';
import { ItinerarioModel } from '../../../../domain/models/Itinerario.model';
import { CrearItinerarioMessageResponse, ListaItinerarioResponse } from '../../../../domain/dto/ItinerarioResponse.dto';
import { ListarMarcasResponse } from '../../../../domain/dto/MarcaResponse.dto';
import { ListarModelosResponse } from '../../../../domain/dto/ModeloResponse.dto';
import { ConductorModel } from '../../../../domain/models/Conductor.model';
import { VehiculoModel } from '../../../../domain/models/Vehiculo.model';
import { FormsModule } from '@angular/forms';
import { fileToBase64 } from '../../../../../../public/utils/pdfFunctions';
import { ArrendamientoModel } from '../../../../domain/models/Arrendamiento.model';
import { CrearArrendamientoMessageResponse, ListaArrendamientoResponse } from '../../../../domain/dto/ArrendamientoResponse.dto';
import { VehiculoService } from '../../../services/remoto/vehiculo/vehiculo.service';
import { ListaVehiculosResponse } from '../../../../domain/dto/VehiculoResponse.dto';
import { CrearEmpresaMessageResponse, EmpresaResponse } from '../../../../domain/dto/EmpresaResponse.dto';
import { EmpresaService } from '../../../services/remoto/empresa/empresa.service';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';
import { crearEmpresaServicioResponse, EmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { SoloNumerosGuionDirective } from '../../../directives/solo-numeros-guion.directive';
import { SoloNumerosDirective } from '../../../directives/solo-numeros.directive';
import { SoloLetrasDirective } from '../../../directives/solo-letras.directive';
import { SoloLetrasGuionDirective } from '../../../directives/solo-letras-guion.directive';
import { crear_empresa_servicio_empresa_vf, crear_empresa_servicio_vehiculo_vf, crear_empresa_servicio_representante_vf, crear_empresa_servicio_resolucion_vf, crear_empresa_servicio_itinerario_vf, crear_empresa_servicio_arrendamiento_vf, crear_empresa_servicio_conductor_vf } from '../../../../infraestructure/validatorForm/empresaServicio.validator';
import { lastValueFrom } from 'rxjs';
import { CrearPersonaMessageResponse } from '../../../../domain/dto/PersonasResponse.dto';
import { CrearResolucionEmpresaServicioMessageResponse, CrearResolucionMessageResponse, VerificarResolucionByNombreResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { ResolucionService } from '../../../services/remoto/resolucion/resolucion.service';
import { ResolucionEmpresaModel } from '../../../../domain/models/ResolucionEmpresa.model';
import { ItinerarioService } from '../../../services/remoto/itinerario/itinerario.service';
import { ArrendamientoService } from '../../../services/remoto/arrendamiento/arrendamiento.service';
import { ConductorService } from '../../../services/remoto/conductor/conductor.service';
import { HistorialVehicularModel } from '../../../../domain/models/HistorialVehicular.model';
import { HistorialVehicularService } from '../../../services/remoto/historial-vehicular/historial-vehicular.service';
import { CrearHistorialVehicularMessageResponse } from '../../../../domain/dto/HistorialVehicularResponse.dto';
import { RegistroMarcaModeloComponent } from '../../../components/registro-marca-modelo/registro-marca-modelo.component';
import { CrearConductorMessageResponse, ListaConductoresResponse } from '../../../../domain/dto/ConductorResponse.dto';
import Swal from 'sweetalert2';
import { FechaConFormato_ddMMyyyy } from '../../../../../../public/utils/formateDate';


declare var bootstrap: any;

@Component({
  selector: 'app-crear-empresa-servicio',
  standalone: true,
  imports: [
      CommonModule, 
      FormsModule, 
      NavegadorComponent, 
      SubnavegadorComponent, 
      ProgressBarComponent, 
      SoloNumerosGuionDirective, 
      SoloNumerosDirective, 
      SoloLetrasDirective, 
      SoloLetrasGuionDirective, 
      RegistroMarcaModeloComponent],
  templateUrl: './crear-empresa-servicio.component.html',
  styleUrl: './crear-empresa-servicio.component.css'
})
export class CrearEmpresaServicioComponent implements OnInit {

  private myModal: any;
  currentStep: number = 1;
  progressValue = ((1) / 7) * 100;
  pdfUrl: SafeResourceUrl | null = null;
  lista_itinerarios: ListaItinerarioResponse[] = [];
  lista_marcas: ListarMarcasResponse[] = [];
  lista_modelos: ListarModelosResponse[] = [];
  lista_conductores: ListaConductoresResponse[] = [];
  lista_vehiculos: ListaVehiculosResponse[] = [];
  lista_contratos_arrendamientos: ListaArrendamientoResponse[] = [];
  

  departamentos: string[] = []
  provincias: string[] = []
  distritos: string[] = []

  idMarcaSeleccionada: number = 0;
  idModeloSeleccionado: number = 0;

  desabilitarFormEmpresa = true
  deshabilitarCampoTipoEmpresa = false
  deshabilitarCampoRuc = false
  deshabilitarCampofechaInicio = true
  deshabilitarCampoExpediente = true
  deshabilitarFormRepresentante = true
  deshabilitarFormVehiculo = true
  desabilitarButtonCrearEmpresa = false
  deshabilitarFormResolucion = true

  dataPersonaRepresentante: PersonaModel = {
    id_persona: 0,
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: ''
  }

  dataEmpresa: EmpresaModel = {
    id_empresa: 0,
    id_representante_legal: 0,
    razon_social: '',
    ruc: '',
    direccion: '',
    correo: '',
    telefono: '',
    distrito: '',
    provincia: '',
    departamento: '',
    nota: '',
  }

  dataEmpresaServicio: EmpresaServicioModel = {
    id_empresa_servicio: 0,
    id_tipo_servicio: 0,
    id_empresa: 0,
    fecha_inicial: '',
    fecha_final: '',
    expediente: '',
  }

  dataResolucion: ResolucionModel = {
    id_resolucion: 0,
    anio_resolucion: '',
    descripcion: 'AUTORIZACIÓN',
    documento: '',
    fecha_resolucion: '',
    nombre_resolucion: '',
    nro_resolucion: null,
    tomo_resolucion: null,
  }

  dataItinerario: ItinerarioModel = {
    id_detalle_ruta_itinerario: 0,
    id_empresa_servicio: 0,
    origen: '',
    destino: '',
    itinerario: '',
    frecuencia: ''
  }

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

  dataConductor: ConductorModel = {
    id_conductor: 0,
    id_persona: 0,
    nro_licencia: '',
    categoria: '',
    id_empresa_servicio: 0,
  }

  dataPersonaConductor: PersonaModel = {
    id_persona: 0,
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: ''
  }

  dataVehiculo: VehiculoModel = {

    id_vehiculo: 0,
    placa: "",
    nro_part_reg: "",
    modalidad: "",
    estado: "",

    carga: '',
    peso: '',
    categoria: "",
    anio_fabricacion: "",
    color: "",
    nro_chasis: "",
    nro_asientos: "",
    marca: "",
    modelo: "",
    serie: "",
    carroceria: "",

    id_empresa_servicio: 0,
    id_detalle_ruta_itinerario: 0,
    id_resolucion: 0,

  }

  constructor(
    private vehiculoService: VehiculoService,
    private empresaService: EmpresaService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private ubigeoService: UbigeoService,
    private sweetAlert: SweetAlert,
    private empresaServicioService: EmpresaServicioService,
    private personaService: PersonaService,
    private resolucionService: ResolucionService,
    private itinerarioService: ItinerarioService,
    private arrendamientoService: ArrendamientoService,
    private conductorService: ConductorService,
    private historialVehicularService: HistorialVehicularService) { }
  ngOnInit(): void {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    this.ListaDepartamentosEmpresa()
    this.ListaDepartamentosArrendamiento()
    this.listarMarcas()
  }



  openModal() {
    this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }
  // -----------------------------------------------------------------------------------------------------------
  nextStep(): void {
    this.currentStep++;
    this.progressValue = ((this.currentStep) / 7) * 100; // 3 es el número total de pasos
  }
  prevStep(): void {
    this.currentStep--;
    this.progressValue = ((this.currentStep) / 7) * 100; // 3 es el número total de pasos
  }
  // -----------------------------------------------------------------------------------------------------------

  // ubigeo Empresa ---------------------------------------------------------------------------------
  ListaDepartamentosEmpresa() {
    this.departamentos = this.ubigeoService.getDepartamentos()
    console.log('departamentos', this.departamentos)
  }

  onChangeDepartamentoEmpresa() {
    this.provincias = this.ubigeoService.getProvinciasPorDepartamento(this.dataEmpresa.departamento)
    console.log('provincias', this.provincias)
  }

  onChangeProvinciaEmpresa() {
    this.distritos = this.ubigeoService.getDistritosPorProvincia(this.dataEmpresa.provincia)
  }
  // -----------------------------------------------------------------------------------------------------------
  // ubigeo Arrendamiento----------------------------------------------------------------
  ListaDepartamentosArrendamiento() {
    this.departamentos = this.ubigeoService.getDepartamentos()
    console.log('departamentos', this.departamentos)
  }

  onChangeDepartamentoArrendamiento() {
    this.provincias = this.ubigeoService.getProvinciasPorDepartamento(this.dataArrendamiento.departamento)
    console.log('provincias', this.provincias)
  }

  onChangeProvinciaArrendamiento() {
    this.distritos = this.ubigeoService.getDistritosPorProvincia(this.dataArrendamiento.provincia)
  }
  // -----------------------------------------------------------------------
  listarMarcas() {
    this.vehiculoService.ListarMarcas().subscribe({
      next: (data: ListarMarcasResponse[]) => {
        this.lista_marcas = data
      },
      error: (err) => {
        console.error('Error al obtener marcas:', err);
      }
    })
  }
  async listarModelos(id_marca: number): Promise<void> {
    return lastValueFrom(this.vehiculoService.ObtenerModelosPorMarca(id_marca)).then((data: ListarModelosResponse[]) => {
      this.lista_modelos = data;
    }).catch(err => {
      console.error('Error al obtener modelos:', err);
    });
  }
  onMarcaSeleccionada() {
    console.log(this.idMarcaSeleccionada)
    this.listarModelos(this.idMarcaSeleccionada)
    this.dataVehiculo.marca = this.lista_marcas.find(x => x.id_marca == this.idMarcaSeleccionada)?.nombre_marca || '';
  }
  onModeloSeleccionado() {
    console.log(this.idModeloSeleccionado)
    this.dataVehiculo.modelo = this.lista_modelos.find(x => x.id_modelo == this.idModeloSeleccionado)?.nombre_modelo || '';
  }
  // -----------------------------------------------------------------------------------------------------------
  // VALIDACION DE DATOS FORMULARIO
  validarDatosFormularioEmpresa() {
    const erroresValidacion = crear_empresa_servicio_empresa_vf(this.dataEmpresa, this.dataEmpresaServicio);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
    } else {
      this.dataResolucion.fecha_resolucion = this.dataEmpresaServicio.fecha_inicial
      this.nextStep()
    }

  }

  validarDatosFormularioRepresentanteLegal() {
    const erroresValidacion = crear_empresa_servicio_representante_vf(this.dataPersonaRepresentante);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
      console.log(errorMensaje)
    } else {
      this.nextStep()
    }
  }

  buscarResolucionPorNombre(){
    this.resolucionService.VerificarResolucionByNombre(this.dataResolucion.nombre_resolucion).subscribe({
      next:(res:VerificarResolucionByNombreResponse)=>{
        if(res.existe){
          alert('La resolucion ya existe')
        }
        else{ 
          this.deshabilitarFormResolucion=false
        }
      },
      error:(err)=>{
        console.error('Error al buscar resolucion por nombre:',err)
      },
      complete:()=>{  
        console.log('Proceso de busqueda de resolucion por nombre completado')
      }
     })
  }

  ReiniciarFormularioResolucion(){
    this.dataResolucion.nombre_resolucion='',
    this.dataResolucion.anio_resolucion='',
    this.dataResolucion.tomo_resolucion=null,
    this.dataResolucion.fecha_resolucion='',
    this.dataResolucion.descripcion='AUTORIZACIÓN'
    this.deshabilitarFormResolucion=true
  }

  validarDatosFormularioResolucion() {
    const erroresValidacion = crear_empresa_servicio_resolucion_vf(this.dataResolucion);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
      console.log(errorMensaje)
    } else {
      this.nextStep()
    }


  }

  validarDatosFormularioItinerario() {
    const erroresValidacion = crear_empresa_servicio_itinerario_vf(this.dataItinerario)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
      console.log(errorMensaje)
    } else {
      this.enviarDatosListaItinearios()
    }
  }

  validarDatosFormularioArrendamiento() {
    const erroresValidacion = crear_empresa_servicio_arrendamiento_vf(this.dataArrendamiento)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
      console.log(errorMensaje)
    } else {
      this.enviarDatosListaArrendamiento()
    }
  }

  validarDatosListaConductores() {
    const erroresValidacion = crear_empresa_servicio_conductor_vf(this.dataPersonaConductor, this.dataConductor);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
      console.log(errorMensaje)
    } else {
      this.inviarDatosListaConductores()
    }
  }
  // -----------------------------------------------------------------------------------------------------------

  // MANEJO DE ITINARARIOS
  itinerarioNextStep() {
    if(this.dataEmpresaServicio.id_tipo_servicio==2){
      this.nextStep()
      this.nextStep()
      return
    }
    if (this.lista_itinerarios.length > 0) {
      this.nextStep()
    } else {
      alert('debes registrar por lo menos una ruta a la empresa')
    }
  }

  enviarDatosListaItinearios() {
    this.lista_itinerarios.push(this.dataItinerario)
    this.limpiarFormularioItinerario()
  }

  eliminarElementoItinerario(index: number) {
    this.lista_itinerarios.splice(index, 1);
  }

  limpiarFormularioItinerario() {
    this.dataItinerario = {
      id_detalle_ruta_itinerario: 0,
      id_empresa_servicio: 0,
      origen: '',
      destino: '',
      itinerario: '',
      frecuencia: ''
    }
  }
  // -----------------------------------------------------------------------------------------------------------
  // MANEJO DE ARRENDAMIENTOS
  arrendamientoNextStep() {
    if (this.lista_contratos_arrendamientos.length > 0) {
      this.nextStep()
    } else {
      alert('debes registrar por lo menos un contrato de arrendamiento')
    }
  }

  enviarDatosListaArrendamiento() {
    this.lista_contratos_arrendamientos.push(this.dataArrendamiento)
    this.limpiarFormularioArrendamiento()
  }

  eliminarElementoArrendamiento(index: number) {
    this.lista_contratos_arrendamientos.splice(index, 1)
  }

  limpiarFormularioArrendamiento() {
    this.dataArrendamiento = {
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
  }
  // -----------------------------------------------------------------------------------------------------------
  // MANEJO DE CONDUCTORES
  conductorNextStep() {
    if (this.lista_conductores.length > 0) {
      this.nextStep()
    } else {
      alert('debes registrar por lo menos un conductor')
    }
  }
  inviarDatosListaConductores() {
    const dataBodyConductor: ListaConductoresResponse = {
      id_conductor: 0,
      id_persona: 0,
      categoria: this.dataConductor.categoria,
      nombres: this.dataPersonaConductor.nombres,
      ap_paterno: this.dataPersonaConductor.ap_paterno,
      ap_materno: this.dataPersonaConductor.ap_materno,
      tipo_doc: this.dataPersonaConductor.tipo_doc,
      documento: this.dataPersonaConductor.documento,
      telefono: this.dataPersonaConductor.telefono,
      correo: this.dataPersonaConductor.correo,
      nro_licencia: this.dataConductor.nro_licencia,
    }
    this.lista_conductores.push(dataBodyConductor)
    this.limpiarFormularioConductor()
  }

  prevStepWithCondition(): void {
    if (this.dataEmpresaServicio.id_tipo_servicio == 2) {
      this.prevStep();
      this.prevStep();
    } else {
      this.prevStep();
    }
  }

  eliminarConductor(index: number) {
    this.lista_conductores.splice(index, 1)
  }
  limpiarFormularioConductor() {
    this.dataConductor = {
      id_conductor: 0,
      id_persona: 0,
      id_empresa_servicio: 0,
      categoria: '',
      nro_licencia: '',
    }
    this.dataPersonaConductor = {
      id_persona: 0,
      nombres: '',
      ap_paterno: '',
      ap_materno: '',
      tipo_doc: '',
      documento: '',
      telefono: '',
      correo: '',
    }
  }

  // -----------------------------------------------------------------------------------------------------------
  // MANEJO DE VEHICULOS
  enviarDatosListaVehiculos() {
    const erroresValidacion = crear_empresa_servicio_vehiculo_vf(this.dataVehiculo);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
    } else {
      if (this.dataVehiculo.id_detalle_ruta_itinerario == null) {
        alert('Seleccione un itinerario')
      } else {
        this.lista_vehiculos.push(this.dataVehiculo);
        this.limpiarFormularioVehiculo();
      }

    }

  }

  eliminarVehiculo(id_vehiculo: number) {
    this.lista_vehiculos.splice(id_vehiculo, 1)
  }

  limpiarFormularioVehiculo() {
    this.dataVehiculo = {
      id_vehiculo: 0,
      placa: "",
      nro_part_reg: "",
      modalidad: "",
      estado: "",

      carga: '',
      peso: '',
      categoria: "",
      anio_fabricacion: "",
      color: "",
      nro_chasis: "",
      nro_asientos: "",
      marca: "",
      modelo: "",
      serie: "",
      carroceria: "",

      id_empresa_servicio: 0,
      id_detalle_ruta_itinerario: 0,
      id_resolucion: 0,
    }
    this.deshabilitarFormVehiculo = true
    this.idMarcaSeleccionada = 0
    this.idModeloSeleccionado = 0

  }
  // -----------------------------------------------------------------------------------------------------------
  buscarEmpresaServicioPorRuc_tipoServicio() {


    if (this.dataEmpresaServicio.id_tipo_servicio == 0) {
      alert('Seleccione el tipo de servicio')
      return
    }
    if (this.dataEmpresa.ruc === '' || this.dataEmpresa.ruc.length < 11) {
      alert('Ingrese un RUC válido de 11 dígitos para la empresa');
      return;
    }

    this.empresaServicioService.BuscarEmpresaPorRuc_TipoServicio(this.dataEmpresaServicio.id_tipo_servicio, this.dataEmpresa.ruc).subscribe({
      next: (data: EmpresaServicioResponse) => {

        console.log(data)
        this.sweetAlert.MensajeError(`ya existe la empresa registrada con el servicio `)
      },
      error: (err) => {
        console.log('error al obtener empresa por ruc', err)
        this.buscarEmpresaPorRuc()
      },
      complete: () => { console.log('otención con exito de empresa por ruc') },
    });
  }
  buscarEmpresaPorRuc() {
    this.empresaService.obtenerEmpresaPorRuc(this.dataEmpresa.ruc).subscribe({
      next: (data: EmpresaResponse) => {
        this.dataEmpresa = data
        console.log(this.dataEmpresa)
        this.onChangeDepartamentoEmpresa()
        this.onChangeProvinciaEmpresa()
        this.buscarRepresentanteLegal(this.dataEmpresa.id_representante_legal)
        this.desabilitarFormEmpresa = true
        this.deshabilitarCampoTipoEmpresa = true
        this.deshabilitarCampoRuc = true
        this.deshabilitarCampofechaInicio = false
        this.deshabilitarCampoExpediente = false
        this.deshabilitarFormRepresentante = true
      },
      error: (err) => {
        console.log('error al obtener empresa por ruc', err)
        this.sweetAlert.MensajeConfirmacion('no existe empresa con ese RUC, deseas habilitar formulario?')
          .then((confirmado) => {
            if (confirmado) {
              this.desabilitarFormEmpresa = false
              this.deshabilitarCampoTipoEmpresa = true
              this.deshabilitarCampoRuc = true
              this.deshabilitarCampofechaInicio = false
              this.deshabilitarCampoExpediente = false
              this.deshabilitarFormRepresentante = false
            } else {
              console.log('Acción cancelada.');
            }
          });
      },
      complete: () => { console.log('otención con exito de empresa por ruc') },
    });
  }
  buscarRepresentanteLegal(id_persona: number) {
    this.personaService.ObtenerDatosPersona(id_persona).subscribe({
      next: (data: PersonaModel) => {
        this.dataPersonaRepresentante = data
        console.log(this.dataPersonaRepresentante)
      },
      error: (err) => {
        console.log('error al obtener persona', err)
      },
      complete: () => { console.log('otención con exito de persona') },
    })
  }
  buscarVehiculoPorPlaca() {
    if (this.dataVehiculo.placa == '') {
      alert('Ingrese un placa de vehiculo')
    } else {
      this.vehiculoService.ObtererVehiculoPorPlaca(this.dataVehiculo.placa).subscribe({
        next: (data: VehiculoModel) => {
          if (data.id_empresa_servicio == null) {
            this.dataVehiculo = data
            this.deshabilitarFormVehiculo = false
            console.log(this.dataVehiculo);
            this.idMarcaSeleccionada = this.lista_marcas.find(x => x.nombre_marca == this.dataVehiculo.marca)?.id_marca || 0;
            if (this.idMarcaSeleccionada > 0) {
              this.listarModelos(this.idMarcaSeleccionada).then(() => {
                this.idModeloSeleccionado = this.lista_modelos.find(x => x.nombre_modelo == this.dataVehiculo.modelo)?.id_modelo || 0;
                console.log('modelo:' + this.idModeloSeleccionado);
              });
            }
          } else {
            this.buscarEmpresaServicioPorId(data.id_empresa_servicio)
          }
        },
        error: (err) => {
          console.log('error al obtener vehiculo', err)
          this.deshabilitarFormVehiculo = false
        },
        complete: () => { console.log('otención con exito de vehiculo') },
      })
    }

  }
  buscarEmpresaPorId(id_empresa: number) {
    this.empresaService.ObtenerEmpresa(id_empresa).subscribe({
      next: (data: EmpresaModel) => {
        this.sweetAlert.MensajeSimpleIcon('Vehiculo encontrado en :', data.razon_social)
      },
      error: (err) => {
        console.log('error al obtener empresa por ruc', err)

      },
      complete: () => { console.log('otención con exito de empresa por ruc') },
    })
  }
  buscarEmpresaServicioPorId(id_empresa_servicio: number) {
    this.empresaServicioService.ObtenerEmpresaServicio(id_empresa_servicio).subscribe({
      next: (data: EmpresaServicioResponse) => {
        this.buscarEmpresaPorId(data.id_empresa)
      },
      error: (err) => {
        console.log('error al obtener empresa por ruc', err)

      },
      complete: () => { console.log('otención con exito de empresa por ruc') },
    });
  }
  //------------------------------------------------------------------------------------------------------------ 

  async crearPersonaRepresentante(): Promise<void> {
    if (this.dataPersonaRepresentante.id_persona == 0) {
      try {
        const data: CrearPersonaMessageResponse = await lastValueFrom(this.personaService.CrearPersona(this.dataPersonaRepresentante));
        this.dataEmpresa.id_representante_legal = data.id_persona;
        console.log(data);
      } catch (err) {
        console.log('Error al guardar persona', err);
      }
    } else {
      console.log('La persona ya existe asociada a la empresa');
    }
  }

  async crearEmpresa(): Promise<void> {
    if (this.dataEmpresa.id_empresa == 0) {
      try {
        const data: CrearEmpresaMessageResponse = await lastValueFrom(this.empresaService.crearEmpresa(this.dataEmpresa));
        console.log(data);
        this.dataEmpresa.id_empresa = data.id_empresa;
        this.dataEmpresaServicio.id_empresa = data.id_empresa;
      } catch (err) {
        console.log('Error al crear empresa', err);
      }
    } else {
      console.log('La empresa ya existe');
    }
  }

  async crearEmpresaServicio(): Promise<void> {
    try {
      // Asignar fecha_inicial como Date
      this.dataEmpresaServicio.id_empresa = this.dataEmpresa.id_empresa;
      this.dataEmpresaServicio.fecha_inicial = new Date(this.dataEmpresaServicio.fecha_inicial);

      // Calcular la fecha_final sumando 10 años y un día
      // this.dataEmpresaServicio.fecha_final = new Date(this.dataEmpresaServicio.fecha_inicial);
      // this.dataEmpresaServicio.fecha_final.setFullYear(this.dataEmpresaServicio.fecha_final.getFullYear() + 10); // Sumar 10 años
      // this.dataEmpresaServicio.fecha_final.setDate(this.dataEmpresaServicio.fecha_final.getDate() + 1); // Sumar un día

      // Llamada al servicio para crear la empresa de servicio
      const data: crearEmpresaServicioResponse = await lastValueFrom(
        this.empresaServicioService.crearEmpresaServicio(this.dataEmpresaServicio)
      );

      console.log(data);
      this.dataEmpresaServicio.id_empresa_servicio = data.id_empresa_servicio;

    } catch (err) {
      console.log('Error al crear empresa servicio', err);
    }
  }

  actualizarFechaFinal() {
    if (this.dataEmpresaServicio.fecha_inicial) {
      let fechaInicio = new Date(this.dataEmpresaServicio.fecha_inicial);
      fechaInicio.setFullYear(fechaInicio.getFullYear() + 10); // Sumamos 10 años
      this.dataEmpresaServicio.fecha_final = fechaInicio.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }
  }

  async crearResolucion() {
    try {
      const data: CrearResolucionMessageResponse = await lastValueFrom(
        this.resolucionService.CrearResolucion(this.dataResolucion)
      );
      console.log(data);
      this.dataResolucion.id_resolucion = data.id_resolucion;
    } catch (err) {
      console.log('Error al crear empresa servicio', err);
    }
  }

  async asociarResolucion() {
    const dataResolucionEmpresaServicio: ResolucionEmpresaModel = {
      id_empresa_servicio: this.dataEmpresaServicio.id_empresa_servicio,
      id_resolucion: this.dataResolucion.id_resolucion
    }
    try {
      const data: CrearResolucionEmpresaServicioMessageResponse = await lastValueFrom(
        this.resolucionService.CrearResolucionEmpresaServicio(dataResolucionEmpresaServicio)
      );
      console.log(data);
    } catch (err) {
      console.log('Error al crear empresa servicio', err);
    }
  }

  async crearItinerarios() {
    for (let i = 0; i < this.lista_itinerarios.length; i++) {
      try {
        this.lista_itinerarios[i].id_empresa_servicio = this.dataEmpresaServicio.id_empresa_servicio;
        const data: CrearItinerarioMessageResponse = await lastValueFrom(
          this.itinerarioService.crearItinerario(this.lista_itinerarios[i])
        );
        this.lista_itinerarios[i].id_detalle_ruta_itinerario = data.id_detalle_ruta_itinerario;
        console.log('Itinerario creado correctamente');

      } catch (err) {
        console.error('Error al crear itinerario:', err);
      }
    }
  }

  async crearArrendamientos() {
    for (let i = 0; i < this.lista_contratos_arrendamientos.length; i++) {
      try {
        this.lista_contratos_arrendamientos[i].id_empresa_servicio = this.dataEmpresaServicio.id_empresa_servicio;
        const data: CrearArrendamientoMessageResponse = await lastValueFrom(
          this.arrendamientoService.crearArrendamiento(this.lista_contratos_arrendamientos[i])
        );
        this.lista_contratos_arrendamientos[i].id_contrato = data.id_contrato;
        console.log('Arrendamiento creado correctamente');
      } catch (err) {
        console.error('Error al crear arrendamiento:', err);
      }
    }
  }

  async crearConductores() {
    for (let i = 0; i < this.lista_conductores.length; i++) {
      try {
        // 1. Crear persona y obtener el id_persona
        this.lista_conductores[i].id_empresa_servicio = this.dataEmpresaServicio.id_empresa_servicio;
        const personaData: CrearPersonaMessageResponse = await lastValueFrom(
          this.personaService.CrearPersona(this.lista_conductores[i])
        );

        const id_persona = personaData.id_persona; // Suponiendo que la API devuelve esto

        // 2. Asignar el id_persona al conductor y crear conductor
        this.lista_conductores[i].id_persona = id_persona;

        const conductorData: CrearConductorMessageResponse = await lastValueFrom(
          this.conductorService.CrearConductor(this.lista_conductores[i])
        );

        console.log(conductorData);

      } catch (err) {
        console.error('Error al crear conductor:', err);
      }
    }
  }

  crearVehiculo() {
    for (let i = 0; i < this.lista_vehiculos.length; i++) {
      try {
        const itinerario = this.lista_itinerarios[this.lista_vehiculos[i].id_detalle_ruta_itinerario - 1].itinerario;
        this.lista_vehiculos[i].id_detalle_ruta_itinerario = this.lista_itinerarios[this.lista_vehiculos[i].id_detalle_ruta_itinerario - 1].id_detalle_ruta_itinerario;
        this.lista_vehiculos[i].id_empresa_servicio = this.dataEmpresaServicio.id_empresa_servicio;
        this.lista_vehiculos[i].id_resolucion = this.dataResolucion.id_resolucion;
        if (this.lista_vehiculos[i].id_vehiculo == 0 || this.lista_vehiculos[i].id_vehiculo == null) {
          this.vehiculoService.CrearVehiculo(this.lista_vehiculos[i]).subscribe({
            next: (res) => {
              console.log(res)
            },
            error: (err) => {
              alert(err)
            },
            complete: () => {
              console.log('Vehiculos obtenidos correctamente');
              this.crearHistorialVehicular(this.lista_vehiculos[i].placa, itinerario, this.lista_vehiculos[i].estado)
            }
          });
        } else {
          this.vehiculoService.ModificarVehiculo(this.lista_vehiculos[i].id_vehiculo, this.lista_vehiculos[i]).subscribe({
            next: (res) => {
              console.log(res)
            },
            error: (err) => {
              alert(err)
            },
            complete: () => {
              console.log('Vehiculos obtenidos correctamente');
              this.crearHistorialVehicular(this.lista_vehiculos[i].placa, itinerario, this.lista_vehiculos[i].estado)
            }
          });
        }


      } catch (err) {
        console.error('Error al crear vehiculo:', err);
      }
    }
  }

  async crearHistorialVehicular(placa: string, ruta: string, condicion: string) {
    let dataHistorial: HistorialVehicularModel = {
      id_empresa_servicio: this.dataEmpresaServicio.id_empresa_servicio,
      condicion: condicion,
      nombre_resolucion: this.dataResolucion.nombre_resolucion,
      fecha_resolucion: new Date(this.dataResolucion.fecha_resolucion),
      ruta: ruta,
      placa: placa,
      observaciones: null
    }

    const conductorData: CrearHistorialVehicularMessageResponse = await lastValueFrom(
      this.historialVehicularService.CrearHistorialVehicular(dataHistorial)
    );

    console.log(conductorData);

  }

  async RegistrarEmpresaServicio() {
    if (this.lista_vehiculos.length == 0) {
      alert('debe registrar por lo menos un vehiculo')
      return;
    }

    this.desabilitarButtonCrearEmpresa = true
    await this.crearPersonaRepresentante();
    await this.crearEmpresa();
    await this.crearEmpresaServicio();
    await this.crearResolucion();
    await this.asociarResolucion();
    await this.crearItinerarios();
    await this.crearArrendamientos();
    await this.crearConductores();
    this.crearVehiculo();
    this.finalizarCreacionEmpresa();

  }

  finalizarCreacionEmpresa(): void {

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Creacion de empresa en proceso"
    });

    setTimeout(() => {
      this.router.navigate(['/principal/detalle-empresa-servicio/', this.dataEmpresaServicio.id_empresa_servicio]);
    }, 5500);
    
  }

  async onFileSelected(event: any): Promise<void> {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const base64String = await fileToBase64(selectedFile);
        this.dataResolucion.documento = base64String;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile));
      } catch (error) {
        console.error('Error al convertir el archivo en Base64:', error);
      }
    }
  }

}
