import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { ListaConductoresResponse } from '../../../../../domain/dto/conductorResponse.dto';
import { ConductorModel } from '../../../../../domain/models/Conductor.model';
import { ConductorService } from '../../../../services/remoto/conductor/conductor.service';
import { PersonaModel } from '../../../../../domain/models/Persona.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-conductores',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, FormsModule],
  templateUrl: './conductores.component.html',
  styleUrl: './conductores.component.css'
})
export class ConductoresComponent implements OnInit {

  dataPersona:PersonaModel={
    id_persona:0,
    nombres:'',
    ap_paterno:'',
    ap_materno:'',
    tipo_doc:'',
    documento:'',
    telefono:'',
    correo:''
  };

  dataConductor:ConductorModel={
    id_conductor:0,
    id_persona:0,
    nro_licencia:'',
    categoria:'',
    id_empresa_servicio:0,
  }

  listaConductores:ListaConductoresResponse[]=[];

  constructor(private activatedRoute: ActivatedRoute, private conductorService: ConductorService ){}

  ngOnInit(): void {
    this.mostrarListaConductores()
  }
  mostrarListaConductores(){
    const params = this.activatedRoute.snapshot.params;
    console.log(params['id_empresa_servicio'])
    // this.conductorService.listarConductoresByEmpresaServicio(params['id_empresa_servicio'])
  }
  
}
