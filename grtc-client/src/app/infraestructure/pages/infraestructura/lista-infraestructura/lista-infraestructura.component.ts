import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { ListaInfraestructuraResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { InfraestructuraService } from '../../../services/remoto/infraestructura/infraestructura.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-infraestructura',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent, CommonModule, NgxPaginationModule],
  templateUrl: './lista-infraestructura.component.html',
  styleUrl: './lista-infraestructura.component.css'
})
export class ListaInfraestructuraComponent implements OnInit {
  
  listaInfraestructura:ListaInfraestructuraResponse[]=[]; 
  p:number=1;
  
  constructor(private infraestructuraService:InfraestructuraService, private router:Router) { }

  ngOnInit(): void {
    this.listarInfraestructura()
  }

  listarInfraestructura(){
    this.infraestructuraService.listarInfraestructura().subscribe({
      next:(res:ListaInfraestructuraResponse[])=>{
        this.listaInfraestructura=res
        console.log(this.listaInfraestructura)
      },
      error:(err)=>{
        console.error('Error al obtener infraestructura:',err)
      },
      complete:()=>{
        console.log('Infraestructura obtenida correctamente')
      } 
    })
  }

  detalleInfraestructura(id:number){
    this.router.navigate(['principal/infraestructura/detalle',id])
  }
}
