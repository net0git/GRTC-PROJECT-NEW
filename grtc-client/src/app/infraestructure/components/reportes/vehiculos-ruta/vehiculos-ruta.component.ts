import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReporteService } from '../../../../infraestructure/services/remoto/reporte/reporte.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-vehiculos-ruta',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './vehiculos-ruta.component.html',
  styleUrl: './vehiculos-ruta.component.css'
})
export class VehiculosRutaComponent implements OnInit {

  nroVehiculosRuta: any=[];
  listaVehiculosRutaOrigen: any=[];

  paginaActual: number = 1;

  constructor(private reporteService: ReporteService) { }
  ngOnInit(): void {
    this.CantidadVehiculosRuta()

  }

  cambiarPagina(event: number) {
    this.paginaActual = event;
  }

  CantidadVehiculosRuta(): void {
    this.reporteService.CantidadVehiculosRuta().subscribe({
      next: (res: any) => {
        console.log(res);
        this.nroVehiculosRuta=res
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('cantidad de vihiculos por ruta completado');
      }
    });
  }

  ObtenerVehiculosPorRutaOrigenDestino(origen: string, destino: string){
    this.paginaActual=1
    this.reporteService.ObtenerVehiculosPorRutaOrigenDestino(origen, destino).subscribe({
      next: (data: any) => {
        console.log(data);
        this.listaVehiculosRutaOrigen=data
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('vehiculos por ruta origen y destino enocntrados');
      }
    })
  }

  ExporToExcel():void{
    
    let allData = this.listaVehiculosRutaOrigen; // Asegúrate de obtener todos los registros

    // let filteredData = allData.map(({ id_vehiculo, id_tuc, nombre_resolucion,fecha_inicial, fecha_final, ...rest }) => ({
    //     ...rest,
    //     fecha_inicial: fecha_inicial ? new Date(fecha_inicial).toLocaleDateString('es-ES') : '',
    //     fecha_act: fecha_final ? new Date(fecha_final).toLocaleDateString('es-ES') : '',
    // }));

    // Convertimos los datos a una hoja de trabajo de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(allData);

    // Creamos un nuevo libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Guardamos el archivo Excel
    XLSX.writeFile(wb, 'reporte_vehiculos_ruta.xlsx');
  
  }


}
