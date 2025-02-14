import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReporteService } from '../../../../infraestructure/services/remoto/reporte/reporte.service';

@Component({
  selector: 'app-reporte-empresa-servicio-ruta',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './empresa-servicio-ruta.component.html',
  styleUrl: './empresa-servicio-ruta.component.css'
})
export class EmpresaServicioRutaComponent implements OnInit {

  constructor(private reporteService:ReporteService) { }

  ngOnInit(): void {
  }
}
