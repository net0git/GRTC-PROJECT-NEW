import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { P1DatosEmpresa } from './steper/p1-empresa/p1-datos-empresa.component';
import { P2DatosRepresentante } from './steper/p2-representante/p2-datos-representante'
import { P3DatosResolucion } from './steper/p3-resolucion/p3-datos-resolucion.component';
import { P4DatosRutas } from './steper/p4-rutas/p4-datos-rutas.component';
import { P5DatosArrendamiento } from './steper/p5-arrendamiento/p5-datos-arrendamiento.component';
import { P6DatosConductores } from './steper/p6-conductores/p6-datos-conductores.component';
import { P7DatosVehiculos } from './steper/p7-vehiculos/p7-datos-vehiculos.component';


@Component({
  selector: 'app-crear-empresa-servicio',
  standalone: true,
  imports: [CommonModule,NavegadorComponent,SubnavegadorComponent,ProgressBarComponent,P1DatosEmpresa,P2DatosRepresentante,P3DatosResolucion,P4DatosRutas,P5DatosArrendamiento,P6DatosConductores,P7DatosVehiculos],
  templateUrl: './crear-empresa-servicio.component.html',
  styleUrl: './crear-empresa-servicio.component.css'
})
export class CrearEmpresaServicioComponent implements OnInit{ 

  currentStep: number = 1;      
  progressValue=((1 ) / 7) * 100;

  
  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
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
