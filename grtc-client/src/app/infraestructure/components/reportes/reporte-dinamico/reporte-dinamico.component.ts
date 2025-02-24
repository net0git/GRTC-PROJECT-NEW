import { Component, HostListener } from '@angular/core';
import { ReporteService } from '../../../services/remoto/reporte/reporte.service';
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

  popoversColumn = [
    {
      title: 'Empresa Servicio',
      isOpen: false,
      options: [
        { label: 'Razon Social', id: 'flexCheckDefault', selected: true },
        { label: 'Ruc', id: 'flexCheckChecked', selected: false },
        { label: 'Representante', id: 'flexCheckChecked', selected: false },
        { label: 'Departamento', id: 'flexCheckChecked', selected: false },
        { label: 'Provincia', id: 'flexCheckChecked', selected: false },
        { label: 'Distrito', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha inicio', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha fin', id: 'flexCheckChecked', selected: false },
        { label: 'estado', id: 'flexCheckChecked', selected: false },
        { label: 'tipo servicio', id: 'flexCheckChecked', selected: false },
        { label: 'vehiculos', id: 'flexCheckChecked', selected: false }
      ]
    },
    {
      title: 'Vehiculo',
      isOpen: false,
      options: [
        { label: 'Placa', id: 'flexCheckDefault', selected: true },
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
        { label: 'Fecha inicial', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha final', id: 'flexCheckChecked', selected: false }

      ]
    }
  ];

  popoversData = [
    
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
    }
   
  ];
  // getSelectedOptions(): void {
  //   const selectedOptions = this.popovers
  //     .map(popover => ({
  //       category: popover.title,
  //       selectedItems: popover.options
  //         .filter(option => option.selected)
  //         .map(option => option.label)
  //     }))
  //     .filter(popover => popover.selectedItems.length > 0); // Filtra los vacíos

  //   console.log(selectedOptions);
  // }

  // Método que se activa al hacer clic en cualquier parte del componente
  togglePopover(event: MouseEvent, index: number): void {
    // Evita que el popover se cierre cuando se haga clic en el propio botón del popover
    event.stopPropagation();

    // Si el popover ya está abierto, lo cerramos
    this.popoversColumn[index].isOpen = !this.popoversColumn[index].isOpen;
    this.popoversData[index].isOpen = !this.popoversData[index].isOpen;
  }

  // Método para evitar que el clic dentro de los checkboxes cierre el popover
  preventClosePopover(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Escuchar clics fuera del componente para cerrar el popover
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    this.popoversColumn.forEach((popover, index) => {
      // Si el clic ocurrió fuera del popover y su contenido está abierto, lo cerramos
      const popoverContainer = document.getElementById('popover' + (index + 1));
      if (popoverContainer && !popoverContainer.contains(event.target as Node)) {
        popover.isOpen = false;
      }
    });

    this.popoversData.forEach((popover, index) => {
      // Si el clic ocurrió fuera del popover y su contenido está abierto, lo cerramos
      const popoverContainer = document.getElementById('popover' + (index + 1));
      if (popoverContainer && !popoverContainer.contains(event.target as Node)) {
        popover.isOpen = false;
      }
    });
  }






  listaEmpresasServicio: ListaEmpresaServicioReporteResponse[] = [];   listaEmpresasServicioTemp: ListaEmpresaServicioReporteResponse[] = []; 
  listaVehiculos: ListaVehiculosDetallReporteResponse[] = []; 

  paginaActual: number = 1;

  constructor(private reporteService: ReporteService) { }



  ngOnInit(): void {
    this.listarEmpresasSevicios()
    this.listarVehiculos()

  }



  cambiarPagina(event: number) {
    this.paginaActual = event;
  }


  obtenerVehiculosPorEmpresa(idEmpresaServicio: number) {
    return this.listaVehiculos.filter((v: ListaVehiculosDetalleResponse) => v.id_empresa_servicio === idEmpresaServicio);
  }


  listarEmpresasSevicios() {

    this.reporteService.ListarEmpresasServicios().subscribe({
      next: (res: ListaEmpresaServicioReporteResponse[]) => {
        this.listaEmpresasServicio = res
        this.listaEmpresasServicioTemp = res

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

  listarVehiculos(): any {
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
  
    // Obtener opciones seleccionadas
    const selectedOptions = this.popoversColumn.map(popover => ({
      category: popover.title,
      selectedItems: popover.options.filter(option => option.selected).map(option => option.label)
    }));
  
    // Verificar si "vehiculos" en "Empresa Servicio" está seleccionado
    const exportarVehiculos = selectedOptions.find(opt => opt.category === "Empresa Servicio")
      ?.selectedItems.includes("vehiculos");
  
    // Obtener las columnas seleccionadas dinámicamente
    let selectedColumns = selectedOptions
      .flatMap(opt => opt.selectedItems)
      .filter(col => exportarVehiculos || !this.isVehiculoColumn(col)); // Excluir columnas de vehículos si no se exportan
  
    // CABECERA con solo columnas seleccionadas
    dataToExport.push(["Nro", ...selectedColumns]);
  
    // RECORRER EMPRESAS
    this.listaEmpresasServicio.forEach((empresa, index) => {
      let rowEmpresa: any[] = [index + 1]; // Primera columna: índice
      let vehiculos = exportarVehiculos ? this.obtenerVehiculosPorEmpresa(empresa.id_empresa_servicio) : [];
  
      // LLENAR DATOS DE EMPRESA SEGÚN OPCIONES SELECCIONADAS
      selectedColumns.forEach(col => {
        rowEmpresa.push(this.getEmpresaData(empresa, col));
      });
  
      // AÑADIR FILA DE EMPRESA
      dataToExport.push(rowEmpresa);
  
      // AGREGAR VEHÍCULOS SOLO SI LA OPCIÓN "vehiculos" ESTÁ SELECCIONADA
      if (exportarVehiculos && vehiculos.length > 0) {
        vehiculos.forEach(vehiculo => {
          let rowVehiculo: any[] = [""];
          selectedColumns.forEach(col => {
            rowVehiculo.push(this.getVehiculoData(vehiculo, col));
          });
          dataToExport.push(rowVehiculo);
        });
      }
    });
  
    // CREAR HOJA DE EXCEL
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
  
    // AUTOAJUSTE DEL ANCHO DE COLUMNAS
    ws["!cols"] = selectedColumns.map(() => ({ wch: 15 })); // Ajuste dinámico
  
    // AÑADIR HOJA AL LIBRO
    XLSX.utils.book_append_sheet(wb, ws, "Reporte Empresas");
  
    // DESCARGAR EXCEL
    XLSX.writeFile(wb, "reporte_empresas_servicio.xlsx");
  }
  
  // FUNCIONES AUXILIARES
  
  // Determinar si una columna pertenece a "Vehículo"
  isVehiculoColumn(column: string): boolean {
    const columnasVehiculos = [
      "Placa", "Marca", "Modelo", "Categoria", "Año", "Peso Neto(Tn)", "Carga Util(Tn)",
      "Carroceria", "Modalidad", "Nro Part Reg", "Estado", "Nro Chasis", "Nro Asientos",
      "Serie", "color", "itinerario", "Fecha inicial", "Fecha final"
    ];
    return columnasVehiculos.includes(column);
  }
  
  // Obtener datos de empresa según la columna
  getEmpresaData(empresa: any, col: string): any {
    switch (col) {
      case 'Razon Social': return empresa.razon_social;
      case 'Ruc': return empresa.ruc;
      case 'Representante': return `${empresa.nombres} ${empresa.ap_paterno} ${empresa.ap_materno}`;
      case 'Departamento': return empresa.departamento;
      case 'Provincia': return empresa.provincia;
      case 'Distrito': return empresa.distrito;
      case 'Fecha inicio': return empresa.fecha_inicial;
      case 'Fecha fin': return empresa.fecha_final;
      case 'estado': return empresa.estado;
      case 'tipo servicio': return empresa.tipo_servicio;
      case 'vehiculos': return "Con vehículos";
      default: return "";
    }
  }
  
  // Obtener datos de vehículo según la columna
  getVehiculoData(vehiculo: any, col: string): any {
    switch (col) {
      case 'Placa': return vehiculo.placa;
      case 'Marca': return vehiculo.marca;
      case 'Modelo': return vehiculo.modelo;
      case 'Categoria': return vehiculo.categoria;
      case 'Año': return vehiculo.anio_fabricacion;
      case 'Peso Neto(Tn)': return vehiculo.peso;
      case 'Carga Util(Tn)': return vehiculo.carga;
      case 'Carroceria': return vehiculo.carroceria;
      case 'Modalidad': return vehiculo.modalidad;
      case 'Nro Part Reg': return vehiculo.nro_part_reg;
      case 'Estado': return vehiculo.estado;
      case 'Nro Chasis': return vehiculo.nro_chasis;
      case 'Nro Asientos': return vehiculo.nro_asientos;
      case 'Serie': return vehiculo.serie;
      case 'color': return vehiculo.color;
      case 'itinerario': return vehiculo.itinerario;
      case 'Fecha inicial': return vehiculo.fecha_inicial;
      case 'Fecha final': return vehiculo.fecha_final;
      default: return "";
    }
  }
  
  
  
  
  

  // ExporToExcel(): void {
  //   let wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   let dataToExport: any[] = [];
  
  //   // Obtener columnas seleccionadas
  //   const selectedColumns = this.popoversColumn.flatMap(popover =>
  //     popover.options.filter(option => option.selected).map(option => option.label)
  //   );
  
  //   // CABECERA DINÁMICA SEGÚN OPCIONES SELECCIONADAS
  //   dataToExport.push(["Nro", ...selectedColumns]);
  
  //   // RECORRER EMPRESAS Y VEHÍCULOS
  //   this.listaEmpresasServicio.forEach((empresa, index) => {
  //     let rowEmpresa: any[] = [index + 1]; // Primera columna: índice
  //     let vehiculos = this.obtenerVehiculosPorEmpresa(empresa.id_empresa_servicio);
  
  //     // LLENAR DATOS SEGÚN OPCIONES SELECCIONADAS
  //     selectedColumns.forEach(col => {
  //       switch (col) {
  //         case 'Razon Social': rowEmpresa.push(empresa.razon_social); break;
  //         case 'Ruc': rowEmpresa.push(empresa.ruc); break;
  //         case 'Representante': rowEmpresa.push(`${empresa.nombres} ${empresa.ap_paterno} ${empresa.ap_materno}`); break;
  //         case 'Departamento': rowEmpresa.push(empresa.departamento); break;
  //         case 'Provincia': rowEmpresa.push(empresa.provincia); break;
  //         case 'Distrito': rowEmpresa.push(empresa.distrito); break;
  //         case 'Fecha inicio': rowEmpresa.push(empresa.fecha_inicial); break;
  //         case 'Fecha fin': rowEmpresa.push(empresa.fecha_final); break;
  //         case 'estado': rowEmpresa.push(empresa.estado); break;
  //         case 'tipo servicio': rowEmpresa.push(empresa.tipo_servicio); break;
  //         case 'vehiculos': rowEmpresa.push(vehiculos.length > 0 ? "Con vehículos" : "Sin vehículos"); break;
  //         default: rowEmpresa.push(""); break; // Espacios vacíos si no hay coincidencia
  //       }
  //     });
  
  //     // AÑADIR FILA DE EMPRESA
  //     dataToExport.push(rowEmpresa);
  
  //     // AGREGAR VEHÍCULOS DEBAJO DE LA EMPRESA
  //     if (vehiculos.length > 0) {
  //       vehiculos.forEach(vehiculo => {
  //         let rowVehiculo: any[] = [""];
  //         selectedColumns.forEach(col => {
  //           switch (col) {
  //             case 'Placa': rowVehiculo.push(vehiculo.placa); break;
  //             case 'Marca': rowVehiculo.push(vehiculo.marca); break;
  //             case 'Modelo': rowVehiculo.push(vehiculo.modelo); break;
  //             case 'Categoria': rowVehiculo.push(vehiculo.categoria); break;
  //             case 'Año': rowVehiculo.push(vehiculo.anio_fabricacion); break;
  //             case 'Peso Neto(Tn)': rowVehiculo.push(vehiculo.peso); break;
  //             case 'Carga Util(Tn)': rowVehiculo.push(vehiculo.carga); break;
  //             case 'Carroceria': rowVehiculo.push(vehiculo.carroceria); break;
  //             case 'Modalidad': rowVehiculo.push(vehiculo.modalidad); break;
  //             case 'Nro Part Reg': rowVehiculo.push(vehiculo.nro_part_reg); break;
  //             case 'Estado': rowVehiculo.push(vehiculo.estado); break;
  //             case 'Nro Chasis': rowVehiculo.push(vehiculo.nro_chasis); break;
  //             case 'Nro Asientos': rowVehiculo.push(vehiculo.nro_asientos); break;
  //             case 'Serie': rowVehiculo.push(vehiculo.serie); break;
  //             case 'color': rowVehiculo.push(vehiculo.color); break;
  //             case 'itinerario': rowVehiculo.push(vehiculo.itinerario); break;
  //             case 'Fecha inicial': rowVehiculo.push(vehiculo.fecha_inicial); break;
  //             case 'Fecha final': rowVehiculo.push(vehiculo.fecha_final); break;
  //             default: rowVehiculo.push(""); break;
  //           }
  //         });
  //         dataToExport.push(rowVehiculo);
  //       });
  //     }
  
  //     // FILA VACÍA PARA SEPARAR EMPRESAS
  //     dataToExport.push([]);
  //   });
  
  //   // CREAR HOJA DE EXCEL
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
  
  //   // AUTOAJUSTE DEL ANCHO DE COLUMNAS
  //   ws["!cols"] = selectedColumns.map(() => ({ wch: 15 })); // Ajuste dinámico
  
  //   // AÑADIR HOJA AL LIBRO
  //   XLSX.utils.book_append_sheet(wb, ws, "Reporte Empresas");
  
  //   // DESCARGAR EXCEL
  //   XLSX.writeFile(wb, "reporte_empresas_servicio.xlsx");
  // }
  


  // ExporToExcel(): void {
  //   let wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   let dataToExport: any[] = [];

  //   // CABECERA
  //   dataToExport.push([
  //     "Nro", "EXP", "EMPRESA", "RUC", "TIPO DE TRANSPORTE", "FECH_INICIO", "FECH_FINAL", "ESTADO",
  //     "Placa", "Modelo", "Marca", "Fecha Inicio", "Fecha Final"
  //   ]);

  //   // RECORRER EMPRESAS Y VEHÍCULOS
  //   this.listaEmpresasServicio.forEach((empresa, index) => {
  //     let vehiculos = this.obtenerVehiculosPorEmpresa(empresa.id_empresa_servicio);

  //     // FILA DE EMPRESA (SIN VEHÍCULOS AÚN)
  //     dataToExport.push([
  //       index + 1, empresa.expediente, empresa.razon_social, empresa.ruc, empresa.tipo_servicio,
  //       empresa.fecha_inicial, empresa.fecha_final, empresa.estado,
  //       "", "", "", "", "" // Espacios vacíos para alinear
  //     ]);

  //     // AGREGAR VEHÍCULOS DEBAJO DE SU EMPRESA
  //     if (vehiculos.length > 0) {
  //       vehiculos.forEach(vehiculo => {
  //         dataToExport.push([
  //           "", "", "", "", "", "", "", "", // Espacios vacíos para no repetir empresa
  //           vehiculo.placa, vehiculo.modelo, vehiculo.marca, vehiculo.fecha_inicial, vehiculo.fecha_final
  //         ]);
  //       });
  //     } else {
  //       // SI NO HAY VEHÍCULOS, MOSTRAR "SIN VEHÍCULOS"
  //       dataToExport.push(["", "", "", "", "", "", "", "", "Sin vehículos", "", "", "", ""]);
  //     }

  //     // FILA VACÍA PARA SEPARACIÓN ENTRE EMPRESAS
  //     dataToExport.push([]);
  //   });

  //   // CREAR HOJA DE EXCEL
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);

  //   // AUTOAJUSTE DEL ANCHO DE COLUMNAS
  //   ws["!cols"] = [
  //     { wch: 5 }, { wch: 10 }, { wch: 30 }, { wch: 15 }, { wch: 20 },
  //     { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 12 }, { wch: 12 },
  //     { wch: 12 }, { wch: 15 }, { wch: 15 }
  //   ];

  //   // AÑADIR HOJA AL LIBRO
  //   XLSX.utils.book_append_sheet(wb, ws, "Reporte Empresas");

  //   // DESCARGAR EXCEL
  //   XLSX.writeFile(wb, "reporte_empresas_servicio.xlsx");
  // }


  // -------------------------------
  filterData(): void {
    const selectedOptions = this.popoversData
      .map(popover => ({
        category: popover.title,
        selectedItems: popover.options
          .filter(option => option.selected)
          .map(option => option.label)
      }))
      .filter(popover => popover.selectedItems.length > 0); // Filtra los vacíos

    // Filtrar lista de empresas
    const filteredEmpresas = this.listaEmpresasServicioTemp.filter(empresa => {
      return selectedOptions.every(option => {
        switch (option.category) {
          case 'Tipo de Servicio':
            return option.selectedItems.some(item => {
              switch (item) {
                case 'T. Personas':
                  return empresa.id_tipo_servicio == 1;  // 1 es para personas
                case 'T. Turistico':
                  return empresa.id_tipo_servicio == 2;  // 2 es para turismo
                case 'T. Estudiantes':
                  return empresa.id_tipo_servicio == 3;  // 3 es para estudiantes
                case 'T. Trabajadores':
                  return empresa.id_tipo_servicio == 4;  // 4 es para trabajadores
                default:
                  return true;
              }
            });
          case 'Empresa Estado':
            return option.selectedItems.some(item => {
              switch (item) {
                case 'Activo':
                  return empresa.estado === 'Activo';
                case 'Alerta':
                  return empresa.estado === 'Alerta';
                case 'Inactivo':
                  return empresa.estado === 'Inactivo';
                default:
                  return true;
              }
            });
          
          default:
            return true;
        }
      });
    });

    this.listaEmpresasServicio = filteredEmpresas; 
  }



  // Función para normalizar el texto de búsqueda-------------------
  searchTerm(value: string): string {
    return value ? value.toLowerCase() : '';
  }

  getSelectedColumnsEmpresas() {
    return this.popoversColumn
      .map(popover => ({
        category: popover.title,
        selectedItems: popover.options
          .filter(option => option.selected)
          .map(option => option.label)
      }))
      .filter(popover => popover.selectedItems.length > 0); // Filtra las categorías que tienen opciones seleccionadas
  }

  shouldShowColumnEmpresa(columnName: string): boolean {
    const selectedColumns = this.getSelectedColumnsEmpresas();
    return selectedColumns.some(popover => popover.selectedItems.includes(columnName));
  }
  // -----------------------------------------------------------------------------------------------------------
  // Función para normalizar el texto de búsqueda

 

  getSelectedColumnsVehiculos() {
    return this.popoversColumn
      .map(popover => ({
        category: popover.title,
        selectedItems: popover.options
          .filter(option => option.selected)
          .map(option => option.label)
      }))
      .filter(popover => popover.selectedItems.length > 0); // Filtra las categorías que tienen opciones seleccionadas
  }


  
  shouldShowVehicleColumn(columnName: string): boolean {
    const selectedColumns = this.getSelectedColumnsVehiculos();
    return selectedColumns.some(popover => popover.selectedItems.includes(columnName));
  }
  // -------------------------------




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
