import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReporteService } from '../../../../infraestructure/services/remoto/reporte/reporte.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte-vehiculos-empresa',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './vehiculos-empresa.component.html',
  styleUrl: './vehiculos-empresa.component.css'
})
export class VehiculosEmpresaComponent implements OnInit {

 
  ngOnInit(): void {

  }


}
