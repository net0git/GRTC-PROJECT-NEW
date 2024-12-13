export interface EmpresaServicioModel {
    id_empresa_servicio: number;
    id_tipo_servicio: number;
    id_empresa: number;
    fecha_inicial: Date| string ;
    fecha_final: Date | string;
    expediente: string;
}