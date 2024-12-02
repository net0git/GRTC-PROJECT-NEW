import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-lista-infraestructura',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './lista-infraestructura.component.html',
  styleUrl: './lista-infraestructura.component.css'
})
export class ListaInfraestructuraComponent {

}
