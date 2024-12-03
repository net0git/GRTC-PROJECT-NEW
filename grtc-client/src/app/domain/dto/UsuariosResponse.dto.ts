
export interface ListaUsuariosResponse {
    
    id_usuario: number;
    nombre_usuario: string;
    rol: string;
    estado: string;
    nombres: string;
    ap_paterno: string | null;
    ap_materno: string | null;
    tipo_doc: string | null;
    documento: string | null;
    telefono: string | null;
    correo: string | null;
}


export interface CrearUsuarioResponse {
    text: string;
}

