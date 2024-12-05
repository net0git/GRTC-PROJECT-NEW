import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { ModeloModel } from '../../domain/models/Modelo.model';

export function  ValidarModeloForm(cuerpo_modelo: ModeloModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (!cuerpo_modelo.nombre_modelo) {
      errorValidacion.push({ campo: 'nombre modelo', mensaje: 'Campo requerido' });
    }
    return errorValidacion;
  }