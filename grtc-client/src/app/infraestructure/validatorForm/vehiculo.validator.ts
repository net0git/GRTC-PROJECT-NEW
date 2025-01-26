import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { VehiculoModel } from '../../domain/models/Vehiculo.model';

export function ValidadVehiculoForm(cuerpo_vehiculo: VehiculoModel): ErrorValidacion[] {
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
    if (!cuerpo_vehiculo.id_empresa_servicio) {
      errorValidacion.push({ campo: 'id_empresa_servicio', mensaje: 'Campo requerido' });
    }
    if (!cuerpo_vehiculo.id_detalle_ruta_itinerario) {
      errorValidacion.push({ campo: 'id_detalle_ruta_itinerario', mensaje: 'Campo requerido' });
    }
    if (!cuerpo_vehiculo.id_resolucion) {
      errorValidacion.push({ campo: 'id_resolucion', mensaje: 'Campo requerido' });
    }
  
    return errorValidacion;
  }

  