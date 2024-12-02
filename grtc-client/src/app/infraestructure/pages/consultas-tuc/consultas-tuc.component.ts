import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';


@Component({
  selector: 'app-consultas-tuc',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './consultas-tuc.component.html',
  styleUrl: './consultas-tuc.component.css'
})
export class ConsultasTucComponent {

}
