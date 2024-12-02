import { PersonaModel } from "../models/Persona.model"

export interface ListarPersonasResponse {
    data: PersonaModel[]
}

export interface personaMessageResponse{
    id_persona: number
    text: string
}