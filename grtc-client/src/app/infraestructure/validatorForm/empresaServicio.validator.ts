import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { PersonaModel } from '../../domain/models/Persona.model';
import { EmpresaModel } from '../../domain/models/Empresa.model';
import { EmpresaServicioModel } from '../../domain/models/EmpresaServicio.model';
import { Validators } from '../../../../public/utils/validators';
import { VehiculoModel } from '../../domain/models/Vehiculo.model';
import { ResolucionModel } from '../../domain/models/Resolucion.model';
import { ItinerarioModel } from '../../domain/models/Itinerario.model';
import { ArrendamientoModel } from '../../domain/models/Arrendamiento.model';
import { ConductorModel } from '../../domain/models/Conductor.model';


export function mod_empresa_servicio_vf(dataPersona: PersonaModel, dataEmpresa: EmpresaModel, dataEmpresaServicio: EmpresaServicioModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];
  if (dataEmpresa.correo.length > 0) {
    if (!Validators.validarCorreo(dataEmpresa.correo)) {
      errorValidacion.push({ campo: 'Correo Empresa', mensaje: 'Campo no válido' });
    }
  }
  if (dataEmpresa.telefono.length > 0) {
    if (!Validators.validarTelefono(dataEmpresa.telefono)) {
      errorValidacion.push({ campo: 'Telefono Empresa', mensaje: 'Campo no válido' });
    }
  }
  if (!dataEmpresa.direccion) {
    errorValidacion.push({ campo: 'Direccion Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.razon_social) {
    errorValidacion.push({ campo: 'Razón social Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.departamento) {
    errorValidacion.push({ campo: 'Departamento Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.provincia) {
    errorValidacion.push({ campo: 'Provincia Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.distrito) {
    errorValidacion.push({ campo: 'Distrito Empresa', mensaje: 'Campo no válido' });
  }

  if (!dataEmpresaServicio.fecha_inicial) {
    errorValidacion.push({ campo: 'Fecha autorización', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresaServicio.expediente) {
    errorValidacion.push({ campo: 'Expediente', mensaje: 'Campo no válido' });
  }

  if (!dataPersona.nombres) {
    errorValidacion.push({ campo: 'nombres del representante', mensaje: 'Campo requerido' });
  }
  if (!dataPersona.ap_paterno) {
    errorValidacion.push({ campo: 'apellido paterno del representante', mensaje: 'Campo requerido' });
  }
  if (!dataPersona.ap_materno) {
    errorValidacion.push({ campo: 'apellido materno del representante', mensaje: 'Campo requerido' });
  }
  if (dataPersona.telefono.length > 0) {
    if (!Validators.validarTelefono(dataPersona.telefono)) {
      errorValidacion.push({ campo: 'telefono representante', mensaje: 'Campo no válido' });
    }
  }
  if (dataPersona.correo.length > 0) {
    if (!Validators.validarCorreo(dataPersona.correo)) {
      errorValidacion.push({ campo: 'Correo del representante', mensaje: 'Campo no válido' });
    }
  }
  if (dataPersona.documento.length > 0) {
    if (dataPersona.tipo_doc != "") {
      if (dataPersona.tipo_doc == 'DNI' && dataPersona.documento.length != 8) {
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 8 para el tipo de documento DNI' });
      }
      else if (dataPersona.tipo_doc == 'CE' && dataPersona.documento.length != 12) {
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 12 para el tipo de documento CE' });
      }
    }
    else {
      errorValidacion.push({ campo: 'Documento de identidad', mensaje: 'Seleccione el tipo de documento' });
    }
  }

  return errorValidacion;
}

export function crear_empresa_servicio_empresa_vf(dataEmpresa: EmpresaModel, dataEmpresaServicio: EmpresaServicioModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];
  if (!dataEmpresa.razon_social) {
    errorValidacion.push({ campo: 'Razón social Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.ruc) {
    errorValidacion.push({ campo: 'RUC Empresa', mensaje: 'Campo no válido' });
  }

  if (!dataEmpresa.departamento) {
    errorValidacion.push({ campo: 'Departamento Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.provincia) {
    errorValidacion.push({ campo: 'Provincia Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.distrito) {
    errorValidacion.push({ campo: 'Distrito Empresa', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresa.direccion) {
    errorValidacion.push({ campo: 'Direccion Empresa', mensaje: 'Campo no válido' });
  }
  if (dataEmpresa.correo.length > 0) {
    if (!Validators.validarCorreo(dataEmpresa.correo)) {
      errorValidacion.push({ campo: 'Correo del representante', mensaje: 'Campo no válido' });
    }
  }
  if (!dataEmpresaServicio.fecha_inicial) {
    errorValidacion.push({ campo: 'Fecha Inicial Empresa Servicio', mensaje: 'Campo no válido' });
  }
  if (!dataEmpresaServicio.expediente) {
    errorValidacion.push({ campo: 'Expediente Empresa Servicio', mensaje: 'Campo no válido' });
  }

  return errorValidacion;

}

export function crear_empresa_servicio_vehiculo_vf(cuerpo_vehiculo: VehiculoModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];

  if (!cuerpo_vehiculo.placa) {
    errorValidacion.push({ campo: 'placa', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.nro_part_reg) {
    errorValidacion.push({ campo: 'nro_part_reg', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.modalidad) {
    errorValidacion.push({ campo: 'modalidad', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.estado) {
    errorValidacion.push({ campo: 'estado', mensaje: 'Campo requerido' });
  }
  if (cuerpo_vehiculo.carga == '') {
    errorValidacion.push({ campo: 'carga', mensaje: 'Campo requerido mayor a 0' });
  }
  if (cuerpo_vehiculo.peso == '') {
    errorValidacion.push({ campo: 'peso', mensaje: 'Campo requerido mayor a 0' });
  }
  if (!cuerpo_vehiculo.categoria) {
    errorValidacion.push({ campo: 'categoria', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.anio_fabricacion) {
    errorValidacion.push({ campo: 'anio_fabricacion', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.color) {
    errorValidacion.push({ campo: 'color', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.nro_chasis) {
    errorValidacion.push({ campo: 'nro_chasis', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.nro_asientos) {
    errorValidacion.push({ campo: 'nro_asientos', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.marca) {
    errorValidacion.push({ campo: 'marca', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.modelo) {
    errorValidacion.push({ campo: 'modelo', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.serie) {
    errorValidacion.push({ campo: 'serie', mensaje: 'Campo requerido' });
  }
  if (!cuerpo_vehiculo.carroceria) {
    errorValidacion.push({ campo: 'carroceria', mensaje: 'Campo requerido' });
  }

  if (cuerpo_vehiculo.id_detalle_ruta_itinerario == 0) {
    errorValidacion.push({ campo: 'id_detalle_ruta_itinerario', mensaje: 'Campo requerido' });
  }


  return errorValidacion;
}

export function crear_empresa_servicio_representante_vf(dataPersona: PersonaModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];
  if (!dataPersona.nombres) {
    errorValidacion.push({ campo: 'nombres', mensaje: 'Campo requerido' });
  }
  if (!dataPersona.ap_paterno) {
    errorValidacion.push({ campo: 'apellido paterno', mensaje: 'Campo requerido' });
  }
  if (!dataPersona.ap_materno) {
    errorValidacion.push({ campo: 'apellido materno', mensaje: 'Campo requerido' });
  }
  if (dataPersona.telefono != '') {
    if (!Validators.validarTelefono(dataPersona.telefono)) {
      errorValidacion.push({ campo: 'telefono representante', mensaje: 'Campo no válido' });
    }
  }
  if (dataPersona.correo != '') {
    if (!Validators.validarCorreo(dataPersona.correo)) {
      errorValidacion.push({ campo: 'Correo del representante', mensaje: 'Campo no válido' });
    }
  }
  if (!dataPersona.documento || dataPersona.documento.trim() === "") {
    errorValidacion.push({ campo: 'documento de identidad', mensaje: 'El campo documento de identidad es obligatorio' });
  } else {
    if (dataPersona.tipo_doc !== "") {
      if (dataPersona.tipo_doc === 'DNI' && dataPersona.documento.length !== 8) {
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'La cantidad de caracteres debe ser 8 para el tipo de documento DNI' });
      } else if (dataPersona.tipo_doc === 'CE' && dataPersona.documento.length !== 12) {
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'La cantidad de caracteres debe ser 12 para el tipo de documento CE' });
      }
    } else {
      errorValidacion.push({ campo: 'documento de identidad', mensaje: 'Seleccione el tipo de documento' });
    }
  }
  return errorValidacion;
}

export function crear_empresa_servicio_resolucion_vf(dataResolucion: ResolucionModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];

  if (!dataResolucion.documento) {
    errorValidacion.push({ campo: 'documento', mensaje: 'Seleccione archivo' })
  }
  if (!dataResolucion.nombre_resolucion) {
    errorValidacion.push({ campo: 'nombre resolución', mensaje: 'Campo requerido' })
  }
  if (!dataResolucion.nro_resolucion) {
    errorValidacion.push({ campo: 'numero de resolución', mensaje: 'Campo requerido' })
  }
  if (!dataResolucion.anio_resolucion) {
    errorValidacion.push({ campo: 'año de resolución', mensaje: 'Campo requerido' })
  }
  if (!dataResolucion.tomo_resolucion) {
    errorValidacion.push({ campo: 'tomo', mensaje: 'Campo requerido' })
  }
  if (!dataResolucion.descripcion) {
    errorValidacion.push({ campo: 'descripción', mensaje: 'Campo requerido' })
  }

  return errorValidacion

}

export function crear_empresa_servicio_itinerario_vf(dataItinerario: ItinerarioModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];
  if (!dataItinerario.origen) {
    errorValidacion.push({ campo: 'origen', mensaje: 'Campo requerido' });
  }
  if (!dataItinerario.destino) {
    errorValidacion.push({ campo: 'destino', mensaje: 'Campo requerido' });
  }
  if (!dataItinerario.itinerario) {
    errorValidacion.push({ campo: 'itinerario', mensaje: 'Campo requerido' });
  }

  return errorValidacion;

}

export function crear_empresa_servicio_arrendamiento_vf(dataArrendamiento: ArrendamientoModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];

  if (!dataArrendamiento.arrendador) {
    errorValidacion.push({ campo: 'arrendador', mensaje: 'Campo requerido' })
  }
  if (!dataArrendamiento.dni) {
    errorValidacion.push({ campo: 'dni', mensaje: 'Campo requerido' })
  }
  if (!dataArrendamiento.departamento) {
    errorValidacion.push({ campo: 'departamento', mensaje: 'Campo requerido' })
  }
  if (!dataArrendamiento.provincia) {
    errorValidacion.push({ campo: 'provincia', mensaje: 'Campo requerido' })
  }
  if (!dataArrendamiento.distrito) {
    errorValidacion.push({ campo: 'distrito', mensaje: 'Campo requerido' })
  } 
  if (!dataArrendamiento.fecha_fin) {
    errorValidacion.push({ campo: 'fecha_fin', mensaje: 'Campo requerido' })
  }
  if (!dataArrendamiento.fecha_inicio) {
    errorValidacion.push({ campo: 'fecha_inicio', mensaje: 'Campo requerido' })
  }
  
  return errorValidacion
}

export function crear_empresa_servicio_conductor_vf(dataPersonaConductor: PersonaModel, dataConductor: ConductorModel): ErrorValidacion[] {
  const errorValidacion: ErrorValidacion[] = [];

  if(!dataPersonaConductor.nombres){
    errorValidacion.push({ campo: 'nombres', mensaje: 'Campo requerido' })
  }
  if(!dataPersonaConductor.ap_paterno){
    errorValidacion.push({ campo: 'apellido paterno', mensaje: 'Campo requerido' })
  }
  if(!dataPersonaConductor.ap_materno){
    errorValidacion.push({ campo: 'apellido materno', mensaje: 'Campo requerido' })
  }
  if(dataPersonaConductor.correo.length>0){
    if(!Validators.validarCorreo(dataPersonaConductor.correo)){
      errorValidacion.push({ campo: 'Correo', mensaje: 'Campo no válido' })
    }
  }
  if(dataPersonaConductor.telefono.length>0){
    if(!Validators.validarTelefono(dataPersonaConductor.telefono)){
      errorValidacion.push({ campo: 'telefono', mensaje: 'Campo no válido' })
    }
  }
  if (!dataPersonaConductor.documento || dataPersonaConductor.documento.trim() === "") {
    errorValidacion.push({ campo: 'documento de identidad', mensaje: 'El campo documento de identidad es obligatorio' });
  } else {
    if (dataPersonaConductor.tipo_doc !== "") {
      if (dataPersonaConductor.tipo_doc === 'DNI' && dataPersonaConductor.documento.length !== 8) {
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'La cantidad de caracteres debe ser 8 para el tipo de documento DNI' });
      } else if (dataPersonaConductor.tipo_doc === 'CE' && dataPersonaConductor.documento.length !== 12) {
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'La cantidad de caracteres debe ser 12 para el tipo de documento CE' });
      }
    } else {
      errorValidacion.push({ campo: 'documento de identidad', mensaje: 'Seleccione el tipo de documento' });
    }
  }
  if(!dataConductor.categoria){
    errorValidacion.push({ campo: 'categoria', mensaje: 'Campo requerido' })
  }
  return errorValidacion;
}


