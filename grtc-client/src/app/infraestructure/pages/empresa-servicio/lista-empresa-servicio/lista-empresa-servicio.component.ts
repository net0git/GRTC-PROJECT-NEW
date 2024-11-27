import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './lista-empresa-servicio.component.html',
  styleUrl: './lista-empresa-servicio.component.css'
})
export class ListaEmpresaServicioComponent {

  constructor(private router: Router) { }

  crearEmpresaServicio(){
    this.router.navigate(['/principal/crear-empresa-servicio']);
  }
}
