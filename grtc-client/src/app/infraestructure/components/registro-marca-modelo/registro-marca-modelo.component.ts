import { Component, OnInit } from '@angular/core';
import { ListarMarcasResponse } from '../../../domain/dto/MarcaResponse.dto';
import { ListarModelosResponse } from '../../../domain/dto/ModeloResponse.dto';
import { VehiculoService } from '../../services/remoto/vehiculo/vehiculo.service';
import { MarcaModel } from '../../../domain/models/Marca.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-marca-modelo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-marca-modelo.component.html',
  styleUrl: './registro-marca-modelo.component.css'
})
export class RegistroMarcaModeloComponent implements OnInit {

  listaMarcas: ListarMarcasResponse[] = []; listaMarcasTemp: ListarMarcasResponse[] = []
  listaModelos: ListarModelosResponse[] = []
  marcaSeleccionada: string = 'sin seleccion';

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    console.log('RegistroMarcaModeloComponent inicializado');
    this.ListarMarcas();

  }

  ListarMarcas() {
    this.vehiculoService.ListarMarcas().subscribe({
      next: (res: ListarMarcasResponse[]) => {
        this.listaMarcas = res;
        this.listaMarcasTemp = res;
        console.log(this.listaMarcas)
      },
      error: (err) => {
        console.error('Error al obtener marcas', err);
      },
      complete: () => {
        console.log('Obtención de marcas completada');
      }
    });
  }

  ListarModelos(marca: MarcaModel) {
    this.marcaSeleccionada = marca.nombre_marca;
    this.vehiculoService.ObtenerModelosPorMarca(marca.id_marca).subscribe({
      next: (res: ListarModelosResponse[]) => {
        this.listaModelos = res;
        console.log(this.listaMarcas)
      },
      error: (err) => {
        console.error('Error al obtener modelos', err);
      },
      complete: () => {
        console.log('Obtención de modelos completada');
      }
    });
  }

}
