export interface ListaResolucionResponse {
    id_resolucion: number;
    anio_resolucion: string;
    descripcion: string | null;  // Puede ser null, así que lo marcamos como nullable.
    documento: string;
    fecha_resolucion: string;  // Se usa string porque el valor es una fecha en formato ISO 8601.
    nombre_resolucion: string;
    nro_resolucion: number;
    tomo_resolucion: number;
  }