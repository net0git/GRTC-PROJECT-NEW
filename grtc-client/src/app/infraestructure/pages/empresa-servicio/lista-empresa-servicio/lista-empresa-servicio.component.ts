import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { Router } from '@angular/router';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';



@Component({
  selector: 'app-lista-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, NgxPaginationModule],
  templateUrl: './lista-empresa-servicio.component.html',
  styleUrl: './lista-empresa-servicio.component.css'
})
export class ListaEmpresaServicioComponent implements OnInit {

  disableInvitado='display: block';

  listaEmpresasServicio: ListaEmpresaServicioResponse[] = [];
  listaEmpresasServicioTemp: ListaEmpresaServicioResponse[] = [];
  paginaActual: number = 1;
  cantidad_t_personas:number=0;
  cantidad_t_turismo:number=0;
  cantidad_t_estudiantes:number=0;
  cantidad_t_trabajadores:number=0;
  constructor(private router: Router, private empresaServicioService: EmpresaServicioService, private credencialesService: CredencialesService) { }

  ngOnInit(): void {
    this.listarEmpresaServicio()
    this.verPerfil();
  }

  //disableInvitado='display: block';

  verPerfil(){
    if(this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
  }

  listarEmpresaServicio() {
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
  
  filtrarEmpresa(id: number) {
    this.paginaActual = 1;
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

  restaurarEmpresas() {
    this.paginaActual = 1;
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp;
     (<HTMLSelectElement>document.getElementById('tipo_doc_table')).value = '';
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
  
  //  buscarEnObjeto(event: any) {
  
  //     const textoBusqueda = event.target.value.toLowerCase();
  //     this.listaInfraestructura = this.listaInfraestructuraTemp.filter((objeto: ListaInfraestructuraResponse) => {
  //       const expediente = objeto.expediente ? objeto.expediente.toLowerCase() : '';
  //       const infraestructura = objeto.nombre_infraestructura ? objeto.nombre_infraestructura.toLowerCase() : '';
  //       const direccion = objeto.direccion ? objeto.direccion.toLowerCase() : '';
  
  //       return expediente.includes(textoBusqueda) ||
  //       infraestructura.includes(textoBusqueda) ||
  //       direccion.includes(textoBusqueda) 
  //     });
  //   }
  buscarEnObjeto(event: any) {
    this.paginaActual = 1;
    const textoBusqueda = event.target.value.toLowerCase();
    this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((objeto: ListaEmpresaServicioResponse) => {
      const empresa = objeto.empresa ? objeto.empresa.toLowerCase() : '';
      const ruc = objeto.ruc ? objeto.ruc.toLowerCase() : '';
      
      return empresa.includes(textoBusqueda) ||
        ruc.includes(textoBusqueda) 
    });
    // const textoBusqueda = event.target.value.toLowerCase();
    // this.listaEmpresasServicio = this.listaEmpresasServicioTemp.filter((objeto: ListaEmpresaServicioResponse) => {
    //   const expediente = objeto.expediente ? objeto.expediente.toLowerCase() : '';
    //   const empresa = objeto.empresa ? objeto.empresa.toLowerCase() : '';
    //   const ruc = objeto.ruc ? objeto.ruc.toLowerCase() : '';
    //   const estado = objeto.estado ? objeto.estado.toLowerCase() : '';

    //   return expediente.includes(textoBusqueda) ||
    //     empresa.includes(textoBusqueda) ||
    //     ruc.includes(textoBusqueda) ||
    //     estado.includes(textoBusqueda)
    // });

  }

  crearEmpresaServicio() {
    this.router.navigate(['/principal/crear-empresa-servicio']);
  }

  detalleEmpresaServicio(id_empresa_servicio: number) {
    this.router.navigate(['/principal/detalle-empresa-servicio/' + id_empresa_servicio]);
  }
}
