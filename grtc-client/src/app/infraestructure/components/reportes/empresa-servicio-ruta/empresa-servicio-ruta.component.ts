import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReporteService } from '../../../../infraestructure/services/remoto/reporte/reporte.service';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';

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

  paginaActualEmpresaRuta: number = 1;

  constructor(private reporteService: ReporteService, private credencialesService: CredencialesService) { }
  ngOnInit(): void {
    
    this.CantidadEmpresasRuta()
    this.verPerfil();
  }
  
  disableInvitado='display: block';
  verPerfil(){
    if(this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
  }

  cambiarPagina(event: number) {
    this.paginaActualEmpresaRuta = event;
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
    this.paginaActualEmpresaRuta=1
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
