export interface HistorialVehicularResponse {

    id_historial: number;
    id_empresa_servicio: number;
    condicion: string;
    nombre_resolucion: string;
    fecha_resolucion: Date;
    ruta: string;
    placa: string;
    observaciones: string | null;

}

export interface HistorialVehicularDetalleResponse {

    id_historial: number;
    condicion: string;
    create_at: Date;
    nombre_resolucion: string;
    placa: string;
    ruta: string;
    id_empresa_servicio: number;
    fecha_resolucion: Date;
    id_empresa: number;
    nombre_empresa: string;

}

export interface CrearHistorialVehicularMessageResponse{
    text: string
}