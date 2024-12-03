import { PersonaModel } from "../models/Persona.model";

export interface UsuarioLoginResponse {
    success: boolean;
    id_usuario: number; // Según lo que devuelva la API.
    id_persona: number; // Según lo que devuelva la API.
    nombre_usuario: string;
    rol: string; // Asumiendo que el rol es un string.
}

