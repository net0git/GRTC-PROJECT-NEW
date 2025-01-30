import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { detalleInfraestructuraResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { InfraestructuraService } from '../../../services/remoto/infraestructura/infraestructura.service';
import { CommonModule } from '@angular/common';
import { ResolucionService } from '../../../services/remoto/resolucion/resolucion.service';
import { ListaResolucionResponse } from '../../../../domain/dto/ResolucionResponse.dto';

@Component({
  selector: 'app-detalle-infraestructura',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule],
  templateUrl: './detalle-infraestructura.component.html',
  styleUrl: './detalle-infraestructura.component.css'
})
export class DetalleInfraestructuraComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;
  listaResoluciones: ListaResolucionResponse[] = [];

  dataInfraestructuraDetalle: detalleInfraestructuraResponse = {
    id_infraestructura: 0,
    id_tipo_infraestructura:0,
    fecha_act: new Date(),
    expediente:'',
    ruc_empresa:'',
    nombre_infraestructura: '',
    direccion:  '',
    provincia:  '',
    distrito:  '',
    departamento:  '',
    mtc: null,
    representante:  '',
    dni_representante:  '',
    empresa:  '',
    tipo_infraestructura:  '',
  };

  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private infraestructuraService:InfraestructuraService, private resolucionService:ResolucionService) {}
  ngOnInit(): void {
    this.detalleInfraestructura()
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
  }

  detalleInfraestructura(){
    const params = this.activatedRoute.snapshot.params
    this.infraestructuraService.detalleInfraestructura(params['id_infraestructura']).subscribe({
      next:(res:detalleInfraestructuraResponse)=>{
        this.dataInfraestructuraDetalle=res
        this.listarResolucionesInfraestructura(res.id_infraestructura)
      },
      error:(err)=>{
        console.error('Error al obtener detalle de infraestructura:',err)
      },
      complete:()=>{
        console.log('Detalle de infraestructura obtenido correctamente')
      }
    })
  }

  listarResolucionesInfraestructura(id_infraestructura: number) {
    this.resolucionService.ObternerResolucionesPorInfraestructura(id_infraestructura).subscribe({
      next: (data: ListaResolucionResponse[]) => {
        console.log(data)
        this.listaResoluciones = data
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }

    })  
  }

}
