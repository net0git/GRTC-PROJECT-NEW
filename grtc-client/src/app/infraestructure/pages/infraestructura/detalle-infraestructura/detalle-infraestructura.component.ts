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
import { CertificadoService } from '../../../services/remoto/certificado/certificado.service';
import { ListaCertificadoResponse } from '../../../../domain/dto/CertificadoResponse.dto';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { FechaConFormato_ddMMyyyy } from '../../../../../../public/utils/formateDate';
import { ShowDocumentoPdfMarcado } from '../../../../../../public/utils/pdfFunctions';
import { Router } from '@angular/router';

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
  listaCertificados: ListaCertificadoResponse[] = [];

  dataInfraestructuraDetalle: detalleInfraestructuraResponse = {
    id_infraestructura: 0,
    id_tipo_infraestructura: 0,
    fecha_act: new Date(),
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
    tipo_infraestructura: '',
  };

  constructor(private router: Router, private credencialesService: CredencialesService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private infraestructuraService: InfraestructuraService, private resolucionService: ResolucionService, private certificadoService: CertificadoService) { }
  ngOnInit(): void {
    this.detalleInfraestructura()
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
  }

  detalleInfraestructura() {
    const params = this.activatedRoute.snapshot.params
    this.infraestructuraService.obtenerInfraestructuraDetalle(params['id_infraestructura']).subscribe({
      next: (res: detalleInfraestructuraResponse) => {
        this.dataInfraestructuraDetalle = res
        this.listarResolucionesInfraestructura(res.id_infraestructura)
        this.listarCertificadosInfraestructura(res.id_infraestructura)
        
      },
      error: (err) => {
        console.error('Error al obtener detalle de infraestructura:', err)
      },
      complete: () => {
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
        this.verDocumentoResolucionActivacion()
      }

    })
  }

  listarCertificadosInfraestructura(id_infraestructura: number) {
    this.certificadoService.listarCertificadosInfraestructura(id_infraestructura).subscribe({
      next: (date: ListaCertificadoResponse[]) => {
        this.listaCertificados = date
      },
      error: (err) => {
        console.error('Error al obtener certificados de infraestructura:', err)
      },
      complete: () => {
        console.log('Certificados obtenidos correctamente')
      }
    })
  }

  async verDocumento(documento: string | undefined) {
    if (!documento) {  // Maneja null y undefined
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
      return;
    }
    const nombre_usuario = this.credencialesService.credenciales.nombre_usuario;
    const fecha = FechaConFormato_ddMMyyyy(new Date());
    const mensaje = `ARCHIVO CENTRAL GRTCC - ${nombre_usuario} - ${fecha}`;
    this.pdfUrl = await ShowDocumentoPdfMarcado(documento, mensaje, this.sanitizer);
  }

  async verDocumentoResolucionActivacion() {
    let resolucion = this.listaResoluciones.find(resolucion => resolucion.fecha_resolucion == this.dataInfraestructuraDetalle.fecha_act);
    if (resolucion) {
      this.verDocumento(resolucion.documento)
    } else {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    }
  }

  async verDocumentoCertificado(documento: string | undefined) {
    if (documento) {
      this.verDocumento(documento)
    } else {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    }
  }

  async verUltimoCertificado() {
    const certificado = this.listaCertificados[this.listaCertificados.length-1];
    if (certificado) {
      this.verDocumento(certificado.documento)
    } else {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    }
  }


  // { path: 'principal/mod-infraestructura-certificado/:id_infraestructura/:id_certificado', component: ModInfraestructuraCertificadoComponent },
  // { path: 'principal/mod-infraestructura-certificado/:id_infraestructura', component: ModInfraestructuraCertificadoComponent },
  // { path: 'principal/mod-infraestructura-resolucion/:id_infraestructura/:id_resolucion', component: ModInfraestructuraResolucionComponent },
  // { path: 'principal/mod-infraestructura-resolucion/:id_infraestructura', component: ModInfraestructuraResolucionComponent },
  modificarInfraestructura() {
    this.router.navigate(['/principal/mod-infraestructura', this.dataInfraestructuraDetalle.id_infraestructura]);
  }

  editarResolucion(id_resolucion: number) {
    this.router.navigate(['principal/mod-infraestructura-resolucion/' + this.dataInfraestructuraDetalle.id_infraestructura + '/' + id_resolucion]);
  }

  agregarResolucion() {
    this.router.navigate(['principal/mod-infraestructura-resolucion/' + this.dataInfraestructuraDetalle.id_infraestructura]);
  }


}
