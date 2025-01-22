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

@Component({
  selector: 'app-crear-empresa-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule, NavegadorComponent, SubnavegadorComponent, ProgressBarComponent],
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
  listaConductores: ListaConductoresResponse[] = [];
  ListaVehiculos: ListaVehiculosResponse[] = [];
  listaContratosArrendamiento: ListaArrendamientoResponse[] = [];

  departamentos: string[] = []
  provincias: string[] = []
  distritos: string[] = []

  idMarcaSeleccionada: number = 0;
  idModeloSeleccionado: number = 0;

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
    tipo_doc: null,
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
    tipo_doc: null,
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

    carga: 0,
    peso: 0,
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

  constructor(private vehiculoService: VehiculoService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private ubigeoService: UbigeoService) { }
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
  mostrar() {
    console.log(this.dataPersonaRepresentante)
    console.log(this.dataEmpresa)
    console.log(this.dataEmpresaServicio)
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
