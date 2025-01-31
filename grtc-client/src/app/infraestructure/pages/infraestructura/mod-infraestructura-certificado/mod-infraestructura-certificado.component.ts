import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-mod-infraestructura-certificado',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent],
  templateUrl: './mod-infraestructura-certificado.component.html',
  styleUrl: './mod-infraestructura-certificado.component.css'
})
export class ModInfraestructuraCertificadoComponent {

}
