
export interface UsuarioModel{
   
    id_usuario?: number | undefined | null;
    id_persona: number ;
    nombre_usuario: string;
    rol: string;
    password?: string;
    estado?: string | undefined | null

}