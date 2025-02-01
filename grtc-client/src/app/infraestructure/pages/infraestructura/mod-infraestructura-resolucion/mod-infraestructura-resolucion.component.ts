import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-mod-infraestructura-resolucion',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent],
  templateUrl: './mod-infraestructura-resolucion.component.html',
  styleUrl: './mod-infraestructura-resolucion.component.css'
})
export class ModInfraestructuraResolucionComponent {

}
