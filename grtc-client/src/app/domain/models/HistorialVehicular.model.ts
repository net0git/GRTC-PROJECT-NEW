export interface HistorialVehicularModel {

    id_empresa_servicio: number;
    condicion: string;
    nombre_resolucion: string;
    fecha_resolucion: Date;
    ruta: string;
    placa: string;
    observaciones: string | null;

}