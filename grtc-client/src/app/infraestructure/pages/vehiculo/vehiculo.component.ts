import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { VehiculoService } from '../../services/remoto/vehiculo/vehiculo.service';
import { ListarMarcasResponse } from '../../../domain/dto/MarcaResponse.dto';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ListarModelosResponse } from '../../../domain/dto/ModeloResponse.dto';
import { MarcaModel } from '../../../domain/models/Marca.model';


@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent,CommonModule],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent implements OnInit {

  listaMarcas:ListarMarcasResponse[]=[]; listaMarcasTemp:ListarMarcasResponse[]=[]
  listaModelos:ListarModelosResponse[]=[]
  marcaSeleccionada: string = 'sin seleccion';

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    this.ListarMarcas()
  }

  ListarMarcas(){
    this.vehiculoService.ListarMarcas().subscribe({
      next: (res: ListarMarcasResponse[]) => {
        this.listaMarcas= res; 
        this.listaMarcasTemp= res;
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

  ListarModelos(marca:MarcaModel){
    this.marcaSeleccionada=marca.nombre_marca;
    this.vehiculoService.ObtenerModelosPorMarca(marca.id_marca).subscribe({
      next: (res: ListarModelosResponse[]) => {
        this.listaModelos= res; 
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
