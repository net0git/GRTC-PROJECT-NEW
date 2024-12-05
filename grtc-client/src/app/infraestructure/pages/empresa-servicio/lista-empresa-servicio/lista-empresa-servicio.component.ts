import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { Router } from '@angular/router';
import { ListaEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-lista-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent,CommonModule,NgxPaginationModule],
  templateUrl: './lista-empresa-servicio.component.html',
  styleUrl: './lista-empresa-servicio.component.css'
})
export class ListaEmpresaServicioComponent implements OnInit {

  listaEmpresasServicio:ListaEmpresaServicioResponse[]=[]; 
  p:number=1;
  constructor(private router: Router, private empresaServicioService: EmpresaServicioService) { }

  ngOnInit(): void {    
    this.listarEmpresaServicio()
  }

  listarEmpresaServicio(){
    this.empresaServicioService.listarEmpresasServicio().subscribe({
      next:(res:ListaEmpresaServicioResponse[])=>{
        this.listaEmpresasServicio=res
        console.log(this.listaEmpresasServicio)
      },
      error:(err)=>{
        console.error('Error al obtener empresas de servicio:',err)
      },
      complete:()=>{
        console.log('Obtención de empresas de servicio completada')
      } 
    })
  }


  crearEmpresaServicio(){
    this.router.navigate(['/principal/crear-empresa-servicio']);
  }

  detalleEmpresaServicio(id_empresa_servicio:number){
    this.router.navigate(['/principal/detalle-empresa-servicio/'+id_empresa_servicio]);
  }
}
