import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { DetalleEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { ResolucionService } from '../../../services/remoto/resolucion/resolucion.service';
import { ConductorService } from '../../../services/remoto/conductor/conductor.service';
import { ListaResolucionResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { ListaConductoresResponse } from '../../../../domain/dto/conductorResponse.dto';
import { ListaItinerarioResponse } from '../../../../domain/dto/ItinerarioResponse.dto';
import { ListaArrendamientoResponse } from '../../../../domain/dto/ArrendamientoResponse.dto';
import { ArrendamientoService } from '../../../services/remoto/arrendamiento/arrendamiento.service';
import { ItinerarioService } from '../../../services/remoto/itinerario/itinerario.service';
import { VehiculoService } from '../../../services/remoto/vehiculo/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListaVehiculosResponse } from '../../../../domain/dto/VehiculoResponse.dto';





@Component({
  selector: 'app-detalle-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent,CommonModule],
  templateUrl: './detalle-empresa-servicio.component.html',
  styleUrl: './detalle-empresa-servicio.component.css'
})
export class DetalleEmpresaServicioComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null =null;
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

  listaResoluciones:ListaResolucionResponse[]=[];
  listaConductores:ListaConductoresResponse[]=[];
  listaArrendamientos:ListaArrendamientoResponse[]=[];
  listaItinerarios:ListaItinerarioResponse[]=[];
  listaVehiculos:ListaVehiculosResponse[]=[];

  constructor(private vehiculoService:VehiculoService,private itinerarioService:ItinerarioService, private arrendamientoService:ArrendamientoService,private conductorService:ConductorService ,private sanitizer: DomSanitizer, private empresaServicioService:EmpresaServicioService,private activatedRoute:ActivatedRoute, private resolucionService:ResolucionService){}

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

  detalleEmpresa(){
    const params=this.activatedRoute.snapshot.params
    this.empresaServicioService.DetalleEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next:(res:DetalleEmpresaServicioResponse)=>{
        this.dataEmpresaDetalle=res;
        console.log(this.dataEmpresaDetalle);
      },
      error:(err)=>{
        console.error('Error al obtener detalle de empresa:', err);
      },
      complete:()=>{
        console.log('Detalle de empresa obtenido correctamente'); 
        this.listarResolucionesEmpresaServicio(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarConductores(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarArrendamientos(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarItinerarios(this.dataEmpresaDetalle.id_empresa_servicio);
        this.listarVehiculosPorEmpresaServicio(this.dataEmpresaDetalle.id_empresa_servicio);
      }
    });
  } 

  listarResolucionesEmpresaServicio(id_empresa_servicio:number){
    this.resolucionService.ObternerResolucionesPorEmpresaServicio(id_empresa_servicio).subscribe({
      next:(data:ListaResolucionResponse[])=>{
        this.listaResoluciones=data;
        console.log('Resoluciones obtenidas:', data)
      },
      error:(err)=>{
        console.error('Error al obtener resoluciones:', err);
      },
      complete:()=>{
        console.log('Resoluciones obtenidas correctamente'); 
      }
    });

  }

  listarConductores(id_empresa_servicio:number){
    this.conductorService.listarConductoresByEmpresaServicio(id_empresa_servicio).subscribe({
      next:(res:ListaConductoresResponse[])=>{
        this.listaConductores=res;
        console.log(this.listaConductores)
      },
      error:(err)=>{
        console.error('Error al obtener conductores:', err);
      },
      complete:()=>{
        console.log('Conductores obtenidos correctamente'); 
      }
    });
  }

  listarArrendamientos(id_empresa_servicio:number){
    this.arrendamientoService.ListarArrendamientoByEmpresaServicio(id_empresa_servicio).subscribe({
      next:(data:ListaArrendamientoResponse[])=>{
        this.listaArrendamientos=data;
        console.log(this.listaArrendamientos);
      },
      error:(err)=>{
        console.error('Error al obtener arrendamientos:', err);
      },
      complete:()=>{
        console.log('Arrendamientos obtenidos correctamente'); 
      }
    });  
  }

  listarItinerarios(id_empresa_servicio:number){
    this.itinerarioService.listarItinerarioByEmpresasServicio(id_empresa_servicio).subscribe({
      next:(data:ListaItinerarioResponse[])=>{
        this.listaItinerarios=data;
        console.log('Arrendamientos obtenidos correctamente',data);
      },
      error:(err)=>{
        console.error('Error al obtener arrendamientos:', err);
      },
      complete:()=>{
        console.log('Arrendamientos obtenidos correctamente'); 
      }
    });
  }  

  listarVehiculosPorEmpresaServicio(id_empresa_servicio:number){
    this.vehiculoService.ObeterVehiculosPorEmpresaServicio(id_empresa_servicio).subscribe({
      next:(data:ListaVehiculosResponse[])=>{
        this.listaVehiculos=data;
        console.log(data)
      },
      error:(err)=>{
        console.error('Error al obtener vehiculos:', err);
      },
      complete:()=>{
        console.log('Vehiculos obtenidos correctamente'); 
      }
    });
  }




}
