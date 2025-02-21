import { Component, HostListener  } from '@angular/core';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { ReporteService } from '../../../services/remoto/reporte/reporte.service';
import { VehiculoService } from '../../../../infraestructure/services/remoto/vehiculo/vehiculo.service';
import { ListaEmpresaServicioReporteResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { ListaVehiculosDetalleResponse, ListaVehiculosDetallReporteResponse } from '../../../../domain/dto/VehiculoResponse.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-dinamico',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './reporte-dinamico.component.html',
  styleUrl: './reporte-dinamico.component.css'
})
export class ReporteDinamicoComponent {

  getSelectedCount(options: any[]): number {
    // Filtra las opciones seleccionadas y devuelve su cantidad
    return options.filter(option => option.selected).length;
  }

  popovers = [
    {
      title: 'Empresa Servicio',
      isOpen: false,
      options: [
        { label: 'Razon Social', id: 'flexCheckDefault', selected: false },
        { label: 'Ruc', id: 'flexCheckChecked', selected: false },
        { label: 'Representante', id: 'flexCheckChecked', selected: false },
        { label: 'Departamento', id: 'flexCheckChecked', selected: false },
        { label: 'Provincia', id: 'flexCheckChecked', selected: false },
        { label: 'Distrito', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha inicio', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha final', id: 'flexCheckChecked', selected: false }
      ]
    },

    {
      title: 'Tipo de Servicio',
      isOpen: false,
      options: [
        { label: 'T. Personas', id: 'flexCheckDefault', selected: false },
        { label: 'T. Turistico', id: 'flexCheckChecked', selected: false },
        { label: 'T. Estudiantes', id: 'flexCheckChecked', selected: false },
        { label: 'T. Trabajadores', id: 'flexCheckChecked', selected: false }
      ]
    },
    {
      title: 'Empresa Estado',
      isOpen: false,
      options: [
        { label: 'Activo', id: 'flexCheckDefault', selected: false },
        { label: 'Alerta', id: 'flexCheckChecked', selected: false },
        { label: 'Inactivo', id: 'flexCheckChecked', selected: false }
      ]
    },
    {
      title: 'Vehiculo',
      isOpen: false,
      options: [
        { label: 'Placa', id: 'flexCheckDefault', selected: false },
        { label: 'Marca', id: 'flexCheckChecked', selected: false },
        { label: 'Modelo', id: 'flexCheckChecked', selected: false },
        { label: 'Categoria', id: 'flexCheckChecked', selected: false },
        { label: 'Año', id: 'flexCheckChecked', selected: false },
        { label: 'Peso Neto(Tn)', id: 'flexCheckChecked', selected: false },
        { label: 'Carga Util(Tn)', id: 'flexCheckChecked', selected: false },
        { label: 'Carroceria', id: 'flexCheckChecked', selected: false },
        { label: 'Modalidad', id: 'flexCheckChecked', selected: false },
        { label: 'Nro Part Reg', id: 'flexCheckChecked', selected: false },
        { label: 'Estado', id: 'flexCheckChecked', selected: false },
        { label: 'Nro Chasis', id: 'flexCheckChecked', selected: false },
        { label: 'Nro Asientos', id: 'flexCheckChecked', selected: false },
        { label: 'Serie', id: 'flexCheckChecked', selected: false },
        { label: 'color', id: 'flexCheckChecked', selected: false },
        { label: 'itienerario', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha inicio', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha final', id: 'flexCheckChecked', selected: false }
       
      ]
    }
  ];

  // Método que se activa al hacer clic en cualquier parte del componente
  togglePopover(event: MouseEvent, index: number): void {
    // Evita que el popover se cierre cuando se haga clic en el propio botón del popover
    event.stopPropagation();
    
    // Si el popover ya está abierto, lo cerramos
    this.popovers[index].isOpen = !this.popovers[index].isOpen;
  }
  
  // Método para evitar que el clic dentro de los checkboxes cierre el popover
  preventClosePopover(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Escuchar clics fuera del componente para cerrar el popover
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    this.popovers.forEach((popover, index) => {
      // Si el clic ocurrió fuera del popover y su contenido está abierto, lo cerramos
      const popoverContainer = document.getElementById('popover' + (index + 1));
      if (popoverContainer && !popoverContainer.contains(event.target as Node)) {
        popover.isOpen = false;
      }
    });
  }

  
  getSelectedOptions(): void {
    const selectedOptions = this.popovers
      .map(popover => ({
        category: popover.title,
        selectedItems: popover.options
          .filter(option => option.selected)
          .map(option => option.label)
      }))
      .filter(popover => popover.selectedItems.length > 0); // Filtra los vacíos
  
    console.log(selectedOptions);
  }
  


listaEmpresasServicio: ListaEmpresaServicioReporteResponse[] = [];
  listaVehiculos: ListaVehiculosDetallReporteResponse[] = [];

  paginaActual: number = 1;

  constructor(private empresaServicioService: EmpresaServicioService, private vehiculoService: VehiculoService, private reporteService:ReporteService) { }



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

    this.reporteService.ListarEmpresasServicios().subscribe({
      next: (res: ListaEmpresaServicioReporteResponse[]) => {
        this.listaEmpresasServicio = res
  
        console.log('en toda la lista de empresas de servicio', this.listaEmpresasServicio)
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
    this.reporteService.ListarReporteTotalVehiculos().subscribe({
      next: (res: ListaVehiculosDetallReporteResponse[]) => {
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
        index + 1, empresa.expediente, empresa.razon_social, empresa.ruc, empresa.tipo_servicio,
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
