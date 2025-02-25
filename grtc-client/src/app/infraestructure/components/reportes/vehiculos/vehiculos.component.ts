import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { VehiculoService } from '../../../../infraestructure/services/remoto/vehiculo/vehiculo.service';
import * as XLSX from 'xlsx';
import { ListaVehiculosDetalleResponse } from '../../../../domain/dto/VehiculoResponse.dto';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';

@Component({
  selector: 'app-reporte-vehiculos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {

  listaVehiculos: ListaVehiculosDetalleResponse[] = []; listaVehiculosTemp: ListaVehiculosDetalleResponse[] = [];
  cantidad_v_personas: number = 0;
  cantidad_v_turismo: number = 0;
  cantidad_v_estudiantes: number = 0;
  cantidad_v_trabajadores: number = 0;
  paginaActual: number = 1;
  constructor(private vehiculoService: VehiculoService, private credencialesService: CredencialesService) { }

  ngOnInit(): void {
    this.listarVehiculos()
    this.verPerfil();
  }
  disableInvitado='display: block';
  verPerfil(){
    if(this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
  }

  cambiarPagina(event: number) {
    this.paginaActual = event;
  }

  listarVehiculos() {
    this.vehiculoService.ListarTotalVehiculos().subscribe({
      next: (res: ListaVehiculosDetalleResponse[]) => {
        this.listaVehiculos = res
        this.listaVehiculosTemp = res
      },
      error: (err) => {
        console.error('Error al obtener vehiculos:', err)
      },
      complete: () => {
        console.log('Vehiculos obtenidos correctamente')
        this.contador_tipo_servicio()
      }
    })
  }

  buscarEnObjeto(event: any) {
    this.paginaActual = 1;
    const textoBusqueda = event.target.value.toLowerCase();
    this.listaVehiculos = this.listaVehiculosTemp.filter((objeto: ListaVehiculosDetalleResponse) => {
      const placa = objeto.placa ? objeto.placa.toLowerCase() : '';
      const anio_fabricacion = objeto.anio_fabricacion ? objeto.anio_fabricacion.toLowerCase() : '';
      const marca = objeto.marca ? objeto.marca.toLowerCase() : '';
      const modelo = objeto.modelo ? objeto.modelo.toLowerCase() : '';
      const categoria = objeto.categoria ? objeto.categoria.toLowerCase() : '';
      const razon_social = objeto.razon_social ? objeto.razon_social.toLowerCase() : '';
  
      return placa.includes(textoBusqueda) ||
      anio_fabricacion.includes(textoBusqueda) ||
      marca.includes(textoBusqueda) ||
      modelo.includes(textoBusqueda) ||
      categoria.includes(textoBusqueda) ||
      razon_social.includes(textoBusqueda)
      
    });
  }

  contador_tipo_servicio() {
    this.listaVehiculosTemp.forEach((vehiculo: ListaVehiculosDetalleResponse) => {
      switch (vehiculo.id_tipo_servicio) {
        case 1:
          this.cantidad_v_personas++;
          break;
        case 2:
          this.cantidad_v_turismo++;
          break;
        case 3:
          this.cantidad_v_trabajadores++;
          break;
        case 4:
          this.cantidad_v_estudiantes++;
          break;
        default:
          // Si el valor no coincide con ninguno, puedes manejarlo aquí si lo necesitas.
          break;
      }
    });
  }

  ExporToExcel():void{
    
    let allData = this.listaVehiculos; // Asegúrate de obtener todos los registros

    let filteredData = allData.map(({ id_vehiculo, id_tuc, nombre_resolucion,fecha_inicial, fecha_final, ...rest }) => ({
        ...rest,
        fecha_inicial: fecha_inicial ? new Date(fecha_inicial).toLocaleDateString('es-ES') : '',
        fecha_act: fecha_final ? new Date(fecha_final).toLocaleDateString('es-ES') : '',
    }));

    // Convertimos los datos a una hoja de trabajo de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // Creamos un nuevo libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Guardamos el archivo Excel
    XLSX.writeFile(wb, 'reporte_vehiculos.xlsx');
  
  }

  filtrarVehiculos(): void {

    
    // Obtener el estado de los checkboxes
    this.paginaActual = 1;
    const filtros: any = {
        persona: (document.getElementById("flexCheckVehiculosPersona") as HTMLInputElement).checked,
        turismo: (document.getElementById("flexCheckVehiculosTurismo") as HTMLInputElement).checked,
        estudiante: (document.getElementById("flexCheckVehiculosEstudiante") as HTMLInputElement).checked,
        trabajador: (document.getElementById("flexCheckVehiculosTrabajador") as HTMLInputElement).checked,
    };

    // Definir los valores esperados para cada tipo de transporte
    const idTipoServicioMap: Record<string, number> = {
        persona: 1,
        turismo: 2,
        trabajador: 3,
        estudiante: 4,  
    };

    // Obtener los tipos seleccionados
    const tiposSeleccionados = Object.keys(idTipoServicioMap)
        .filter(key => filtros[key])  // Solo los checkboxes marcados
        .map(key => idTipoServicioMap[key]);

  
    // Filtrar la lista en función de los checkboxes seleccionados
    this.listaVehiculos = this.listaVehiculosTemp.filter((vehiculo: ListaVehiculosDetalleResponse) => {
        const cumpleTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(vehiculo.id_tipo_servicio)
        return cumpleTipo ; // Ahora ambos deben cumplirse
    })
    console.log(filtros)
  }

}
