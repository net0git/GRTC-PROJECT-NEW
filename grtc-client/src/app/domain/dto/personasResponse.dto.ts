export interface PersonaResponse {

    id_persona: number;
    nombres: string;
    ap_paterno: string;
    ap_materno: string;
    tipo_doc?: string | undefined | null;
    documento: string;
    telefono: string;
    correo: string
}

export interface CrearPersonaMessageResponse{
    id_persona: number
    text: string
}

export interface ModificarPersonaMessageResponse{
    text: string
}

export interface EliminarPersonaMessageResponse{
    text: string
}