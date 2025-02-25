import { Component, OnInit } from '@angular/core';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-empresas-servicio',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './empresas-servicio.component.html',
  styleUrl: './empresas-servicio.component.css'
})
export class EmpresasServicioComponent implements OnInit {

  listaEmpresasServicio: ListaEmpresaServicioResponse[] = [];
  listaEmpresasServicioTemp: ListaEmpresaServicioResponse[] = [];
  cantidad_t_personas: number = 0;
  cantidad_t_turismo: number = 0;
  cantidad_t_estudiantes: number = 0;
  cantidad_t_trabajadores: number = 0;

  cantidadEmpresas: any = []; //cantidad de empresas por servicio


  paginaActual: number = 1;
  constructor(private empresaServicioService: EmpresaServicioService, private credencialesService: CredencialesService) { }
  ngOnInit(): void {
    this.listarEmpresasSevicios()
    console.log('entro al ngOnInit')
    this.verPerfil();
  }
  disableInvitado='display: block';
  verPerfil(){
    if(this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
  }

  selectedButton: number | null = null; // Índice del botón seleccionado

  

  cambiarPagina(event: number) {
    this.paginaActual = event;
  }


  listarEmpresasSevicios() {
    this.empresaServicioService.listarEmpresasServicio().subscribe({
      next: (res: ListaEmpresaServicioResponse[]) => {
        this.listaEmpresasServicio = res
        this.listaEmpresasServicioTemp = res
        console.log(this.listaEmpresasServicio)
      },
      error: (err) => {
        console.error('Error al obtener empresas de servicio:', err)
      },
      complete: () => {
        console.log('Obtención de empresas de servicio completada')
        this.contador_tipo_transporte()
      }
    })
  }


  contador_tipo_transporte() {
    this.listaEmpresasServicioTemp.forEach((empresa: ListaEmpresaServicioResponse) => {
      switch (empresa.id_tipo_servicio) {
        case 1:
          this.cantidad_t_personas++;
          break;
        case 2:
          this.cantidad_t_turismo++;
          break;
        case 3:
          this.cantidad_t_trabajadores++;
          break;
        case 4:
          this.cantidad_t_estudiantes++;
          break;
        default:
          // Si el valor no coincide con ninguno, puedes manejarlo aquí si lo necesitas.
          break;
      }
    });
  }

  restaurarEmpresas() {
    this.paginaActual = 1;
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp;
    (<HTMLSelectElement>document.getElementById('tipo_doc_table')).value = '';
    (<HTMLSelectElement>document.getElementById('estado_table')).value = '';
  }

  filtrarEmpresa(id: number) {
    this.paginaActual = 1;
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((empresa: { id_tipo_servicio: number; }) => empresa.id_tipo_servicio == id);
    (<HTMLSelectElement>document.getElementById('estado_table')).value = '';
  }



  seleccionarTipoTransporte(event: any) {
    // Obtener el valor seleccionado
    const valorSeleccionado = event.target.value;

    // Aquí puedes ejecutar tu lógica según el valor seleccionado
    switch (valorSeleccionado) {
      case '1':
        // Lógica para Transporte de personas
        this.filtrarEmpresa(valorSeleccionado);

        break;
      case '2':
        // Lógica para Transporte turístico
        this.filtrarEmpresa(valorSeleccionado);

        break;
      case '3':
        // Lógica para Transporte de trabajadores
        this.filtrarEmpresa(valorSeleccionado);

        break;
      case '4':
        // Lógica para Transporte escolar
        this.filtrarEmpresa(valorSeleccionado);

        break;
      default:
        // Lógica para el caso por defecto (ninguna opción seleccionada)
        this.restaurarEmpresas();

        break;
    }
  }

  filtrarEstado(estado: string) {
    this.paginaActual = 1;
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((empresa: { estado: string; }) => empresa.estado == estado);
    (<HTMLSelectElement>document.getElementById('tipo_doc_table')).value = '';
  }

  seleccionarEstado(event: any) {
    // Obtener el valor seleccionado
    const valorSeleccionado = event.target.value;

    // Aquí puedes ejecutar tu lógica según el valor seleccionado
    switch (valorSeleccionado) {
      case '1':
        // Lógica para Transporte de personas
        this.filtrarEstado('Activo');

        break;
      case '2':
        // Lógica para Transporte turístico
        this.filtrarEstado('Alerta');

        break;
      case '3':
        // Lógica para Transporte de trabajadores
        this.filtrarEstado('Inactivo');
        break;
      default:
        // Lógica para el caso por defecto (ninguna opción seleccionada)
        this.restaurarEmpresas();

        break;
    }
  }

  buscarEnObjeto(event: any) {

    this.paginaActual = 1;
    const textoBusqueda = event.target.value.toLowerCase();
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((objeto: ListaEmpresaServicioResponse) => {
      const empresa = objeto.empresa ? objeto.empresa.toLowerCase() : '';
      const ruc = objeto.ruc ? objeto.ruc.toLowerCase() : '';

      return empresa.includes(textoBusqueda) ||
        ruc.includes(textoBusqueda)
    });
  }

  ExporToExcel(): void {

    let allData = this.listaEmpresasServicio; // Asegúrate de obtener todos los registros

    let filteredData = allData.map(({ id_empresa_servicio, id_tipo_servicio, expediente, porcentaje, fecha_inicial, fecha_final, ...rest }) => ({
      ...rest,
      fecha_inicial: fecha_inicial ? new Date(fecha_inicial).toLocaleDateString('es-ES') : '',
      fecha_final: fecha_final ? new Date(fecha_final).toLocaleDateString('es-ES') : ''
    }));

    // Convertimos los datos a una hoja de trabajo de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // Creamos un nuevo libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Guardamos el archivo Excel
    XLSX.writeFile(wb, 'reporte_empresas_servicio.xlsx');

  }

  filtrarEmpresas(): void {
    // Obtener el estado de los checkboxes
    this.paginaActual = 1;
    const filtros: any = {
        persona: (document.getElementById("flexCheckPersona") as HTMLInputElement).checked,
        turismo: (document.getElementById("flexCheckTurismo") as HTMLInputElement).checked,
        estudiante: (document.getElementById("flexCheckEstudiante") as HTMLInputElement).checked,
        trabajador: (document.getElementById("flexCheckTrabajador") as HTMLInputElement).checked,
        activo: (document.getElementById("flexCheckActivo") as HTMLInputElement).checked,
        alerta: (document.getElementById("flexCheckAlerta") as HTMLInputElement).checked,
        inactivo: (document.getElementById("flexCheckInactivo") as HTMLInputElement).checked,
    };

    // Definir los valores esperados para cada tipo de transporte
    const idTipoServicioMap: Record<string, number> = {
        persona: 1,
        turismo: 2,
        estudiante: 4,  // Error corregido: `estudiante` debería ser `4`, no `3`
        trabajador: 3,
    };

    // Obtener los tipos seleccionados
    const tiposSeleccionados = Object.keys(idTipoServicioMap)
        .filter(key => filtros[key])  // Solo los checkboxes marcados
        .map(key => idTipoServicioMap[key]);

    // Obtener los estados seleccionados
    const estadosSeleccionados = Object.keys(filtros)
        .filter(key => ["activo", "alerta", "inactivo"].includes(key) && filtros[key])
        .map(key => key.charAt(0).toUpperCase() + key.slice(1)); // Convierte "activo" en "Activo"

    // Filtrar la lista en función de los checkboxes seleccionados
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((empresa: ListaEmpresaServicioResponse) => {
        const cumpleTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(empresa.id_tipo_servicio);
        const cumpleEstado = estadosSeleccionados.length === 0 || estadosSeleccionados.includes(empresa.estado);

        return cumpleTipo && cumpleEstado; // Ahora ambos deben cumplirse
    });

    // Si no hay resultados, mostrar mensaje en consola
    if (this.listaEmpresasServicio.length === 0) {
        console.log("No se encontraron coincidencias con los filtros seleccionados.");
    }
    console.log(filtros)
}

}
