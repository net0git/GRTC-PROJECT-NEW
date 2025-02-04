import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { HistorialVehicularDetalleResponse } from '../../../domain/dto/HistorialVehicularResponse.dto';
import { HistorialVehicularService } from '../../services/remoto/historial-vehicular/historial-vehicular.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-busqueda-historial',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule],
  templateUrl: './busqueda-historial.component.html',
  styleUrl: './busqueda-historial.component.css'
})
export class BusquedaHistorialComponent {

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
