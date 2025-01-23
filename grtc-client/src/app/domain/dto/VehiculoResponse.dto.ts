export interface ListaVehiculosDetalleResponse {

        id_vehiculo: number; // v.id_vehiculo
        id_tuc: number; // v.id_tuc
        tipo_servicio: string; // ts.denominacion
        razon_social: string; // e.razon_social 
        placa: string; // v.placa
        nro_part_reg: string; // v.nro_part_reg
        modalidad: string; // v.modalidad
        estado: string; // v.estado
        carga: string; // v.carga
        peso: string; // v.peso
        categoria: string; // v.categoria
        anio_fabricacion: string; // v.anio_fabricacion
        color: string; // v.color
        nro_chasis: string; // v.nro_chasis
        nro_asientos: string; // v.nro_asientos
        marca: string; // v.marca
        modelo: string; // v.modelo
        serie: string; // v.serie
        carroceria: string; // v.carroceria
        fecha_inicial: string; // r.fecha_resolucion
        fecha_final: string; // es.fecha_final
        nombre_resolucion: string; // r.nombre_resolucion
        itinerario: string; // i.itinerario

}

export interface ListaVehiculosResponse {

        id_vehiculo: number; 
        id_resolucion: number
        id_detalle_ruta_itinerario: number; 
        id_empresa_servicio: number
        id_tuc?: number; 
        placa: string; 
        categoria: string; 
        anio_fabricacion: string; 
        peso: string; 
        carga: string; 
        serie: string; 
        nro_asientos: string; 
        color: string; 
        carroceria: string; 
        modalidad: string; 
        nro_part_reg: string;
        estado: string;
        nro_chasis: string;
        marca: string;
        modelo: string;

}

export interface ModificarTucVehiculoAsociadoMessageResponse {
        text: string
}

export interface CrearVehiculoMessageResponse {
        text: string
}

export interface DarBajaVehiculoMessageResponse {
        text: string
}