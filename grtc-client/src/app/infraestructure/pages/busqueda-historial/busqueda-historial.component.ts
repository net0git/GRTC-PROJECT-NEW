import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';


@Component({
  selector: 'app-busqueda-historial',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './busqueda-historial.component.html',
  styleUrl: './busqueda-historial.component.css'
})
export class BusquedaHistorialComponent {

}
