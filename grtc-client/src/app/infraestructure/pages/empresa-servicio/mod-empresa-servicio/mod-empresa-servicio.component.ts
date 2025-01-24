import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresaModel } from '../../../../domain/models/Empresa.model';
import { EmpresaServicioModel } from '../../../../domain/models/EmpresaServicio.model';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { UbigeoService } from '../../../services/local/ubigeo/ubigeo.service';
import { EmpresaServicioService } from '../../../services/remoto/empresas-servicio/empresa-servicio.service';
import { EmpresaServicioResponse, modificarEmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaService } from '../../../services/remoto/empresa/empresa.service';
import { EmpresaResponse, modificarEmpresaResponse } from '../../../../domain/dto/EmpresaResponse.dto';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { ModificarPersonaMessageResponse, PersonaResponse } from '../../../../domain/dto/PersonasResponse.dto';
import { FechaConFormato } from '../../../../../../public/utils/formateDate';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';
import { Router } from '@angular/router';
import { ErrorValidacion } from '../../../../domain/dto/ErrorValidacion.dto';
import { Validators } from '../../../../../../public/utils/validators';
import { SoloLetrasDirective } from '../../../directives/solo-letras.directive';
import { SoloNumerosDirective } from '../../../directives/solo-numeros.directive';
import { SoloNumerosGuionDirective } from '../../../directives/solo-numeros-guion.directive';
import { mod_empresa_servicio_vf } from '../../../../infraestructure/validatorForm/empresaServicio.validator';


@Component({
  selector: 'app-mod-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, FormsModule, SoloLetrasDirective, SoloNumerosDirective, SoloNumerosGuionDirective],
  templateUrl: './mod-empresa-servicio.component.html',
  styleUrl: './mod-empresa-servicio.component.css'
})
export class ModEmpresaServicioComponent implements OnInit {

  //datos de empresa
  dataEmpresa: EmpresaModel = {
    id_empresa: 0,
    id_representante_legal: 0,
    razon_social: '',
    ruc: '',
    direccion: '',
    correo: '',
    telefono: '',
    distrito: '',
    provincia: '',
    departamento: '',
    nota: ''
  }

  //datos de la empresa por sevicio
  dataEmpresaServicio: EmpresaServicioModel = {
    id_empresa_servicio: 0,
    id_tipo_servicio: 0,
    id_empresa: 0,
    fecha_inicial: '',
    fecha_final: '',
    expediente: '',
  }

  //datos de persona
  dataPersona: PersonaModel = {
    id_persona: 0,
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: ''
  };

  departamentos: string[] = []
  provincias: string[] = []
  distritos: string[] = []

  constructor(private router: Router, private sweetAlert: SweetAlert, private personaService: PersonaService, private empresaService: EmpresaService, private empresaServicioService: EmpresaServicioService, private ubigeoService: UbigeoService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.ObtenerEmpresaServicio()

  }

  // ubigeo------------------------------------------
  ListaDepartamentos() {
    this.departamentos = this.ubigeoService.getDepartamentos()
    console.log('departamentos', this.departamentos)
  }

  onChangeDepartamento() {
    this.provincias = this.ubigeoService.getProvinciasPorDepartamento(this.dataEmpresa.departamento)
    console.log('provincias', this.provincias)
  }

  onChangeProvincia() {
    this.distritos = this.ubigeoService.getDistritosPorProvincia(this.dataEmpresa.provincia)
  }

  // ------------------------------------------------

  ObtenerEmpresaServicio() {
    const params = this.activatedRoute.snapshot.params;
    this.empresaServicioService.ObtenerEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next: (data: EmpresaServicioResponse) => {
        this.dataEmpresaServicio = data;
        this.dataEmpresaServicio.fecha_inicial = FechaConFormato(this.dataEmpresaServicio.fecha_inicial);
        console.log(data)
      },
      error: (err) => {
        console.error('Error al obtener empresa:', err);
      },
      complete: () => {
        console.log('Empresa obtenida correctamente');


        // this.onProvinciaChange()
        this.ObternerEmpresa(this.dataEmpresaServicio.id_empresa);

      }
    });

  }

  ObternerEmpresa(id_empresa: number) {
    this.empresaService.ObtenerEmpresa(id_empresa).subscribe({
      next: (data: EmpresaResponse) => {
        this.dataEmpresa = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al obtener empresa:', err);
      },
      complete: () => {
        console.log('Empresa obtenida correctamente');
        this.OternerPersona(this.dataEmpresa.id_representante_legal);
      }
    });
  }

  OternerPersona(id_persona: number) {
    this.personaService.ObtenerDatosPersona(id_persona).subscribe({
      next: (data: PersonaResponse) => {
        console.log('representante legal', data);
        this.dataPersona = data;
      },
      error: (err) => {
        console.error('Error al obtener representate legal:', err);
      },
      complete: () => {
        console.log('representante legal obtenida correctamente');
        this.ListaDepartamentos()
        this.onChangeDepartamento()
        this.onChangeProvincia()
      }
    });
  }

  // ------------------------------------------------
  ModificarEmpresa() {
    const params = this.activatedRoute.snapshot.params;
    this.empresaService.ModificarEmpresa(this.dataEmpresa.id_empresa, this.dataEmpresa).subscribe({
      next: (data: modificarEmpresaResponse) => {
        console.log(data)
      },
      error: (err) => {
        console.error('Error al modificar empresa:', err);
      },
      complete: () => {
        console.log('empresa modificada correctamente');
        this.sweetAlert.MensajeToast('La empresa se modifico correctamente')
      }
    });
  }

  ModificarEmpresaServicio() {
    this.empresaServicioService.ModificarEmpresaServicio(this.dataEmpresaServicio.id_empresa_servicio, this.dataEmpresaServicio).subscribe({
      next: (data: modificarEmpresaServicioResponse) => {
        console.log(data)
      },
      error: (err) => {
        console.error('Error al modificar empresa:', err);
      },
      complete: () => {
        console.log('empresa modificada correctamente');
        this.sweetAlert.MensajeToast('La empresa se modifico correctamente')
      }
    });
  }

  modificarDatosPersona() {
    this.personaService.ModificarPersona(this.dataPersona.id_persona, this.dataPersona).subscribe({
      next: (data: ModificarPersonaMessageResponse) => {
        console.log(data)
      },
      error: (err) => {
        console.error('Error al modificar persona:', err);
      },
      complete: () => {
        console.log('persona modificada correctamente');
        this.sweetAlert.MensajeToast('La persona se modifico correctamente')
      }
    });
  }
  // -----------------------------------------------------------------------------
  ModificarDatosFormulario() {

    const erroresValidacion = mod_empresa_servicio_vf(this.dataPersona, this.dataEmpresa, this.dataEmpresaServicio);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }

    this.ModificarEmpresa()
    this.ModificarEmpresaServicio()
    this.modificarDatosPersona()
    this.router.navigate(['/principal/detalle-empresa-servicio/' + this.dataEmpresaServicio.id_empresa_servicio])

  }

}
