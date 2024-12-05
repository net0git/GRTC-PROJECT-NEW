import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { MarcaModel } from '../../domain/models/Marca.model';

export function ValidarMarcaForm(cuerpo_marca: MarcaModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (!cuerpo_marca.nombre_marca) {
      errorValidacion.push({ campo: 'nombre marca', mensaje: 'Campo requerido' });
    }
    return errorValidacion;
  }