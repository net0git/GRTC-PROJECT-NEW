import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { UbigeoService } from '../../../services/local/ubigeo/ubigeo.service';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfraestructuraModel } from '../../../../domain/models/Infraestructura.model';
import { InfraestructuraService } from '../../../services/remoto/infraestructura/infraestructura.service';
import { ResolucionModel } from '../../../../domain/models/Resolucion.model';
import { ResolucionService } from '../../../services/remoto/resolucion/resolucion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fileToBase64 } from '../../../../../../public/utils/pdfFunctions';
import { crear_infraestructura_representante_vf, crear_infraestructura_resolucion_vf, crear_infraestructura_vf } from '../../../../infraestructure/validatorForm/infraestructrua.validator';
import { CrearInfraestructuraResponse } from '../../../../domain/dto/InfraestructuraResponse.dto';
import { CrearResolucionInfraestructuraMessageResponse, CrearResolucionMessageResponse, VerificarResolucionByNombreResponse } from '../../../../domain/dto/ResolucionResponse.dto';
import { ResolucionInfraestructuraModel } from '../../../../domain/models/ResolucionInfraestructura.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-infraestructura',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent , ProgressBarComponent, CommonModule, FormsModule],
  templateUrl: './crear-infraestructura.component.html',
  styleUrl: './crear-infraestructura.component.css'
})
export class CrearInfraestructuraComponent implements OnInit {
  currentStep: number = 1;
  progressValue = ((1) / 3) * 100;
  pdfUrl: SafeResourceUrl | null = null;
  desabilitarButtonCrearInfraestructura: boolean = false;
  deshabilitarFormResolucion: boolean = true;
  dataInfraestructura: InfraestructuraModel = {
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
    mtc: false,
    representante: '',
    dni_representante: '',
    empresa: ''
  }

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

  departamentos: string[] = []
  provincias: string[] = []
  distritos: string[] = []


  constructor(private sanitizer: DomSanitizer, private ubigeoService:UbigeoService, private infraestructuraService: InfraestructuraService, private resolucionService:ResolucionService, private router: Router,) { }

  ngOnInit(): void {
    
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
    this.ListaDepartamentos();
  }
  // -----------------------------------------------------------------------------------------------------------
  nextStep(): void {
    this.currentStep++;
    this.progressValue = ((this.currentStep) / 3) * 100; // 3 es el número total de pasos
  }
  prevStep(): void {
    this.currentStep--;
    this.progressValue = ((this.currentStep) / 3) * 100; // 3 es el número total de pasos
  }
  // -----------------------------------------------------------------------------------------------------------
   // ubigeo Empresa ---------------------------------------------------------------------------------
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
  // -----------------------------------------------------------------------------------------------------------
  validarDatosFormularioInfraestructura() {
    const erroresValidacion = crear_infraestructura_vf(this.dataInfraestructura);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
    } else {
      this.nextStep()
    }
  }

  validarDatosFormularioRepresentante() {
    const erroresValidacion = crear_infraestructura_representante_vf(this.dataInfraestructura);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
    } else {
      this.nextStep()
    }
  }

  buscarResolucionPorNombre(){
      this.resolucionService.VerificarResolucionByNombre(this.dataResolucion.nombre_resolucion).subscribe({
        next:(res:VerificarResolucionByNombreResponse)=>{
          if(res.existe){
            alert('La resolucion ya existe')
          }
          else{ 
            this.deshabilitarFormResolucion=false
          }
        },
        error:(err)=>{
          console.error('Error al buscar resolucion por nombre:',err)
        },
        complete:()=>{  
          console.log('Proceso de busqueda de resolucion por nombre completado')
        }
       })
    }

    ReiniciarFormularioResolucion(){
      this.dataResolucion.nombre_resolucion='',
      this.dataResolucion.anio_resolucion='',
      this.dataResolucion.tomo_resolucion=null,
      this.dataResolucion.fecha_resolucion='',
      this.dataResolucion.descripcion=''
      this.deshabilitarFormResolucion=true
    }

  validarDatosFormularioResolucion() {
    this.desabilitarButtonCrearInfraestructura = true;
    const erroresValidacion = crear_infraestructura_resolucion_vf(this.dataResolucion);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      alert(errorMensaje)
    } else {
      this.mostrarDatos()
      this.crearInfraestructura()
      this.finalizarCreacionInfraestructura()
    }
  }

  // -----------------------------------------------------------------------------------------------------------
  mostrarDatos(){
    console.log(this.dataInfraestructura)
    console.log(this.dataResolucion)
  }

  crearInfraestructura(){
    this.infraestructuraService.crearInfraestructura(this.dataInfraestructura).subscribe({
      next: (data: CrearInfraestructuraResponse) => {
        console.log(data)
        this.dataInfraestructura.id_infraestructura=data.id_infraestructura
      },
      error: (err) => {
        console.error('Error al crear infraestructura:', err);
      },
      complete: () => {
        console.log('Infraestructura creada correctamente');
        this.crearResolucion()
      }
    });
  }

  crearResolucion(){
    this.resolucionService.CrearResolucion(this.dataResolucion).subscribe({
      next: (data: CrearResolucionMessageResponse) => {
        console.log(data)
        this.dataResolucion.id_resolucion=data.id_resolucion
      },
      error: (err) => {
        console.error('Error al crear infraestructura:', err);
      },
      complete: () => {
        console.log('Infraestructura creada correctamente');
        this.mostrarDatos()
        this.asociarResolucionInfraestructura()
      }
    });
  }

  asociarResolucionInfraestructura(){
    const cuerpo_resolucion_infraestructura: ResolucionInfraestructuraModel =  {
      id_infraestructura : this.dataInfraestructura.id_infraestructura,
      id_resolucion : this.dataResolucion.id_resolucion
    }
    this.resolucionService.CrearResolucionInfraestructura(cuerpo_resolucion_infraestructura).subscribe({
      next:(res:CrearResolucionInfraestructuraMessageResponse) => {
        console.log(res)
      },
      error:(error:any) => {
        console.log(error)

      }   
    })
  }

  finalizarCreacionInfraestructura(): void {

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Creacion de Infraestructura en proceso"
    });

    setTimeout(() => {
      this.router.navigate(['principal/infraestructura/detalle/', this.dataInfraestructura.id_infraestructura]);
    }, 5500);
    
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
