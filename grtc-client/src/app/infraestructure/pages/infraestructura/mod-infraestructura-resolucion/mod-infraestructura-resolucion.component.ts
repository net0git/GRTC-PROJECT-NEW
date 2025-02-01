import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ResolucionModel } from '../../../../domain/models/Resolucion.model';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolucionService } from '../../../services/remoto/resolucion/resolucion.service';
import { ResolucionResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { FechaConFormato } from '../../../../../../public/utils/formateDate';
import { fileToBase64, ShowDocumentoPdf } from '../../../../../../public/utils/pdfFunctions';
import { ResolucionInfraestructuraModel } from '../../../../domain/models/ResolucionInfraestructura.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mod-infraestructura-resolucion',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, FormsModule],
  templateUrl: './mod-infraestructura-resolucion.component.html',
  styleUrl: './mod-infraestructura-resolucion.component.css',
})
export class ModInfraestructuraResolucionComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;
  titulo: string = 'REGISTRAR NUEVA RESOLUCION';
  modificar: boolean = false;
  dataResolucion: ResolucionModel = {
    id_resolucion: 0,
    anio_resolucion: '',
    descripcion: '',
    documento: '',
    fecha_resolucion: '',
    nombre_resolucion: '',
    nro_resolucion: null,
    tomo_resolucion: null,
  };

  dataInfraestructuraResolucion: ResolucionInfraestructuraModel = {
    id_infraestructura: 0,
    id_resolucion: 0,
  };

  constructor(
    private sweetAlert: SweetAlert,
    private router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private resolucionService: ResolucionService
  ) { }
  ngOnInit(): void {
    this.initPage()
  }

  initPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id_resolucion']) {
        this.obtenerResolucion();
        this.dataInfraestructuraResolucion.id_infraestructura = params['id_infraestructura'];
        this.modificar = true;
      } else {
        const unsafeUrl = 'doc/error_carga.pdf';
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.dataInfraestructuraResolucion.id_infraestructura = params['id_infraestructura'];
      }
    });
  }

  obtenerResolucion() {
    const params = this.activatedRoute.snapshot.params;
    this.resolucionService
      .ObtenerResolucionById(params['id_resolucion'])
      .subscribe({
        next: (data: ResolucionResponse) => {
          this.dataResolucion = data;
          console.log(this.dataResolucion);
        },
        error: (err) => {
          console.error('Error al obtener resolucion', err);
        },
        complete: () => {
          console.log('resolucion obtenida con exito');
          this.dataResolucion.fecha_resolucion = FechaConFormato(
            this.dataResolucion.fecha_resolucion
          );
          this.verDocumentoResolucion(this.dataResolucion.documento);
        },
      });
  }
  verDocumentoResolucion(documento: string) {
    this.pdfUrl = ShowDocumentoPdf(documento, this.sanitizer);
  }
  GuardarDatos() {
    if (this.modificar) {
      this.ModificarResolucion()
    } else {
      this.CrearResolucion()
    }

  }
  CrearResolucion() {
    alert('listos para crear resolucion')

  }

  CrearResolucionEmpresaServicio() {
    
    alert('listos para modificar resolucion')
  }

  ModificarResolucion() {
    
  }


  async onFileSelected(event: any): Promise<void> {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const base64String = await fileToBase64(selectedFile);
        this.dataResolucion.documento = base64String;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(selectedFile)
        );
      } catch (error) {
        console.error('Error al convertir el archivo en Base64:', error);
      }
    }
  }
}
