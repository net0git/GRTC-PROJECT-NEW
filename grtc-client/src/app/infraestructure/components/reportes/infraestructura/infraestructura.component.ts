import { Component, OnInit } from '@angular/core';
import { ListaInfraestructuraResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { InfraestructuraService } from '../../../../infraestructure/services/remoto/infraestructura/infraestructura.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-infraestructura-reporte',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './infraestructura.component.html',
  styleUrl: './infraestructura.component.css'
})
export class InfraestructuraComponent implements OnInit {
  listaInfraestructura:ListaInfraestructuraResponse[]=[]; listaInfraestructuraTemp:ListaInfraestructuraResponse[]=[];
  paginaActual:number=1;
  cantidad_t_terrestre:number=0;
  cantidad_er_tipo1:number=0;
  cantidad_er_tipo2:number=0;
  cantidad_er_tipo3:number=0;

  constructor(private infraestructuraService:InfraestructuraService){}
  ngOnInit(): void {
    this.listarInfraestructura()
  }

  cambiarPagina(event: number) {
    this.paginaActual = event;
  }

  restaurar() {
    this.paginaActual = 1;
    this.listaInfraestructura = this.listaInfraestructuraTemp;
    (<HTMLSelectElement>document.getElementById('tipo_infra_table')).value = '';
  }


  listarInfraestructura(){
    this.infraestructuraService.listarInfraestructura().subscribe({
      next:(res:ListaInfraestructuraResponse[])=>{
        this.listaInfraestructura=res
        this.listaInfraestructuraTemp=res
        console.log(this.listaInfraestructura)
      },
      error:(err)=>{
        console.error('Error al obtener infraestructura:',err)
      },
      complete:()=>{
        console.log('Infraestructura obtenida correctamente')
        this.contador_tipo_infraestructura()
      } 
    })
  }

  contador_tipo_infraestructura(){
    this.listaInfraestructura.forEach((infraestructura: ListaInfraestructuraResponse) => {
      switch (infraestructura.id_tipo_infraestructura) {
        case 1:
          this.cantidad_t_terrestre++;
          break;
        case 2:
          this.cantidad_er_tipo1++;
          break;
        case 3:
          this.cantidad_er_tipo2++;
          break;
        case 4:
          this.cantidad_er_tipo3++;
          break;
        default:
          // Si el valor no coincide con ninguno, puedes manejarlo aquí si lo necesitas.
          break;
      }
    });
  }

  filtrarInfraestructura(id: number) {
    this.paginaActual = 1;
    this.listaInfraestructura = this.listaInfraestructuraTemp.filter((infraestructura: { id_tipo_infraestructura: number; }) => infraestructura.id_tipo_infraestructura == id);
  }

  seleccionarTipoTransporte(event: any) {
    // Obtener el valor seleccionado
    const valorSeleccionado = event.target.value;

    // Aquí puedes ejecutar tu lógica según el valor seleccionado
    switch (valorSeleccionado) {
      case '1':
        // Lógica para Transporte de personas
        this.filtrarInfraestructura(valorSeleccionado);

        break;
      case '2':
        // Lógica para Transporte turístico
        this.filtrarInfraestructura(valorSeleccionado);

        break;
      case '3':
        // Lógica para Transporte de trabajadores
        this.filtrarInfraestructura(valorSeleccionado);

        break;
      case '4':
        // Lógica para Transporte escolar
        this.filtrarInfraestructura(valorSeleccionado);

        break;
      default:
        // Lógica para el caso por defecto (ninguna opción seleccionada)
      console.log('seleccionado')

        break;
    }
  }

  buscarEnObjeto(event: any) {

    const textoBusqueda = event.target.value.toLowerCase();
    this.listaInfraestructura = this.listaInfraestructuraTemp.filter((objeto: ListaInfraestructuraResponse) => {
      const expediente = objeto.expediente ? objeto.expediente.toLowerCase() : '';
      const infraestructura = objeto.nombre_infraestructura ? objeto.nombre_infraestructura.toLowerCase() : '';
      const direccion = objeto.direccion ? objeto.direccion.toLowerCase() : '';

      return expediente.includes(textoBusqueda) ||
      infraestructura.includes(textoBusqueda) ||
      direccion.includes(textoBusqueda) 
    });
  }

  ExporToExcel():void{
    
    let allData = this.listaInfraestructura; // Asegúrate de obtener todos los registros

    let filteredData = allData.map(({ id_infraestructura, expediente, fecha_act, ...rest }) => ({
        ...rest,
        fecha_act: fecha_act ? new Date(fecha_act).toLocaleDateString('es-ES') : '',
    }));

    // Convertimos los datos a una hoja de trabajo de Excel
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // Creamos un nuevo libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Guardamos el archivo Excel
    XLSX.writeFile(wb, 'reporte_empresas_servicio.xlsx');
  
  }


  filtrarInfraestructuraCombinada(): void {
    // Obtener el estado de los checkboxes
    this.paginaActual = 1;
    const filtros: any = {
        terminal: (document.getElementById("flexCheckTerminal") as HTMLInputElement).checked,
        estacionTipo1: (document.getElementById("flexCheckEstacionI") as HTMLInputElement).checked,
        estacionTipo2: (document.getElementById("flexCheckEstacionII") as HTMLInputElement).checked,
        estacionTipo3: (document.getElementById("flexCheckEstacionIII") as HTMLInputElement).checked,
    };

    // Definir los valores esperados para cada tipo de transporte
    const idTipoInfraestructuraMap: Record<string, number> = {
      terminal: 1,
      estacionTipo1: 2,
      estacionTipo2: 3, 
      estacionTipo3: 4,
    };

    // Obtener los tipos seleccionados
    const tiposSeleccionados = Object.keys(idTipoInfraestructuraMap)
        .filter(key => filtros[key])  // Solo los checkboxes marcados
        .map(key => idTipoInfraestructuraMap[key]);

   
    // Filtrar la lista en función de los checkboxes seleccionados
    this.listaInfraestructura = this.listaInfraestructuraTemp.filter((infraestructura: ListaInfraestructuraResponse) => {
        const cumpleTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(infraestructura.id_tipo_infraestructura);

        return cumpleTipo  // Ahora ambos deben cumplirse
    });

    // Si no hay resultados, mostrar mensaje en consola
    if (this.listaInfraestructura.length === 0) {
        console.log("No se encontraron coincidencias con los filtros seleccionados.");
    }
}
}
