export interface ItinerarioModel {
    id_detalle_ruta_itinerario: number;
    id_empresa_servicio: number;
    origen: string;
    destino: string;
    itinerario: string;
    corredor?: string;
    frecuencia: string | null;
  }