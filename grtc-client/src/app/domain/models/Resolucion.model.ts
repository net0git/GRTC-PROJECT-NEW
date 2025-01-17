export interface ResolucionModel {
    id_resolucion: number;
    anio_resolucion: string;
    descripcion: string;
    documento: string;
    fecha_resolucion: Date | string  ; 
    nombre_resolucion: string;
    nro_resolucion: number | null;
    tomo_resolucion: number | null;
}