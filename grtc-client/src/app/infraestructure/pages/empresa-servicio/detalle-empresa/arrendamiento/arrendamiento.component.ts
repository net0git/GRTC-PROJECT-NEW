import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-arrendamiento',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent],
  templateUrl: './arrendamiento.component.html',
  styleUrl: './arrendamiento.component.css'
})
export class ArrendamientoComponent {

}
