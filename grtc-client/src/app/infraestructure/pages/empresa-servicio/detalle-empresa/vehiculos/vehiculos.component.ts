import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { VehiculoService } from '../../../../services/remoto/vehiculo/vehiculo.service';
import { ListaVehiculosResponse } from '../../../../../domain/dto/VehiculoResponse.dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent,CommonModule,FormsModule],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css'
})
export class VehiculosComponent implements OnInit{

  id_empresa_servicio_temp: string = "";
  listaVehiculos: ListaVehiculosResponse[] = [];
  
  constructor(private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ListarVehiculos()
  }

  ListarVehiculos() {
    const params = this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.vehiculoService.ObeterVehiculosPorEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data: ListaVehiculosResponse[]) => {
        this.listaVehiculos = data
        console.log(this.listaVehiculos)
      },
      error: (err) => {
        console.error('Error al obtener vehiculos:', err);
      },
      complete: () => {
        console.log('Vehiculos obtenidos correctamente');
      }
    });
  }
}
