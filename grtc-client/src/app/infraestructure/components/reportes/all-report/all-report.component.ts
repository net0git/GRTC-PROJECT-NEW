import { Component, OnInit } from '@angular/core';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { VehiculoService } from '../../../../infraestructure/services/remoto/vehiculo/vehiculo.service';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { ListaVehiculosDetalleResponse, ListaVehiculosResponse } from '../../../../domain/dto/VehiculoResponse.dto';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';




@Component({
  selector: 'app-all-report',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './all-report.component.html',
  styleUrl: './all-report.component.css'
})
export class AllReportComponent implements OnInit {

  listaEmpresasServicio: ListaEmpresaServicioResponse[] = [];
  listaVehiculos: ListaVehiculosDetalleResponse[] = [];

  paginaActual: number = 1;

  constructor(private empresaServicioService: EmpresaServicioService, private vehiculoService: VehiculoService) { }



  ngOnInit(): void {  
    this.listarEmpresasSevicios()
    this.listarVehiculos()
  
  }

  cambiarPagina(event: number) {
    this.paginaActual = event;
  }


  obtenerVehiculosPorEmpresa(idEmpresaServicio: number) {
    return this.listaVehiculos.filter((v:ListaVehiculosDetalleResponse) => v.id_empresa_servicio === idEmpresaServicio);
  }

  
  listarEmpresasSevicios() {
    this.empresaServicioService.listarEmpresasServicio().subscribe({
      next: (res: ListaEmpresaServicioResponse[]) => {
        this.listaEmpresasServicio = res
  
        console.log(this.listaEmpresasServicio)
      },
      error: (err) => {
        console.error('Error al obtener empresas de servicio:', err)
      },
      complete: () => {
        console.log('Obtención de empresas de servicio completada')
     
      }
    })
  }

  listarVehiculos():any {
    this.vehiculoService.ListarTotalVehiculos().subscribe({
      next: (res: ListaVehiculosDetalleResponse[]) => {
         this.listaVehiculos = res
        
      },
      error: (err) => {
        console.error('Error al obtener vehiculos:', err)
      },
      complete: () => {
        console.log('Vehiculos obtenidos correctamente')
        
      }
    })
  }

  

  ExporToExcel(): void {
    let wb: XLSX.WorkBook = XLSX.utils.book_new();
    let dataToExport: any[] = [];
  
    // CABECERA
    dataToExport.push([
      "Nro", "EXP", "EMPRESA", "RUC", "TIPO DE TRANSPORTE", "FECH_INICIO", "FECH_FINAL", "ESTADO",
      "Placa", "Modelo", "Marca", "Fecha Inicio", "Fecha Final"
    ]);
  
    // RECORRER EMPRESAS Y VEHÍCULOS
    this.listaEmpresasServicio.forEach((empresa, index) => {
      let vehiculos = this.obtenerVehiculosPorEmpresa(empresa.id_empresa_servicio);
  
      // FILA DE EMPRESA (SIN VEHÍCULOS AÚN)
      dataToExport.push([
        index + 1, empresa.expediente, empresa.empresa, empresa.ruc, empresa.tipo_servicio,
        empresa.fecha_inicial, empresa.fecha_final, empresa.estado,
        "", "", "", "", "" // Espacios vacíos para alinear
      ]);
  
      // AGREGAR VEHÍCULOS DEBAJO DE SU EMPRESA
      if (vehiculos.length > 0) {
        vehiculos.forEach(vehiculo => {
          dataToExport.push([
            "", "", "", "", "", "", "", "", // Espacios vacíos para no repetir empresa
            vehiculo.placa, vehiculo.modelo, vehiculo.marca, vehiculo.fecha_inicial, vehiculo.fecha_final
          ]);
        });
      } else {
        // SI NO HAY VEHÍCULOS, MOSTRAR "SIN VEHÍCULOS"
        dataToExport.push(["", "", "", "", "", "", "", "", "Sin vehículos", "", "", "", ""]);
      }
  
      // FILA VACÍA PARA SEPARACIÓN ENTRE EMPRESAS
      dataToExport.push([]);
    });
  
    // CREAR HOJA DE EXCEL
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
  
    // AUTOAJUSTE DEL ANCHO DE COLUMNAS
    ws["!cols"] = [
      { wch: 5 }, { wch: 10 }, { wch: 30 }, { wch: 15 }, { wch: 20 },
      { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
      { wch: 12 }, { wch: 15 }, { wch: 15 }
    ];
  
    // AÑADIR HOJA AL LIBRO
    XLSX.utils.book_append_sheet(wb, ws, "Reporte Empresas");
  
    // DESCARGAR EXCEL
    XLSX.writeFile(wb, "reporte_empresas_servicio.xlsx");
  }
  
  

  // ExporToExcel(): void {
  //   let dataToExport: any[] = [];
  
  //   this.listaEmpresasServicio.forEach((empresa, index) => {
  //     // Obtener vehículos de la empresa
  //     let vehiculos = this.obtenerVehiculosPorEmpresa(empresa.id_empresa_servicio);
  
  //     // Agregar la empresa en una fila
  //     dataToExport.push({
  //       Nro: index + 1,
  //       EXP: empresa.expediente,
  //       EMPRESA: empresa.empresa,
  //       RUC: empresa.ruc,
  //       "TIPO DE TRANSPORTE": empresa.tipo_servicio,
  //       "FECH_INICIO": empresa.fecha_inicial,
  //       "FECH_FINAL": empresa.fecha_final,
  //       ESTADO: empresa.estado,
  //       Placa: "", // Celda vacía para alinear
  //       Modelo: "",
  //       Marca: "",
  //       "Fecha Inicio": "",
  //       "Fecha Final": ""
  //     });
  
  //     // Agregar vehículos en filas debajo de la empresa
  //     if (vehiculos.length > 0) {
  //       vehiculos.forEach(vehiculo => {
  //         dataToExport.push({
  //           Nro: "", // No repetir número
  //           EXP: "",
  //           EMPRESA: "",
  //           RUC: "",
  //           "TIPO DE TRANSPORTE": "",
  //           "FECH_INICIO": "",
  //           "FECH_FINAL": "",
  //           ESTADO: "",
  //           Placa: vehiculo.placa,
  //           Modelo: vehiculo.modelo,
  //           Marca: vehiculo.marca,
  //           "Fecha Inicio": vehiculo.fecha_inicial,
  //           "Fecha Final": vehiculo.fecha_final
  //         });
  //       });
  //     } else {
  //       // Si no hay vehículos, dejar una fila indicando "Sin vehículos"
  //       dataToExport.push({
  //         Nro: "",
  //         EXP: "",
  //         EMPRESA: "",
  //         RUC: "",
  //         "TIPO DE TRANSPORTE": "",
  //         "FECH_INICIO": "",
  //         "FECH_FINAL": "",
  //         ESTADO: "",
  //         Placa: "Sin vehículos",
  //         Modelo: "",
  //         Marca: "",
  //         "Fecha Inicio": "",
  //         "Fecha Final": ""
  //       });
  //     }
  //   });
  
  //   // Convertir datos a hoja de Excel
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, { skipHeader: false });
  
  //   // Crear un nuevo libro de trabajo
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Reporte Empresas');
  
  //   // Guardar el archivo Excel
  //   XLSX.writeFile(wb, 'reporte_empresas_servicio.xlsx');
  // }
  
  
  

}
