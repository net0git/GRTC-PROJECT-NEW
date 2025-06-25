import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { VehiculoService } from '../../../../services/remoto/vehiculo/vehiculo.service';
import { ListaVehiculosResponse } from '../../../../../domain/dto/VehiculoResponse.dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculoModel } from '../../../../../domain/models/Vehiculo.model';
import { ListarMarcasResponse } from '../../../../../domain/dto/MarcaResponse.dto';
import { ListarModelosResponse } from '../../../../../domain/dto/ModeloResponse.dto';
import { ResolucionService } from '../../../../services/remoto/resolucion/resolucion.service';
import { ListaResolucionResponse } from '../../../../../domain/dto/ResolucionResponse.dto';
import { ListaItinerarioResponse } from '../../../../../domain/dto/ItinerarioResponse.dto';
import { ItinerarioService } from '../../../../services/remoto/itinerario/itinerario.service';
import { SweetAlert } from '../../../../shared/animated-messages/sweetAlert';
import { SoloLetrasDirective } from '../../../../directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../../directives/solo-numeros.directive';
import { PlacaDirective } from '../../../../directives/placa.directive';
import { SoloLetrasGuionDirective } from '../../../../directives/solo-letras-guion.directive';
import { HistorialVehicularModel } from '../../../../../domain/models/HistorialVehicular.model';
import { HistorialVehicularService } from '../../../../services/remoto/historial-vehicular/historial-vehicular.service';
import { RegistroMarcaModeloComponent } from '../../../../components/registro-marca-modelo/registro-marca-modelo.component';
import { EmpresaServicioService } from '../../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { EmpresaServicioDetalleResponse } from '../../../../../domain/dto/EmpresaServicioResponse.dto';

declare var bootstrap: any;

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    NavegadorComponent,
    SubnavegadorComponent,
    CommonModule, 
    FormsModule, 
    SoloLetrasDirective, 
    SoloNumerosDirective, 
    SoloLetrasGuionDirective, 
    PlacaDirective,
    RegistroMarcaModeloComponent],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {

  id_empresa_servicio_temp: string = "";
  listaVehiculos: ListaVehiculosResponse[] = [];
  lista_marcas: ListarMarcasResponse[] = [];
  lista_modelos: ListarModelosResponse[] = [];
  lista_resoluciones: ListaResolucionResponse[] = [];
  lista_itinerarios: ListaItinerarioResponse[] = [];

  private myModal: any;
  deshabilitarFormVehiculo:boolean=true

  dataVehiculo: VehiculoModel = {

    id_vehiculo: 0,
    placa: "",
    nro_part_reg: "",
    modalidad: "",
    estado: "",

    carga: "",
    peso: "",
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



  idMarcaSeleccionada: number = 0;
  idModeloSeleccionado: number = 0;
  modificar: boolean = false;
  empresaService: any;

  constructor(
    private historialVehicularService: HistorialVehicularService, 
    private sweetAlert: SweetAlert, 
    private itinerarioService: ItinerarioService, 
    private resolucionService: ResolucionService, 
    private vehiculoService: VehiculoService, 
    private activatedRoute: ActivatedRoute,
    private empresaServicioService:EmpresaServicioService
    ) { }

  ngOnInit(): void {
    this.listarVehiculos()
    this.listarMarcas()
    this.listaResoluciones()
    this.listaItinerarios()
  }

  openModal() {
      this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
      this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }

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



 async listarModelos(id_marca: number):Promise<void> {
    this.vehiculoService.ObtenerModelosPorMarca(id_marca).subscribe({
      next: (data: ListarModelosResponse[]) => {
        this.lista_modelos = data
      },
      error: (err) => {
        console.error('Error al obtener modelos:', err);
      }
    })
  }

  listarVehiculos() {
    const params = this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.vehiculoService.ObeterVehiculosPorEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data: ListaVehiculosResponse[]) => {
        this.listaVehiculos = data
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

  onMarcaSeleccionada() {
    console.log(this.idMarcaSeleccionada)
    this.listarModelos(this.idMarcaSeleccionada)
    this.dataVehiculo.marca = this.lista_marcas.find(x => x.id_marca == this.idMarcaSeleccionada)?.nombre_marca || '';
  }

  onModeloSeleccionado() {
    console.log(this.idModeloSeleccionado)
    this.dataVehiculo.modelo = this.lista_modelos.find(x => x.id_modelo == this.idModeloSeleccionado)?.nombre_modelo || '';
  }

  obternerDatosTipoVehiculo(vehiculo: any) {
    if (!vehiculo) {
      console.error('El objeto vehiculo es inválido:', vehiculo);
      return;
    }

    Object.assign(this.dataVehiculo, vehiculo);
    console.log("datos vehiculo", this.dataVehiculo)

    this.idMarcaSeleccionada = this.lista_marcas.find(x => x.nombre_marca == vehiculo.marca)?.id_marca || 0;

    if (this.idMarcaSeleccionada > 0) {
      this.vehiculoService.ObtenerModelosPorMarca(this.idMarcaSeleccionada).subscribe({
        next: (data: ListarModelosResponse[]) => {
          this.lista_modelos = data;
          this.idModeloSeleccionado = this.lista_modelos.find(x => x.nombre_modelo == vehiculo.modelo)?.id_modelo || 0;
          this.onModeloSeleccionado();
          this.deshabilitarFormVehiculo=false
        },
        error: (err) => {
          console.error('Error al obtener modelos:', err);
        }
      });
    }

    this.modificar = true

  }

buscarVehiculoPorPlaca() {
  if (this.dataVehiculo.placa == '') {
    alert('Ingrese un placa de vehiculo')
  } else {
    this.vehiculoService.ObtererVehiculoPorPlaca(this.dataVehiculo.placa).subscribe({
      next: (data: VehiculoModel) => {
        console.log(data)
      
          if(data.id_empresa_servicio !=null){

            this.ObtenerEmpresaServicioDetalle(data.id_empresa_servicio)
            
          }
          else{
            this.dataVehiculo = data
            this.deshabilitarFormVehiculo = false
            console.log(this.dataVehiculo);
            this.idMarcaSeleccionada = this.lista_marcas.find(x => x.nombre_marca == this.dataVehiculo.marca)?.id_marca || 0;
            if (this.idMarcaSeleccionada > 0) {
              this.listarModelos(this.idMarcaSeleccionada).then(() => {
                this.idModeloSeleccionado = this.lista_modelos.find(x => x.nombre_modelo == this.dataVehiculo.modelo)?.id_modelo || 0;
            //   console.log('modelo:' + this.idModeloSeleccionado);
              });
            }
          }
          
          
      },
      error: (error) => {
        console.log('error al obtener vehiculo', error)
        this.deshabilitarFormVehiculo = false
      },
      complete: () => { console.log('otención con exito de vehiculo') },
    })
  }

}

ObtenerEmpresaServicioDetalle(id_empresa_servicio: number) {
    this.empresaServicioService.OtenerDetalleEmpresaServicio(id_empresa_servicio).subscribe({
      next: (data: EmpresaServicioDetalleResponse) => {
        this.sweetAlert.MensajeSimpleIcon('Vehiculo encontrado en :', data.razon_social)
      },
      error: (err:any) => {
        console.log('error al obtener empresa por ruc', err)

      },
      complete: () => { console.log('otención con exito de empresa por ruc') },
    })
  }


  GuardarDatosFormulario() {
    if (this.modificar) {
      this.modificarVehiculo()
    } else {
      this.crearVehiculo()
    }
  }

  crearVehiculo() {
    const params = this.activatedRoute.snapshot.params;
    this.dataVehiculo.id_empresa_servicio = params['id_empresa_servicio'];
    console.log(this.dataVehiculo)
    this.vehiculoService.CrearVehiculo(this.dataVehiculo).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        alert(err)
      },
      complete: () => {
        console.log('Vehiculos obtenidos correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Vehiculo creado correctamente')
        this.crearRegistroHistorialVehicular()
        this.listarVehiculos()
      }
    });
  }

  crearRegistroHistorialVehicular() {
    const params = this.activatedRoute.snapshot.params;
    let id_resolucion = (<HTMLInputElement>document.getElementById('resolucion')).value;
    let id_itinerario = (<HTMLInputElement>document.getElementById('itinerario')).value;
    let estado = (<HTMLInputElement>document.getElementById('estado')).value;
    let placa = (<HTMLInputElement>document.getElementById('placa')).value;
    let ruta = this.lista_itinerarios.filter((itinerario: { id_detalle_ruta_itinerario: number; }) => itinerario.id_detalle_ruta_itinerario == parseInt(id_itinerario))[0].itinerario;
    let resolucion = this.lista_resoluciones.filter((resolucion: { id_resolucion: number; }) => resolucion.id_resolucion == parseInt(id_resolucion));

    let dataHistorialVehicular: HistorialVehicularModel = {
      id_empresa_servicio: params['id_empresa_servicio'],
      condicion: estado,
      nombre_resolucion: resolucion[0].nombre_resolucion,
      fecha_resolucion: new Date(resolucion[0].fecha_resolucion),
      ruta: ruta,
      placa: placa,
      observaciones: ""
    }
    console.log(dataHistorialVehicular)

    this.historialVehicularService.CrearHistorialVehicular(dataHistorialVehicular).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        alert(err)
      },
      complete: () => {
        console.log('Historial vehicular creado correctamente');
      }
    });
  }

  modificarVehiculo() {

    this.vehiculoService.ModificarVehiculo(this.dataVehiculo.id_vehiculo, this.dataVehiculo).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        alert(err)
      },
      complete: () => {
        console.log('Vehiculos obtenidos correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Vehiculo modificado correctamente')
        this.listarVehiculos()
      }
    });
  }

  listaResoluciones() {
    const params = this.activatedRoute.snapshot.params;
    this.resolucionService.ObternerResolucionesPorEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data) => {
        console.log(data)
        this.lista_resoluciones = data
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }

    })
  }

  listaItinerarios() {
    const params = this.activatedRoute.snapshot.params;
    this.itinerarioService.listarItinerarioByEmpresasServicio(params['id_empresa_servicio']).subscribe({
      next: (data: ListaItinerarioResponse[]) => {
        this.lista_itinerarios = data;
        console.log(this.lista_itinerarios)
      },
      error: (err) => {
        console.error('Error al obtener Itinerarios:', err);
      },
      complete: () => {
        console.log('Itinerarios obtenidos correctamente');
      }
    });
  }

  limpiar() {
    this.dataVehiculo.id_vehiculo = 0
    this.dataVehiculo.placa = "",
      this.dataVehiculo.nro_part_reg = "",
      this.dataVehiculo.modalidad = "",
      this.dataVehiculo.estado = "",

      this.dataVehiculo.carga = "",
      this.dataVehiculo.peso = "",
      this.dataVehiculo.categoria = "",
      this.dataVehiculo.anio_fabricacion = "",
      this.dataVehiculo.color = "",
      this.dataVehiculo.nro_chasis = "",
      this.dataVehiculo.nro_asientos = "",
      this.dataVehiculo.marca = "",
      this.dataVehiculo.modelo = "",
      this.dataVehiculo.serie = "",
      this.dataVehiculo.carroceria = "",

      this.dataVehiculo.id_empresa_servicio = 0,
      this.dataVehiculo.id_detalle_ruta_itinerario = 0,
      this.dataVehiculo.id_resolucion = 0

    this.idMarcaSeleccionada = 0;
    this.idModeloSeleccionado = 0;

    this.modificar = false
    this.deshabilitarFormVehiculo=true
  }

}
