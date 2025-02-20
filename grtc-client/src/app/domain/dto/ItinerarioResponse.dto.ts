export interface ListaItinerarioResponse {
    id_detalle_ruta_itinerario: number;
    id_empresa_servicio: number;
    origen: string;
    destino: string;
    corredor?: string;
    itinerario: string; 
    frecuencia: string | null; 
}

export interface CrearItinerarioMessageResponse {
    id_detalle_ruta_itinerario: number
    text: string
}

export interface ModificarItinerarioMessageResponse {
    text: string
}

export interface EliminarItinerarioMessageResponse {
    text: string
}
