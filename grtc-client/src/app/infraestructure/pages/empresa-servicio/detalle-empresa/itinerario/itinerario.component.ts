import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-itinerario',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent],
  templateUrl: './itinerario.component.html',
  styleUrl: './itinerario.component.css'
})
export class ItinerarioComponent {

}
