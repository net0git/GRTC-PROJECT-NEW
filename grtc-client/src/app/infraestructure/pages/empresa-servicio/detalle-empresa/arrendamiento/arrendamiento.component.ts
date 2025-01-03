import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { ListaArrendamientoResponse } from '../../../../../domain/dto/ArrendamientoResponse.dto';
import { ArrendamientoService } from '../../../../services/remoto/arrendamiento/arrendamiento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-arrendamiento',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, FormsModule],
  templateUrl: './arrendamiento.component.html',
  styleUrl: './arrendamiento.component.css'
})
export class ArrendamientoComponent implements OnInit {
  // const dataContratoArrendamiento: ListaArrendamientoResponse[] = []
  listaContratosArrendamiento: ListaArrendamientoResponse[] = [];
  id_empresa_servicio_temp: string = "";
  constructor(private router: Router, private arrendamientoService: ArrendamientoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarArrendamientos()
  }

  listarArrendamientos() {
    const params = this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.arrendamientoService.ListarArrendamientoByEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data: ListaArrendamientoResponse[]) => {
        this.listaContratosArrendamiento = data;
        console.log(this.listaContratosArrendamiento)
      },
      error: (err) => {
        console.error('Error al obtener arrendamientos:', err);
      },
      complete: () => {
        console.log('Arrendamientos obtenidos correctamente');
      }
    });
  }


}
