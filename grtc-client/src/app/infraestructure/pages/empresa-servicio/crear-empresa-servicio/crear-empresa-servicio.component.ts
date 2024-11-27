import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-crear-empresa-servicio',
  standalone: true,
  imports: [CommonModule,NavegadorComponent,SubnavegadorComponent],
  templateUrl: './crear-empresa-servicio.component.html',
  styleUrl: './crear-empresa-servicio.component.css'
})
export class CrearEmpresaServicioComponent implements OnInit{ 

  currentStep: number = 1;
  progressValue=((1 ) / 7) * 100;

  ngOnInit(): void {
    
  }

  

  nextStep(): void {
    this.currentStep++;
     // Actualizar la barra de progreso
     this.progressValue = ((this.currentStep ) / 7) * 100; // 3 es el número total de pasos
  }

  // Método para regresar al paso anterior
  prevStep(): void {
    this.currentStep--;
    this.progressValue = ((this.currentStep ) / 7) * 100; // 3 es el número total de pasos
  }


}
