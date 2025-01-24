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
import { ListaItinerarioResponse } from '../../../../domain/dto/ItinerarioResponse.dto';
import { ListarMarcasResponse } from '../../../../domain/dto/MarcaResponse.dto';
import { ListarModelosResponse } from '../../../../domain/dto/ModeloResponse.dto';
import { ConductorModel } from '../../../../domain/models/Conductor.model';
import { ListaConductoresResponse } from '../../../../domain/dto/ConductorResponse.dto';
import { VehiculoModel } from '../../../../domain/models/Vehiculo.model';
import { FormsModule } from '@angular/forms';
import { fileToBase64 } from '../../../../../../public/utils/pdfFunctions';
import { ArrendamientoModel } from '../../../../domain/models/Arrendamiento.model';
import { ListaArrendamientoResponse } from '../../../../domain/dto/ArrendamientoResponse.dto';
import { VehiculoService } from '../../../services/remoto/vehiculo/vehiculo.service';
import { ListaVehiculosResponse } from '../../../../domain/dto/VehiculoResponse.dto';
import { EmpresaResponse } from '../../../../domain/dto/EmpresaResponse.dto';
import { EmpresaService } from '../../../services/remoto/empresa/empresa.service';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';
import { EmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { SoloNumerosGuionDirective } from '../../../directives/solo-numeros-guion.directive';
import { SoloNumerosDirective } from '../../../directives/solo-numeros.directive';
import { SoloLetrasDirective } from '../../../directives/solo-letras.directive';

import { crear_empresa_servicio_empresa_vf, crear_empresa_servicio_vehiculo_vf, crear_empresa_servicio_representante_vf } from '../../../../infraestructure/validatorForm/empresaServicio.validator';


@Component({
  selector: 'app-crear-empresa-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule, NavegadorComponent, SubnavegadorComponent, ProgressBarComponent, SoloNumerosGuionDirective, SoloNumerosDirective, SoloLetrasDirective],
  templateUrl: './crear-empresa-servicio.component.html',
  styleUrl: './crear-empresa-servicio.component.css'
})
export class CrearEmpresaServicioComponent implements OnInit {

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

  dataResolucion: ResolucionModel = {
    id_resolucion: 0,
    anio_resolucion: '',
    descripcion: '',
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
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ubigeoService: UbigeoService,
    private sweetAlert: SweetAlert,
    private empresaServicioService: EmpresaServicioService,
    private personaService: PersonaService) { }
  ngOnInit(): void {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    this.ListaDepartamentosEmpresa()
    this.ListaDepartamentosArrendamiento()
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

  listarModelos(id_marca: number) {
    this.vehiculoService.ObtenerModelosPorMarca(id_marca).subscribe({
      next: (data: ListarModelosResponse[]) => {
        this.lista_modelos = data
      },
      error: (err) => {
        console.error('Error al obtener modelos:', err);
      }
    })
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
    // const erroresValidacion = crear_empresa_servicio_empresa_vf(this.dataEmpresa, this.dataEmpresaServicio);
    // if (erroresValidacion.length > 0) {
    //   let errorMensaje = '';
    //   erroresValidacion.forEach(error => {
    //     errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
    //   });
    //   alert(errorMensaje)
    // } else {
    //   this.nextStep()
    // }
    this.nextStep()
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



  // -----------------------------------------------------------------------------------------------------------

  // MANEJO DE ITINARARIOS
  enviarDatosListaItinearios() {
    this.lista_itinerarios.push(this.dataItinerario)
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
  enviarDatosListaArrendamiento() {
    this.lista_contratos_arrendamientos.push(this.dataArrendamiento)
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
      this.lista_vehiculos.push(this.dataVehiculo)
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
  //------------------------------------------------------------------------------------------------------------ 
  mostrar() {
    console.log(this.dataPersonaRepresentante)
    console.log(this.dataEmpresa)
    console.log(this.dataEmpresaServicio)
    console.log(this.dataResolucion)
    console.log(this.lista_itinerarios)
    console.log(this.lista_contratos_arrendamientos)
    console.log(this.lista_conductores)
    console.log(this.lista_vehiculos)
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
