import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConductorService } from '../../../services/remoto/conductor/conductor.service';
import * as XLSX from 'xlsx';
import { ListaTotalConductorResponse } from '../../../../domain/dto/ConductorResponse.dto';

@Component({
  selector: 'app-reporte-conductores',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent implements OnInit {

  constructor(private conductorService: ConductorService) { }
  listaConductores: ListaTotalConductorResponse[] = []; listaConductoresTemp: ListaTotalConductorResponse[] = [];
  p: number = 1;
  
  ngOnInit(): void {
    this.listarConductores()
  }

  listarConductores() {
    this.conductorService.listarTotalConductores().subscribe({
      next: (res: ListaTotalConductorResponse[]) => {
        this.listaConductores = res
        this.listaConductoresTemp = res
      },
      error: (err) => {
        console.error('Error al obtener conductores:', err)
      },
      complete: () => {
        console.log('Conductores obtenidos correctamente')
      }
    })
  }


  buscarEnObjeto(event: any) {

    const textoBusqueda = event.target.value.toLowerCase();
    this.listaConductores = this.listaConductoresTemp.filter((objeto: ListaTotalConductorResponse) => {
      const numero_documento = objeto.numero_documento ? objeto.numero_documento.toLowerCase() : '';
      const nombre_conductor = objeto.nombre_conductor ? objeto.nombre_conductor.toLowerCase() : '';
      const nro_licencia = objeto.nro_licencia ? objeto.nro_licencia.toLowerCase() : '';
      const empresa = objeto.nombre_empresa ? objeto.nombre_empresa.toLowerCase() : '';
     
  
      return numero_documento.includes(textoBusqueda) ||
      nombre_conductor.includes(textoBusqueda) ||
      nro_licencia.includes(textoBusqueda) ||
      empresa.includes(textoBusqueda) 
      
    });
  }

  ExporToExcel():void{
    
    // let allData = this.listaVehiculos; // Asegúrate de obtener todos los registros

    // let filteredData = allData.map(({ id_vehiculo, id_tuc, nombre_resolucion,fecha_inicial, fecha_final, ...rest }) => ({
    //     ...rest,
    //     fecha_inicial: fecha_inicial ? new Date(fecha_inicial).toLocaleDateString('es-ES') : '',
    //     fecha_act: fecha_final ? new Date(fecha_final).toLocaleDateString('es-ES') : '',
    // }));

    // // Convertimos los datos a una hoja de trabajo de Excel
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // // Creamos un nuevo libro de trabajo
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // // Guardamos el archivo Excel
    // XLSX.writeFile(wb, 'reporte_vehiculos.xlsx');
  
  }


}
