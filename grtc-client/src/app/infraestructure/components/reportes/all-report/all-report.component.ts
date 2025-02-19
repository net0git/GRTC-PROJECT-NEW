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
    let dataToExport: any[] = [];
  
    this.listaEmpresasServicio.forEach((empresa, index) => {
      // Obtener vehículos de la empresa
      let vehiculos = this.obtenerVehiculosPorEmpresa(empresa.id_empresa_servicio);
  
      // Agregar la empresa en una fila
      dataToExport.push({
        Nro: index + 1,
        EXP: empresa.expediente,
        EMPRESA: empresa.empresa,
        RUC: empresa.ruc,
        "TIPO DE TRANSPORTE": empresa.tipo_servicio,
        "FECH_INICIO": empresa.fecha_inicial,
        "FECH_FINAL": empresa.fecha_final,
        ESTADO: empresa.estado,
        Placa: "", // Celda vacía para alinear
        Modelo: "",
        Marca: "",
        "Fecha Inicio": "",
        "Fecha Final": ""
      });
  
      // Agregar vehículos en filas debajo de la empresa
      if (vehiculos.length > 0) {
        vehiculos.forEach(vehiculo => {
          dataToExport.push({
            Nro: "", // No repetir número
            EXP: "",
            EMPRESA: "",
            RUC: "",
            "TIPO DE TRANSPORTE": "",
            "FECH_INICIO": "",
            "FECH_FINAL": "",
            ESTADO: "",
            Placa: vehiculo.placa,
            Modelo: vehiculo.modelo,
            Marca: vehiculo.marca,
            "Fecha Inicio": vehiculo.fecha_inicial,
            "Fecha Final": vehiculo.fecha_final
          });
        });
      } else {
        // Si no hay vehículos, dejar una fila indicando "Sin vehículos"
        dataToExport.push({
          Nro: "",
          EXP: "",
          EMPRESA: "",
          RUC: "",
          "TIPO DE TRANSPORTE": "",
          "FECH_INICIO": "",
          "FECH_FINAL": "",
          ESTADO: "",
          Placa: "Sin vehículos",
          Modelo: "",
          Marca: "",
          "Fecha Inicio": "",
          "Fecha Final": ""
        });
      }
    });
  
    // Convertir datos a hoja de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, { skipHeader: false });
  
    // Crear un nuevo libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Empresas');
  
    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'reporte_empresas_servicio.xlsx');
  }
  
  
  

}
