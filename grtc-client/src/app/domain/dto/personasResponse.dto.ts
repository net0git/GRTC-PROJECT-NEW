import { PersonaModel } from "../models/Persona.model"

export interface ListarPersonasResponse {
    data: PersonaModel[]
}

export interface CrearPersonaMessageResponse{
    id_persona: number
    text: string
}

export interface ModificarPersonaPersonaMessageResponse{
    text: string
}