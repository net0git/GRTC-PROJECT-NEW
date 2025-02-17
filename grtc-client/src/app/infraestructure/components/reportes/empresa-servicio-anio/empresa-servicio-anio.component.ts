import { Component, OnInit } from '@angular/core';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { Validators } from '../../../../../../public/utils/validators';
import { SoloNumerosGuionComaDirective } from '../../../directives/solo-numeros-guion-coma.directive';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-empresa-servicio-anio',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, SoloNumerosGuionComaDirective, FormsModule ],
  templateUrl: './empresa-servicio-anio.component.html',
  styleUrl: './empresa-servicio-anio.component.css'
})
export class EmpresaServicioAnioComponent implements OnInit {

  listaEmpresasServicio: ListaEmpresaServicioResponse[] = [];
  listaEmpresasServicioTemp: ListaEmpresaServicioResponse[] = [];

  paginaActual: number = 1;

  anioFormato:string =''

  constructor(private empresaServicioService: EmpresaServicioService, ) { }

  ngOnInit(): void {
    this.listarEmpresasSevicios()
  }

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
      }
    })
  }

  buscarEmpresas() {
    // Obtener el valor del input
    const input = this.anioFormato.trim();
    
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


  limpiarBusqueda(){
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp;
    this.anioFormato = "";
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

}
