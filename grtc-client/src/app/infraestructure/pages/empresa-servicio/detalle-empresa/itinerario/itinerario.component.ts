import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItinerarioService } from '../../../../services/remoto/itinerario/itinerario.service';
import { ItinerarioModel } from '../../../../../domain/models/Itinerario.model';
import { ListaItinerarioResponse } from '../../../../../domain/dto/ItinerarioResponse.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itinerario',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, FormsModule, CommonModule],
  templateUrl: './itinerario.component.html',
  styleUrl: './itinerario.component.css'
})
export class ItinerarioComponent implements OnInit {

  dataItinerario:ItinerarioModel={
    id_itinerario:0,
    id_empresa_servicio:0,
    origen:'',
    destino:'',
    itinerario:'',
    frecuencia:''
  }

  listaItinerarios:ListaItinerarioResponse[]=[];
  id_empresa_servicio_temp: string = "";
  constructor(private itinerarioService:ItinerarioService,private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
   this.ListarItinerarios()
  }

  ListarItinerarios(){
    const params=this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.itinerarioService.listarItinerarioByEmpresasServicio(params['id_empresa_servicio']).subscribe({
      next:(data:ListaItinerarioResponse[])=>{
        this.listaItinerarios=data;
        console.log(data)
      },
      error:(err)=>{
        console.error('Error al obtener Itinerarios:', err);
      },
      complete:()=>{
        console.log('Itinerarios obtenidos correctamente'); 
      }
    });
  }

}
