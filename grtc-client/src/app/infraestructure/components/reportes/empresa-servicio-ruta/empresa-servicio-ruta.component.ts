import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReporteService } from '../../../../infraestructure/services/remoto/reporte/reporte.service';

@Component({
  selector: 'app-reporte-empresa-servicio-ruta',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './empresa-servicio-ruta.component.html',
  styleUrl: './empresa-servicio-ruta.component.css'
})
export class EmpresaServicioRutaComponent implements OnInit {

  nroEmpresasRuta: any=[];
  listaVehiculosRutaOrigen: any=[];

  paginaActual: number = 1;

  constructor(private reporteService: ReporteService) { }
  ngOnInit(): void {
    
    this.CantidadEmpresasRuta()
  }

  cambiarPagina(event: number) {
    this.paginaActual = event;
  }

  CantidadEmpresasRuta():void{
    this.reporteService.CantidadEmpresasRuta().subscribe({
      next: (res: any) => {
        console.log(res);
        this.nroEmpresasRuta=res
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('cantidad de empresas por ruta obtenida');
      }
    })
  }

  ObtenerEmpresasPorRutaOrigenDestino(origen: string, destino: string){
    this.paginaActual=1
    this.reporteService.ObtenerEmpresasPorRutaOrigenDestino(origen, destino).subscribe({
      next: (data: any) => {
        console.log(data);
        this.listaVehiculosRutaOrigen=data
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('empresas por ruta origen y destino enocntrados');
      }
    })
  }
}
