import { Component, OnInit } from '@angular/core';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-empresas-servicio',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './empresas-servicio.component.html',
  styleUrl: './empresas-servicio.component.css'
})
export class EmpresasServicioComponent implements OnInit {

  ListaEmpresas: any = [];//en este arreglo se almanara la informacion que deseamos mostrar en la tabla
  ListaEmpresasTemp: any = [];//en este arreglo reservaremos una copia de la informacion de empresas


  cantidadEmpresas: any = []; //cantidad de empresas por servicio

  disableInvitado = ''//variable temporal para cambiar el estado del html

  constructor(private empresaServicioService: EmpresaServicioService, private credencialesService: CredencialesService) { }
  ngOnInit(): void {
    this.listarEmpresasSevicios()
    console.log('entro al ngOnInit')
    // this.actualizarDatos()
    this.obtenerCantidadEmpresas()
    if (this.credencialesService.credenciales.rol == 'INVITADO') {
      this.disableInvitado = 'display: none';
    }
  }



  listarEmpresasSevicios() {
    this.empresaServicioService.listarEmpresasServicio().subscribe({
      next: (data) => {
        this.ListaEmpresasTemp = data;
        this.ListaEmpresas = data;
        console.log(this.ListaEmpresasTemp);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Lista Empresas Servicios Completada');
      }
    })
  }
  obtenerCantidadEmpresas() {
    
  }

  restaurarEmpresas() {
   
  }

  filtrarEmpresa(id: number) {
    this.ListaEmpresas = this.ListaEmpresasTemp.filter((empresa: { id_tipo_servicio: number; }) => empresa.id_tipo_servicio == id);
    this.ListaEmpresasTemp = this.ListaEmpresas
  }

  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    let objetosFiltrados: any = [];
    // Filtrar los objetos según el texto de búsqueda
    objetosFiltrados = this.ListaEmpresasTemp.filter((objeto: 
      { empresa: string;
        ruc: string; 
        estado: string;
        fecha_inicial: string;
        fecha_final: string;
        tipo_servicio: string;
       }) => {
      const empresa = objeto.empresa.toLowerCase();
      const ruc = objeto.ruc.toLowerCase();
      const estado = objeto.estado.toLowerCase();
      const fecha_inicial = objeto.fecha_inicial.toLowerCase();
      const fecha_final = objeto.fecha_final.toLowerCase();
      
      const tipo_servicio = objeto.tipo_servicio.toLowerCase();
      
      return empresa.includes(textoBusqueda) || ruc.includes(textoBusqueda)|| estado.includes(textoBusqueda)|| fecha_inicial.includes(textoBusqueda) ||fecha_final.includes(textoBusqueda) || tipo_servicio.includes(textoBusqueda);
    });
    this.ListaEmpresas=this.ListaEmpresasTemp
  }

  // ExporToExcel():void{
  //   //import * as XLSX from 'xlsx';
  //   // Obtenemos una referencia al elemento que contiene la tabla que deseamos exportar a Excel
  //   let element = document.getElementById('excel-table');
  
  //   // Convertimos la tabla en una hoja de trabajo (WorkSheet) de Excel utilizando la función table_to_sheet
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
  //   // Creamos una nueva hoja de trabajo (WorkBook) de Excel
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
  //   // Agregamos la hoja de trabajo que creamos anteriormente al libro de trabajo
  //   // La hoja de trabajo se llama 'Sheet1', pero puedes personalizar este nombre
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  //   // Utilizamos la función writeFile para guardar el libro de trabajo como un archivo Excel
  //   // this.fileNameExcel debe ser una variable que contiene el nombre que deseas darle al archivo
  //   XLSX.writeFile(wb, 'reporte.xlsx');
  
  // }
  
}
