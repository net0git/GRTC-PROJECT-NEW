import { Component } from '@angular/core';
import { HistorialVehicularDetalleResponse } from '../../../domain/dto/HistorialVehicularResponse.dto';
import { HistorialVehicularService } from '../../services/remoto/historial-vehicular/historial-vehicular.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-vehiculo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-vehiculo.component.html',
  styleUrl: './historial-vehiculo.component.css'
})
export class HistorialVehiculoComponent {
  
  dataHistorialVehicular: HistorialVehicularDetalleResponse[] = []

  constructor(private historialVehicularService: HistorialVehicularService) { }

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
        }
      });
    }

  }
}
