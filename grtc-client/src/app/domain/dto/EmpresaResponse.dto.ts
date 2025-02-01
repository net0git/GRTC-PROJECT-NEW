export interface EmpresaResponse {

    id_empresa: number;
    id_representante_legal: number;
    razon_social: string;
    ruc: string;
    direccion: string;
    correo: string;
    telefono: string;
    distrito: string;
    provincia: string;
    departamento: string;
    nota: string;
    
}

export interface CrearEmpresaMessageResponse{
    id_empresa: number
}

export interface modificarEmpresaResponse{
    text: string
}