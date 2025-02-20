import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent  {
  @Input() currentStep: number = 0;

  // Getter para calcular el valor del progreso dinámicamente
  get progressValue(): number {
    return ((this.currentStep -1)/ 6) * 100; 
  }

}