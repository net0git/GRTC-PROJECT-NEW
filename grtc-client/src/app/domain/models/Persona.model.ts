export interface PersonaModel{

    id_persona: number;
    nombres: string;
    ap_paterno: string;
    ap_materno: string;
    tipo_doc?: string | undefined | null;
    documento: string;
    telefono: string;
    correo: string
    
}