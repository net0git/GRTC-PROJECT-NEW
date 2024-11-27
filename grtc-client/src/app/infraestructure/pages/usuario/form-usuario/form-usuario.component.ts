import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {

}
