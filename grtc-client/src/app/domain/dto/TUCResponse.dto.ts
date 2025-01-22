export interface TUCResponse {

    id_tuc?: number;
    nro_impresion: number;
    nro_tuc: number;
    placa: string;
    razon_social: string;
    anio_fabricacion: string;
    marca: string;
    modalidad: string;
    nro_part_reg: string;
    nombre_resolucion: string;
    condicion: string;
    color: string;
    nro_chasis: string;
    nro_asientos: string;
    carga: string;
    peso: string;
    fecha_exp: Date;
    fecha_ven: Date;
    ruta: string;
    copia: string;

}

export interface CrearTUCMessageResponse{
    id_tuc: number;
    text: string
}

export interface ModificarTUCResponse{
    text: string
}

   