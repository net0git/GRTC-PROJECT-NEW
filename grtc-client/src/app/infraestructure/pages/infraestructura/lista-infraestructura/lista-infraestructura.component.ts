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
  
  listaInfraestructura:ListaInfraestructuraResponse[]=[]; listaInfraestructuraTemp:ListaInfraestructuraResponse[]=[];
  p:number=1;
  cantidad_t_terrestre:number=0;
  cantidad_er_tipo1:number=0;
  cantidad_er_tipo2:number=0;
  cantidad_er_tipo3:number=0;

  constructor(private infraestructuraService:InfraestructuraService, private router:Router) { }

  ngOnInit(): void {
    this.listarInfraestructura()
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

  detalleInfraestructura(id:number){
    this.router.navigate(['principal/infraestructura/detalle',id])
  }

  crearInfraestructura(){
    this.router.navigate(['principal/crear-infraestructura'])
  }

  filtrarInfraestructura(id: number) {
    this.p = 1;
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

  restaurarInfraestructuras() {
    this.p = 1;
    this.listaInfraestructura = this.listaInfraestructuraTemp;
     (<HTMLSelectElement>document.getElementById('tipo_doc_table')).value = '0';
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

}
