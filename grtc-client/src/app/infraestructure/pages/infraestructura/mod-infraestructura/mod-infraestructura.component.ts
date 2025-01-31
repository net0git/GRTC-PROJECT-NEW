import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
// import { InfraestructuraModel } from '../../../../domain/models/Infraestructura.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UbigeoService } from '../../../services/local/ubigeo/ubigeo.service';
import { InfraestructuraService } from '../../../services/remoto/infraestructura/infraestructura.service';
import { InfraestructuraResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { FechaConFormato } from '../../../../../../public/utils/formateDate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mod-infraestructura',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, FormsModule, CommonModule],
  templateUrl: './mod-infraestructura.component.html',
  styleUrl: './mod-infraestructura.component.css'
})
export class ModInfraestructuraComponent implements OnInit {

  dataInfraestructura: any = {

    id_infraestructura: 0,
    id_tipo_infraestructura: 0,
    fecha_act: '',
    expediente: '',
    ruc_empresa: '',
    nombre_infraestructura: '',
    direccion: '',
    provincia: '',
    distrito: '',
    departamento: '',
    mtc: null,
    representante: '',
    dni_representante: '',
    empresa: '',

  };

  departamentos: string[] = []
  provincias: string[] = []
  distritos: string[] = []


  constructor(private router: Router, private ubigeoService: UbigeoService, private activatedRoute: ActivatedRoute, private infraestructuraService: InfraestructuraService) { }
  ngOnInit(): void {
    this.ObtenerInfraestructura()
  }

  // ubigeo------------------------------------------
  ListaDepartamentos() {
    this.departamentos = this.ubigeoService.getDepartamentos()
    console.log('departamentos', this.departamentos)
  }

  onChangeDepartamento() {
    this.provincias = this.ubigeoService.getProvinciasPorDepartamento(this.dataInfraestructura.departamento)
    console.log('provincias', this.provincias)
  }

  onChangeProvincia() {
    this.distritos = this.ubigeoService.getDistritosPorProvincia(this.dataInfraestructura.provincia)
  }

  // ------------------------------------------------

  ObtenerInfraestructura() {
    const params = this.activatedRoute.snapshot.params;
    this.infraestructuraService.obtenerInfraestructura(params['id_infraestructura']).subscribe({
      next: (res: InfraestructuraResponse) => {
        this.dataInfraestructura = res
        console.log(res)
        this.dataInfraestructura.fecha_act = FechaConFormato(this.dataInfraestructura.fecha_act);

      },
      error: (err) => {
        console.error('Error al obtener infraestructura:', err)
      },
      complete: () => {
        console.log('Infraestructura obtenida correctamente')
        this.ListaDepartamentos()
        this.onChangeDepartamento()
        this.onChangeProvincia()
      }
    })
  }

  // ModificarInfraestructura(data:InfraestructuraModeldgdfgdf){
  
  // }


}
