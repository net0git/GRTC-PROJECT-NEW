import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { DetalleEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-detalle-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent,CommonModule],
  templateUrl: './detalle-empresa-servicio.component.html',
  styleUrl: './detalle-empresa-servicio.component.css'
})
export class DetalleEmpresaServicioComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null =null;
  dataEmpresaDetalle: DetalleEmpresaServicioResponse = {
    id_empresa_servicio: 0,          // ID inicializado como 0
    id_tipo_servicio: 0,             // ID del tipo de servicio inicializado como 0
    tipo_servicio: '',               // Tipo de servicio inicializado como cadena vacía
    id_empres: 0,                    // ID de la empresa inicializado como 0
    razon_social: '',                // Razón social inicializada como cadena vacía
    ruc: '',                         // RUC inicializado como cadena vacía
    direccion: '',                   // Dirección inicializada como cadena vacía
    correo: '',                      // Correo inicializado como cadena vacía
    telefono: '',                    // Teléfono inicializado como cadena vacía
    distrito: '',                    // Distrito inicializado como cadena vacía
    provincia: '',                   // Provincia inicializada como cadena vacía
    departamento: '',                // Departamento inicializado como cadena vacía
    nota: '',                        // Nota inicializada como cadena vacía
    representante_legal: '',        // Representante legal inicializado como cadena vacía
    fecha_inicial: new Date(),       // Fecha inicializada con la fecha actual
    fecha_final: new Date(),         // Fecha final inicializada con la fecha actual
    expediente: '',                  // Expediente inicializado como cadena vacía
    estado: '',                      // Estado inicializado como cadena vacía
    porcentaje: 0                    // Porcentaje inicializado como 0
  };

  constructor(private sanitizer: DomSanitizer, private empresaServicioService:EmpresaServicioService,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.detalleEmpresa();
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
  }

  detalleEmpresa(){
    const params=this.activatedRoute.snapshot.params
    this.empresaServicioService.DetalleEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next:(res:DetalleEmpresaServicioResponse)=>{
        this.dataEmpresaDetalle=res;
        console.log(this.dataEmpresaDetalle);
      },
      error:(err)=>{
        console.error('Error al obtener detalle de empresa:', err);
      },
      complete:()=>{
        console.log('Detalle de empresa obtenido correctamente'); 
      }
    });
  } 
}
