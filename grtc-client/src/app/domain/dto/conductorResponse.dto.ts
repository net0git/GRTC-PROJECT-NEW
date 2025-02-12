
export interface ListaConductoresResponse {
    id_empresa_servicio?: number
    id_conductor: number
    id_persona: number
    categoria: string
    nombres: string
    ap_paterno: string
    ap_materno: string
    tipo_doc: string
    documento: string
    telefono: string
    correo: string
    nro_licencia: string
}

export interface ListaTotalConductorResponse {
    id_conductor: number;
    nro_licencia: string;
    categoria: string | null;
    nombre_conductor: string;
    apellido_paterno: string;
    apellido_materno: string;
    tipo_documento: string;
    numero_documento: string;
    telefono: string;
    correo: string;
    nombre_empresa: string;
  }
  

export interface CrearConductorMessageResponse{
    text: string
}

export interface ModificarConductorMessageResponse{
    text: string
}

export interface EliminarConductorMessageResponse{
    text: string
}