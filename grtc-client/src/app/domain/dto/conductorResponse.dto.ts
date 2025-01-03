
export interface ListaConductoresResponse {
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

export interface CrearConductorMessageResponse{
    text: string
}

export interface ModificarConductorMessageResponse{
    text: string
}

export interface EliminarConductorMessageResponse{
    text: string
}