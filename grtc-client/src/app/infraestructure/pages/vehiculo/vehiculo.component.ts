import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { ListarMarcasResponse } from '../../../domain/dto/MarcaResponse.dto';
import { ListarModelosResponse } from '../../../domain/dto/ModeloResponse.dto';
import { RegistroMarcaModeloComponent } from '../../components/registro-marca-modelo/registro-marca-modelo.component';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent, RegistroMarcaModeloComponent],
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent implements OnInit {

  listaMarcas:ListarMarcasResponse[]=[]; listaMarcasTemp:ListarMarcasResponse[]=[]
  listaModelos:ListarModelosResponse[]=[]
  marcaSeleccionada: string = 'sin seleccion';


  ngOnInit(): void {
    
  }

 

}
