export interface ListaResolucionResponse {
  id_resolucion: number;
  anio_resolucion: string;
  descripcion: string | null;  // Puede ser null, así que lo marcamos como nullable.
  documento?: string;
  fecha_resolucion: Date | string;  // Se usa string porque el valor es una fecha en formato ISO 8601.
  nombre_resolucion: string;
  nro_resolucion: number;
  tomo_resolucion: number;
}

export interface ResolucionResponse {
  id_resolucion: number;
  anio_resolucion: string;
  descripcion: string;
  documento: string;
  fecha_resolucion: Date | string;
  nombre_resolucion: string;
  nro_resolucion: number | null;
  tomo_resolucion: number | null;
}

export interface CrearResolucionMessageResponse {
  id_resolucion: number
  text: string
}

export interface CrearResolucionEmpresaServicioMessageResponse{
  text:string
}

export interface ModificarResolucionMessageResponse{
  text:string
}

