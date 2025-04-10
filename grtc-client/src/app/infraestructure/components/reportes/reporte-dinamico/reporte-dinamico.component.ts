import { Component, HostListener, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/remoto/reporte/reporte.service';
import { ListaEmpresaServicioReporteResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { ListaVehiculosDetalleResponse, ListaVehiculosDetallReporteResponse } from '../../../../domain/dto/VehiculoResponse.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { SoloNumerosGuionComaDirective } from '../../../directives/solo-numeros-guion-coma.directive';
import * as XLSX from 'xlsx';
import { Validators } from '../../../../../../public/utils/validators';

@Component({
  selector: 'app-reporte-dinamico',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, SoloNumerosGuionComaDirective],
  templateUrl: './reporte-dinamico.component.html',
  styleUrl: './reporte-dinamico.component.css'
})
export class ReporteDinamicoComponent implements OnInit {

  

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
        { label: 'Ruc', id: 'flexCheckChecked', selected: true },
        { label: 'Representante', id: 'flexCheckChecked', selected: false },
        { label: 'Departamento', id: 'flexCheckChecked', selected: false },
        { label: 'Provincia', id: 'flexCheckChecked', selected: false },
        { label: 'Distrito', id: 'flexCheckChecked', selected: false },
        { label: 'Fecha inicio', id: 'flexCheckChecked', selected: true },
        { label: 'Fecha fin', id: 'flexCheckChecked', selected: true },
        { label: 'estado', id: 'flexCheckChecked', selected: false },
        { label: 'tipo servicio', id: 'flexCheckChecked', selected: true },
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
        { label: 'Color', id: 'flexCheckChecked', selected: false },
        { label: 'Itinerario', id: 'flexCheckChecked', selected: false },
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






  listaEmpresasServicio: ListaEmpresaServicioReporteResponse[] = []; listaEmpresasServicioTemp: ListaEmpresaServicioReporteResponse[] = [];
  listaVehiculos: ListaVehiculosDetallReporteResponse[] = [];

  paginaActual: number = 1;
  anioFormato:string =''
  disableInvitado='display: block';

  constructor(private reporteService: ReporteService, private credencialesService: CredencialesService) { }



  ngOnInit(): void {
    this.listarEmpresasSevicios()
    this.listarVehiculos()
    this.verPerfil();
  }

 

  limpiarBusqueda(){
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp;
    this.anioFormato = "";
  }

  obtenerAnios(input: string): number[] {
    // Formato "2006"
    if (!input.includes("-") && !input.includes(",")) {
      return [parseInt(input)];
    }
    
    // Formato "2006-2008"
    if (input.includes("-")) {
      const [inicio, fin] = input.split("-");
      const años = [];
      for (let i = parseInt(inicio); i <= parseInt(fin); i++) {
        años.push(i);
      }
      return años;
    }
  
    // Formato "2006,2007,2008"
    if (input.includes(",")) {
      return input.split(",").map(año => parseInt(año));
    }
  
    return [];
  }

  
  verPerfil(){
    if(this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
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

    // Obtener si "vehiculos" en "Empresa Servicio" está seleccionado
    const exportarVehiculos = this.popoversColumn
      .find(popover => popover.title === "Empresa Servicio")
      ?.options.find(option => option.label === "vehiculos")?.selected || false;

    // Obtener opciones seleccionadas (sin eliminar "vehiculos" antes)
    const selectedOptions = this.popoversColumn.map(popover => ({
      category: popover.title,
      selectedItems: popover.options
        .filter(option => option.selected) // No excluir "vehiculos" aquí
        .map(option => option.label)
    })).filter(popover => popover.selectedItems.length > 0); // Filtra categorías vacías

    // Obtener las columnas seleccionadas dinámicamente
    let selectedColumns = selectedOptions
      .flatMap(opt => opt.selectedItems)
      .filter(col => exportarVehiculos || !this.isVehiculoColumn(col)); // Excluir columnas de vehículos si no se exportan

    // CABECERA con solo columnas seleccionadas (sin incluir "vehiculos")
    dataToExport.push(["Nro", ...selectedColumns.filter(col => col !== "vehiculos")]);


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

      // AGREGAR VEHÍCULOS SOLO SI "vehiculos" ESTÁ SELECCIONADO
      if (exportarVehiculos && vehiculos.length > 0) {
        vehiculos.forEach(vehiculo => {
           let rowVehiculo: any[] = []; // Primera columna vacía para alinear
          selectedColumns.forEach(col => {
            rowVehiculo.push(this.getVehiculoData(vehiculo, col));
          });
          dataToExport.push(rowVehiculo);
        });
      }

      // 🔥 Solo agregar fila vacía si "vehiculos" está seleccionado
      if (exportarVehiculos) {
        dataToExport.push([]); // Fila separadora
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


  // Determinar si una columna pertenece a "Vehículo"
  isVehiculoColumn(column: string): boolean {
    const columnasVehiculos = [
      "Placa", "Marca", "Modelo", "Categoria", "Año", "Peso Neto(Tn)", "Carga Util(Tn)",
      "Carroceria", "Modalidad", "Nro Part Reg", "Estado", "Nro Chasis", "Nro Asientos",
      "Serie", "Color", "Itinerario", "Fecha inicial", "Fecha final"
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
      // case 'vehiculos': return "Con vehículos";
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
      case 'Color': return vehiculo.color;
      case 'Itinerario': return vehiculo.itinerario;
      case 'Fecha inicial': return vehiculo.fecha_inicial;
      case 'Fecha final': return vehiculo.fecha_final;
      default: return "";
    }
  }

  buscarEmpresasAnio() {
    // Obtener el valor del input
    
    const input = this.anioFormato.trim();
    this.limpiarBusqueda()
    this.anioFormato= input
    // Validar el formato
    if (Validators.anioCompuesto.test(input)) {
      // Extraer los años del input
      const años = this.obtenerAnios(input);
      
      // Filtrar las empresas que coincidan con los años
      const empresasFiltradas = this.listaEmpresasServicioTemp.filter(empresa => {
        // Obtener el año de la fecha_inicial de la empresa
        const añoInicial = new Date(empresa.fecha_inicial).getFullYear();
      
        // Verificar si algún año de la búsqueda coincide con el año de fecha_inicial
        return años.includes(añoInicial);
      });
  
      // Mostrar las empresas filtradas
      if (empresasFiltradas.length > 0) {
        console.log("Empresas encontradas:", empresasFiltradas);
        this.listaEmpresasServicio = empresasFiltradas;
      } else {
        alert("No se encontraron empresas para los años proporcionados.");
      }
  
    } else {
      alert("Formato incorrecto. Asegúrate de ingresar los años correctamente.");
    }
  }
  // -------------------------------
  filterData(): void {
    this.paginaActual=1
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

    const input = this.anioFormato.trim();
    // this.limpiarBusqueda()
    this.anioFormato= input
    // Validar el formato
    if(input!=''){
      if ( Validators.anioCompuesto.test(input)) {
        // Extraer los años del input
        const años = this.obtenerAnios(input);
        
        // Filtrar las empresas que coincidan con los años
        const empresasFiltradas = filteredEmpresas.filter(empresa => {
          // Obtener el año de la fecha_inicial de la empresa
          const añoInicial = new Date(empresa.fecha_inicial).getFullYear();
        
          // Verificar si algún año de la búsqueda coincide con el año de fecha_inicial
          return años.includes(añoInicial);
        });
    
        // Mostrar las empresas filtradas
        if (empresasFiltradas.length > 0) {
          console.log("Empresas encontradas:", empresasFiltradas);
          this.listaEmpresasServicio = empresasFiltradas;
        } else {
          alert("No se encontraron empresas para los años proporcionados.");
        }
    
      } else {
        alert("Formato incorrecto. Asegúrate de ingresar los años correctamente.");
      }
    }else{
      this.listaEmpresasServicio = filteredEmpresas
    }
    
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
