import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { TucService } from '../../services/remoto/tuc/tuc.service';
import { TUCResponse } from '../../../domain/dto/TUCResponse.dto';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-consultas-tuc',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule],
  templateUrl: './consultas-tuc.component.html',
  styleUrl: './consultas-tuc.component.css'
})
export class ConsultasTucComponent {

  lista_tuc: TUCResponse[] = []

  constructor(private tucService: TucService) { }


  obternerTusPorPlaca() {
    const placa = (<HTMLInputElement>document.getElementById('placa')).value;

    console.log(placa)
    this.tucService.obtenerTUCbyPlaca(placa).subscribe({
      next: (res: TUCResponse[]) => {
        this.lista_tuc = res
        console.log(this.lista_tuc)
      },
      error: (err) => {
        console.error('Error al obtener tuc:', err);
      },
      complete: () => {
        console.log('tuc obtenido correctamente');
      }
    })
  }
}


