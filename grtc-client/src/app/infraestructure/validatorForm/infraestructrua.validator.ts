import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { InfraestructuraModel } from '../../domain/models/Infraestructura.model';
import { ResolucionModel } from '../../domain/models/Resolucion.model';


export function crear_infraestructura_vf(dataInfraestructura: InfraestructuraModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
  
    if (!dataInfraestructura.id_tipo_infraestructura){
        errorValidacion.push({ campo: 'tipo de infraestructrura', mensaje: 'Seleccione tipo de infraestructura' })
    }
    if (!dataInfraestructura.nombre_infraestructura){
        errorValidacion.push({ campo: 'nombre de infraestructura', mensaje: 'Campo requerido' })
    } 
    if (!dataInfraestructura.departamento){
        errorValidacion.push({ campo: 'departamento', mensaje: 'Campo requerido' })
    }
    if (!dataInfraestructura.provincia){
        errorValidacion.push({ campo: 'provincia', mensaje: 'Campo requerido' })
    }
    if (!dataInfraestructura.distrito){        
        errorValidacion.push({ campo: 'distrito', mensaje: 'Campo requerido' })
    }
    if (!dataInfraestructura.direccion){
        errorValidacion.push({ campo: 'direccion', mensaje: 'Campo requerido' })
    }
    if (!dataInfraestructura.fecha_act){
        errorValidacion.push({ campo: 'fecha de creacion', mensaje: 'Campo requerido' })
    }
    if (!dataInfraestructura.expediente){
        errorValidacion.push({ campo: 'expediente', mensaje: 'Campo requerido' })
    }
  
    return errorValidacion
}

export function crear_infraestructura_representante_vf(dataInfraestructura: InfraestructuraModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];

    if(!dataInfraestructura.representante){
        errorValidacion.push({ campo: 'representante', mensaje: 'Campo requerido' })
    }
    if(!dataInfraestructura.dni_representante){
        errorValidacion.push({ campo: 'dni representante', mensaje: 'Campo requerido' })
    } else if (dataInfraestructura.dni_representante.length !== 8) {
        errorValidacion.push({ campo: 'dni representante', mensaje: 'El DNI debe tener 8 digitos' })
    }
    if(dataInfraestructura.empresa.length > 0 && dataInfraestructura.ruc_empresa.length == 0){
        errorValidacion.push({ campo: 'ruc_empresa', mensaje: 'El RUC debe tener 11 digitos' })
    }
    if(dataInfraestructura.ruc_empresa.length > 0 && dataInfraestructura.empresa.length == 0) {
        errorValidacion.push({ campo: 'razon social', mensaje: 'Campo requerido' })
    }
    if(dataInfraestructura.ruc_empresa.length > 0 && dataInfraestructura.ruc_empresa.length < 11){
        errorValidacion.push({ campo: 'ruc_empresa', mensaje: 'El RUC debe tener 11 digitos' })
        
    }
      
    

    return errorValidacion
}  

export function crear_infraestructura_resolucion_vf(dataResolucion: ResolucionModel): ErrorValidacion[] {
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
    } else if (dataResolucion.anio_resolucion.length < 4) {
      errorValidacion.push({ campo: 'año de resolución', mensaje: 'El año debe tener 4 digitos' })
    }
    if (!dataResolucion.tomo_resolucion) {
      errorValidacion.push({ campo: 'tomo', mensaje: 'Campo requerido' })
    }
    if (!dataResolucion.fecha_resolucion) {
      errorValidacion.push({ campo: 'fecha de resolución', mensaje: 'Campo requerido' })
    }
    if (!dataResolucion.descripcion) {
      errorValidacion.push({ campo: 'descripción', mensaje: 'Campo requerido' })
    }
  
    return errorValidacion
  
  }
