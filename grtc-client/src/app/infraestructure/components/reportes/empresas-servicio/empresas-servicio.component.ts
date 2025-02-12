import { Component, OnInit } from '@angular/core';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-empresas-servicio',
  standalone: true,
  imports: [ CommonModule, NgxPaginationModule],
  templateUrl: './empresas-servicio.component.html',
  styleUrl: './empresas-servicio.component.css'
})
export class EmpresasServicioComponent implements OnInit {

  listaEmpresasServicio: ListaEmpresaServicioResponse[] = [];
  listaEmpresasServicioTemp: ListaEmpresaServicioResponse[] = [];
  cantidad_t_personas:number=0;
  cantidad_t_turismo:number=0;
  cantidad_t_estudiantes:number=0;
  cantidad_t_trabajadores:number=0;

  cantidadEmpresas: any = []; //cantidad de empresas por servicio

  disableInvitado = ''//variable temporal para cambiar el estado del html

  p: number = 1;
  constructor(private empresaServicioService: EmpresaServicioService, private credencialesService: CredencialesService) { }
  ngOnInit(): void {
    this.listarEmpresasSevicios()
    console.log('entro al ngOnInit')
  }

  selectedButton: number | null = null; // Índice del botón seleccionado

  selectButton(index: number) {
    this.selectedButton = index;
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


  contador_tipo_transporte(){
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
   
  }

  filtrarEmpresa(id: number) {
    this.p = 1;
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((empresa: { id_tipo_servicio: number; }) => empresa.id_tipo_servicio == id);
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

  buscarEnObjeto(event: any) {
    
    this.p=1;
    const textoBusqueda = event.target.value.toLowerCase();
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((objeto: ListaEmpresaServicioResponse) => {
      const empresa = objeto.empresa ? objeto.empresa.toLowerCase() : '';
      const ruc = objeto.ruc ? objeto.ruc.toLowerCase() : '';

      return  empresa.includes(textoBusqueda) ||
        ruc.includes(textoBusqueda) 
    });
  }

  ExporToExcel():void{
    
    let allData = this.listaEmpresasServicio; // Asegúrate de obtener todos los registros

    let filteredData = allData.map(({ id_empresa_servicio, id_tipo_servicio,expediente,porcentaje, fecha_inicial, fecha_final, ...rest }) => ({
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
  
}
