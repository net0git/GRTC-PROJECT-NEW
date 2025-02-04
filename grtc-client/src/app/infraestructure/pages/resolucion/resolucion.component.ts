import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { ResolucionService } from '../../services/remoto/resolucion/resolucion.service';
import { ResolucionBusquedaResponse } from '../../../domain/dto/ResolucionResponse.dto';
import { CredencialesService } from '../../services/local/credenciales/credenciales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FechaConFormato_ddMMyyyy } from '../../../../../public/utils/formateDate';
import { ShowDocumentoPdfMarcado } from '../../../../../public/utils/pdfFunctions';

@Component({
  selector: 'app-resolucion',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, FormsModule],
  templateUrl: './resolucion.component.html',
  styleUrl: './resolucion.component.css'
})


export class ResolucionComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null = null;

  dataResolucion: ResolucionBusquedaResponse = {
    id_resolucion: 0,
    nro_resolucion: null,
    anio_resolucion: '',
    fecha_resolucion: '',
    tomo_resolucion: null,
    nombre_resolucion: '',
    descripcion: '',
    documento: '',
    empresa_cod_id: 0,
    expediente: '',
    nombre_empresa: '',
    tipo: ''
  }

  constructor(private sanitizer: DomSanitizer, private resolucionService: ResolucionService, private credencialesService: CredencialesService) { }

  ngOnInit(): void {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
  }

  buscarResolucion() {
    if (this.dataResolucion.nro_resolucion && this.dataResolucion.anio_resolucion) {
     this.resolucionService.ObtenerResolucionByNroAnio(this.dataResolucion.nro_resolucion, this.dataResolucion.anio_resolucion).subscribe({
      next:(data:ResolucionBusquedaResponse)=>{
        this.dataResolucion = data;
        
      },
      error:(err)=>{
        console.log('no se completo la busqueda de la resolucion: ', err);
        alert('los datos no cohinciden con nunguna resolucion')
      },
      complete:()=>{
        console.log('se completo la busqueda de la resolucion');
        this.verDocumentoResolucion(this.dataResolucion.documento)
      }
     })
      
    }else{
      alert('Debe rellenar los campos de la resolución');
     
    }
  }

  async verDocumentoResolucion(documento: string) {
    const nombre_usuario = this.credencialesService.credenciales.nombre_usuario;
    const fecha = FechaConFormato_ddMMyyyy(new Date());
    const mensaje = `ARCHIVO CENTRAL GRTCC - ${nombre_usuario} - ${fecha}`;
    this.pdfUrl = await ShowDocumentoPdfMarcado(documento, mensaje, this.sanitizer);
  }

}
