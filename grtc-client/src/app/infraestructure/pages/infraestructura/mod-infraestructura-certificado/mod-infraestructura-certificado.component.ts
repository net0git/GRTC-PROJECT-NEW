import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoService } from '../../../services/remoto/certificado/certificado.service';
import { CertificadoModel } from '../../../../domain/models/Certificado.model';
import { CertificadoInfraestructuraModel } from '../../../../domain/models/CertificadoInfraestructura.model';
import { CertificadoResponse } from '../../../../domain/dto/CertificadoResponse.dto';
import { FechaConFormato } from '../../../../../../public/utils/formateDate';
import { fileToBase64, ShowDocumentoPdf } from '../../../../../../public/utils/pdfFunctions';

@Component({
  selector: 'app-mod-infraestructura-certificado',
  standalone: true,
  imports: [
    NavegadorComponent,
    SubnavegadorComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './mod-infraestructura-certificado.component.html',
  styleUrl: './mod-infraestructura-certificado.component.css',
})
export class ModInfraestructuraCertificadoComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;
  titulo: string = 'REGISTRAR NUEVA CERTIFICADO';
  modificar: boolean = false;

  dataCertificado: CertificadoModel = {
    id_certificado: 0,
    nro_certificado: null,
    anio_certificado: '',
    fecha_certificado: '',
    nombre_certificado: '',
    tomo_certificado: null,
    documento: '',
  };

  dataInfraestructuraCertificado: CertificadoInfraestructuraModel = {
    id_infraestructura: 0,
    id_certificado: 0,
  };

  constructor(
    private sweetAlert: SweetAlert,
    private router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private certificadoService: CertificadoService
  ) {}

  ngOnInit(): void {
    this.initPage();
    console.log()
  }

  initPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id_certificado']) {
        this.dataInfraestructuraCertificado.id_infraestructura = params['id_infraestructura'];
        this.obtenerCertificado()
        this.modificar = true;
      } else {
        const unsafeUrl = 'doc/error_carga.pdf';
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.dataInfraestructuraCertificado.id_infraestructura =
          params['id_infraestructura'];
      }
    });
  }

  obtenerCertificado() {
    const params = this.activatedRoute.snapshot.params;
    this.certificadoService
      .obtenerCertificadoById(params['id_certificado'])
      .subscribe({
        next: (data: CertificadoResponse) => {
          this.dataCertificado = data;
        },
        error: (err) => {
          console.error('Error al obtener certificado', err);
        },
        complete: () => {
          console.log('Certificado obtenido con exito');
          this.dataCertificado.fecha_certificado = FechaConFormato(this.dataCertificado.fecha_certificado );
          this.verDocumentoCertificado(this.dataCertificado.documento);
        },
      });
  }

  verDocumentoCertificado(documento: string) {
    this.pdfUrl = ShowDocumentoPdf(documento, this.sanitizer);
  }
  GuardarDatos() {
    if (this.modificar) {
      this.ModificarCertificado();
    } else {
      this.CrearCertificado();
    }
  }
  CrearCertificado() {
    alert('listos para crear resolucion');
  }

  CrearResolucionEmpresaServicio() {
    
  }

  ModificarCertificado() {
    alert('listos para modificar resolucion')
  }

  async onFileSelected(event: any): Promise<void> {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const base64String = await fileToBase64(selectedFile);
        this.dataCertificado.documento = base64String;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(selectedFile)
        );
      } catch (error) {
        console.error('Error al convertir el archivo en Base64:', error);
      }
    }
  }

  // obtenerCertificadoById
}
