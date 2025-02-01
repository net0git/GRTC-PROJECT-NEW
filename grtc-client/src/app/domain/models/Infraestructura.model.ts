export interface InfraestructuraModel {      
    id_infraestructura: number;
    id_tipo_infraestructura: number;
    fecha_act: Date | string;
    expediente: string ;
    ruc_empresa: string ;
    nombre_infraestructura: string;
    direccion: string;
    provincia: string;
    distrito: string;
    departamento: string;
    mtc: boolean;
    representante: string;
    dni_representante: string;
    empresa: string;
}