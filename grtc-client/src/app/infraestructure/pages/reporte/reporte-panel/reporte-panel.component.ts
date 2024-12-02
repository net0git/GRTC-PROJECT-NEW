import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-reporte-panel',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent],
  templateUrl: './reporte-panel.component.html',
  styleUrl: './reporte-panel.component.css'
})
export class ReportePanelComponent {

}
