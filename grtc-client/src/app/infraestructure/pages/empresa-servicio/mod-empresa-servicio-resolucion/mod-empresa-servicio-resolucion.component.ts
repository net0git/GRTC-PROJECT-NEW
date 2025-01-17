import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResolucionModel } from '../../../../domain/models/Resolucion.model';
import { ResolucionService } from '../../../services/remoto/resolucion/resolucion.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fileToBase64, ShowDocumentoPdf } from '../../../../../../public/utils/pdfFunctions';
import { ActivatedRoute } from '@angular/router';
import { ResolucionResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { FechaConFormato } from '../../../../../../public/utils/formateDate';
import { SoloNumerosDirective } from '../../../directives/solo-numeros.directive';
import { ResolucionEmpresaModel } from '../../../../domain/models/ResolucionEmpresa.model';
import { Router } from '@angular/router';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';

@Component({
  selector: 'app-mod-empresa-servicio-resolucion',
  standalone: true,
  imports: [SubnavegadorComponent, SoloNumerosDirective, NavegadorComponent, CommonModule, FormsModule],
  templateUrl: './mod-empresa-servicio-resolucion.component.html',
  styleUrl: './mod-empresa-servicio-resolucion.component.css'
})

export class ModEmpresaServicioResolucionComponent implements OnInit {
  pdfUrl: SafeResourceUrl | null = null;
  titulo: string = 'REGISTRAR NUEVA RESOLUCION'
  modificar: boolean = false
  dataResolucion: ResolucionModel = {
    id_resolucion: 0,
    anio_resolucion: '',
    descripcion: '',
    documento: '',
    fecha_resolucion: '',
    nombre_resolucion: '',
    nro_resolucion: null,
    tomo_resolucion: null,
  }

  dataEmpresaServicioResolucion: ResolucionEmpresaModel = {
    id_empresa_servicio: 0,
    id_resolucion: 0,
  }


  constructor(private sweetAlert:SweetAlert,private router: Router, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private resolucionService: ResolucionService) { }
  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id_resolucion']) {
        this.obtenerResolucion();
        this.dataEmpresaServicioResolucion.id_empresa_servicio=params['id_empresa_servicio']
        this.modificar = true;
      } else {
        const unsafeUrl = 'doc/error_carga.pdf'; // Cambiar la ruta si es necesario
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.dataEmpresaServicioResolucion.id_empresa_servicio=params['id_empresa_servicio']
      }
    });
  }

  obtenerResolucion() {
    const params = this.activatedRoute.snapshot.params
    this.resolucionService.ObtenerResolucionById(params["id_resolucion"]).subscribe({
      next: (data: ResolucionResponse) => {
        this.dataResolucion = data;
        console.log(this.dataResolucion)
      },
      error: (err) => {
        console.error('Error al obtener resolucion', err);
      },
      complete: () => {
        console.log("resolucion obtenida con exito");
        this.dataResolucion.fecha_resolucion = FechaConFormato(this.dataResolucion.fecha_resolucion)
        this.verDocumentoResolucion(this.dataResolucion.documento)
      }
    })

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

  CrearResolucion(){
    this.resolucionService.CrearResolucion(this.dataResolucion).subscribe({
      next:(data:any)=>{
        console.log(data)
        const params= this.activatedRoute.snapshot.params;
        this.dataEmpresaServicioResolucion.id_resolucion=data.id_resolucion
        this.dataEmpresaServicioResolucion.id_empresa_servicio=params['id_empresa_servicio']
      },
      error:(err:any)=>{
        console.log(err)
      },
      complete:()=>{
        console.log('completo')
        this.CrearResolucionEmpresaServicio()
      } 
    })
    
  }

  CrearResolucionEmpresaServicio(){ 
   this.resolucionService.CrearResolucionEmpresaServicio(this.dataEmpresaServicioResolucion).subscribe({
      next:(data:any)=>{
        console.log(data)  
      },
      error:(err:any)=>{
        console.log(err)
      },
      complete:()=>{
        console.log('completo')
        this.router.navigate(['principal/detalle-empresa-servicio/'+this.dataEmpresaServicioResolucion.id_empresa_servicio])
        this.sweetAlert.MensajeExito('Se creo la resolución con éxito');
      } 
    })

  }

  ModificarResolucion(){
   this.resolucionService.ModificarResolucion(this.dataResolucion.id_resolucion,this.dataResolucion).subscribe({
      next:(data:any)=>{
        console.log(data)
      },
      error:(err:any)=>{
        console.log(err)
      },
      complete:()=>{
        console.log('completo')
        this.router.navigate(['principal/detalle-empresa-servicio/'+this.dataEmpresaServicioResolucion.id_empresa_servicio])
        this.sweetAlert.MensajeExito('Resolución Modificada');
      } 
    })
  }



  async onFileSelected(event: any): Promise<void> {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const base64String = await fileToBase64(selectedFile);
        this.dataResolucion.documento = base64String;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(selectedFile));
      } catch (error) {
        console.error('Error al convertir el archivo en Base64:', error);
      }
    }
  }


}
