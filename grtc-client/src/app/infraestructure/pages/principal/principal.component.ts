import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavegadorComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {


}
