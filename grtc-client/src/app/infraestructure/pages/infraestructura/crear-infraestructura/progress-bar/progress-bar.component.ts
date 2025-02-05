import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() currentStep: number = 0; // Valor inicial

  // Getter para calcular el valor del progreso dinámicamente
  get progressValue(): number {
    return ((this.currentStep -1)/ 2) * 100; // Supone que el máximo es 7 pasos
  }

}
