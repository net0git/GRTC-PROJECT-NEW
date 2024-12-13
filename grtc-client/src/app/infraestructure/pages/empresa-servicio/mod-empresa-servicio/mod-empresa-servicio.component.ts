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
import { EmpresaServicioResponse } from '../../../../domain/dto/EmpresaServicioResponse.dto';
import { EmpresaService } from '../../../services/remoto/empresa/empresa.service';
import { EmpresaResponse } from '../../../../domain/dto/EmpresaResponse.dto';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { PersonaResponse } from '../../../../domain/dto/PersonasResponse.dto';



@Component({
  selector: 'app-mod-empresa-servicio',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, CommonModule, FormsModule],
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

  constructor( private personaService:PersonaService, private empresaService:EmpresaService ,private empresaServicioService:EmpresaServicioService ,private ubigeoService:UbigeoService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.ObtenerEmpresaServicio()

  }

  // ubigeo------------------------------------------
  ListaDepartamentos(){
    this.departamentos=this.ubigeoService.getDepartamentos()
    console.log('departamentos',this.departamentos)
  }

  onChangeDepartamento(){
    this.provincias=this.ubigeoService.getProvinciasPorDepartamento(this.dataEmpresa.departamento)
    console.log('provincias',this.provincias)
  }

  onProvinciaChange(){
    this.distritos=this.ubigeoService.getDistritosPorProvincia(this.dataEmpresa.provincia)
  }
  // -----------------------------------------------------------------------
  FechaConFormato(fechaISO:string | Date):string{
    // Función para convertir una fecha ISO a formato "mm-yyyy-dd"
      const fecha = new Date(fechaISO);
      const dia = fecha.getDate().toString().padStart(2, '0'); //Obtiene el día
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); //Obtiene el mes (agregamos 1 porque los meses en JavaScript comienzan en 0)
      const anio = fecha.getFullYear(); //Obtiene el año
    //Formatea la fecha en "yyyy-dd-mm"
      return `${anio}-${mes}-${dia}`;
    }
  //------------------------------------------------------------------------- 
  ObtenerEmpresaServicio(){
    const params=this.route.snapshot.params;
    this.empresaServicioService.ObtenerEmpresaServicio(params['id_empresa_servicio']).subscribe({
      next:(data:EmpresaServicioResponse)=>{
        this.dataEmpresaServicio=data;
        this.dataEmpresaServicio.fecha_inicial=this.FechaConFormato(this.dataEmpresaServicio.fecha_inicial);
        console.log(data)
      },
      error:(err)=>{
        console.error('Error al obtener empresa:', err);
      },
      complete:()=>{
        console.log('Empresa obtenida correctamente'); 
        
  
        // this.onProvinciaChange()
        this.ObternerEmpresa(this.dataEmpresaServicio.id_empresa);
        
      }
    }); 

  }

  ObternerEmpresa(id_empresa:number){
    this.empresaService.ObtenerEmpresa(id_empresa).subscribe({
      next:(data:EmpresaResponse)=>{
        this.dataEmpresa=data;
        console.log(data)
      },
      error:(err)=>{
        console.error('Error al obtener empresa:', err);
      },
      complete:()=>{
        console.log('Empresa obtenida correctamente'); 
        this.OternerPersona(this.dataEmpresa.id_representante_legal);
      }
    }); 
  } 

  OternerPersona(id_persona:number){
    this.personaService.ObtenerDatosPersona(id_persona).subscribe({
      next:(data:PersonaResponse)=>{
        console.log('representante legal',data);
        this.dataPersona=data;
      },
      error:(err)=>{
        console.error('Error al obtener representate legal:', err);
      },
      complete:()=>{
        console.log('representante legal obtenida correctamente'); 
        this.ListaDepartamentos() 
        this.onChangeDepartamento()
        this.onProvinciaChange()
      }
    }); 
  }

  // 
}
