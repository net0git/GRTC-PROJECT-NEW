import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent {

}
