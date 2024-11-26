import { PersonaModel } from "../models/Persona.model";

export interface Perfil{
    
}

export interface UsuarioResponse {
    success: boolean;
    id_usuario: number| undefined | number; // Según lo que devuelva la API.
    nombre_usuario: string;
    rol: string; // Asumiendo que el rol es un string.
}

