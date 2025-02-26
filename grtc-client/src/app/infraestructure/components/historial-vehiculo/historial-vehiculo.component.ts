import { Component } from '@angular/core';
import { HistorialVehicularDetalleResponse } from '../../../domain/dto/HistorialVehicularResponse.dto';
import { HistorialVehicularService } from '../../services/remoto/historial-vehicular/historial-vehicular.service';
import { CommonModule } from '@angular/common';
import { VehiculoModel } from '../../../domain/models/Vehiculo.model';
import { VehiculoService } from '../../services/remoto/vehiculo/vehiculo.service';

@Component({
  selector: 'app-historial-vehiculo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-vehiculo.component.html',
  styleUrl: './historial-vehiculo.component.css'
})
export class HistorialVehiculoComponent {
  
  dataHistorialVehicular: HistorialVehicularDetalleResponse[] = []
  dataVehiculo: VehiculoModel={
    id_vehiculo: 0,
    placa: '',
    marca: '',
    modelo: '',
    anio_fabricacion: '',
    nro_part_reg: '',
    modalidad: '',
    estado: '',
    carga: '',
    peso: '',
    categoria: '',
    color: '',
    nro_chasis: '', 
    nro_asientos: '',
    serie: '',
    carroceria: '',
    id_empresa_servicio: 0,
    id_detalle_ruta_itinerario: 0,
    id_resolucion: 0  
  }

  constructor(private historialVehicularService: HistorialVehicularService, private vehiculoService: VehiculoService) { }

  BuscarHistorialVehicular() {
    let placa = (<HTMLInputElement>document.getElementById('placa_vehicular')).value;
    if (placa == '') {
      alert('Ingrese un placa de vehiculo')
    } else {
      this.historialVehicularService.ObtenerHistorialVehicularPorPlaca(placa).subscribe({
        next: (res: HistorialVehicularDetalleResponse[]) => {
          this.dataHistorialVehicular = res

          console.log(this.dataHistorialVehicular)
        },
        error: (err) => {
          console.error('Error al obtener historial vehicular:', err);
        },
        complete: () => {
          console.log('Historial vehicular obtenido correctamente');
          this.BuscarVehiculoPorPlaca(placa)
        }
      });
    }

  }

  BuscarVehiculoPorPlaca(placa: string) {
    this.vehiculoService.ObtererVehiculoPorPlaca(placa).subscribe({
      next: (data:VehiculoModel) => {
        this.dataVehiculo = data;
      },
      error: (err) => {
        console.error('Error al obtener vehiculo:', err);
      },
      complete: () => {
        console.log('Vehiculo obtenido correctamente');
      }
    });

  }
}
