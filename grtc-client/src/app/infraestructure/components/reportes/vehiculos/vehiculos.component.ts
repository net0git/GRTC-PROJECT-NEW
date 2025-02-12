import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { VehiculoService } from '../../../../infraestructure/services/remoto/vehiculo/vehiculo.service';
import * as XLSX from 'xlsx';
import { ListaVehiculosDetalleResponse } from '../../../../domain/dto/VehiculoResponse.dto';

@Component({
  selector: 'app-reporte-vehiculos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit {

  listaVehiculos: ListaVehiculosDetalleResponse[] = []; listaVehiculosTemp: ListaVehiculosDetalleResponse[] = [];
  p: number = 1;
  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.listarVehiculos()
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
      }
    })
  }

  buscarEnObjeto(event: any) {

    const textoBusqueda = event.target.value.toLowerCase();
    this.listaVehiculos = this.listaVehiculosTemp.filter((objeto: ListaVehiculosDetalleResponse) => {
      const placa = objeto.placa ? objeto.placa.toLowerCase() : '';
      const anio_fabricacion = objeto.anio_fabricacion ? objeto.anio_fabricacion.toLowerCase() : '';
      const marca = objeto.marca ? objeto.marca.toLowerCase() : '';
      const modelo = objeto.modelo ? objeto.modelo.toLowerCase() : '';
      const categoria = objeto.categoria ? objeto.categoria.toLowerCase() : '';
  
      return placa.includes(textoBusqueda) ||
      anio_fabricacion.includes(textoBusqueda) ||
      marca.includes(textoBusqueda) ||
      modelo.includes(textoBusqueda) ||
      categoria.includes(textoBusqueda)
      
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

}
