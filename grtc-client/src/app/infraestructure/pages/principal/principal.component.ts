import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavegadorComponent,FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {


}
