export interface ListaVehiculosDetalleResponse {

        id_vehiculo: number; // v.id_vehiculo
        id_tuc: number; // v.id_tuc
        tipo_servicio: string; // ts.denominacion
        razonSocial: string; // e.razon_social 
        placa: string; // v.placa
        nro_part_reg: string; // v.nro_part_reg
        modalidad: string; // v.modalidad
        estado: string; // v.estado
        carga: string; // v.carga
        peso: number; // v.peso
        categoria: string; // v.categoria
        anio_fabricacion: number; // v.anio_fabricacion
        color: string; // v.color
        nro_chasis: string; // v.nro_chasis
        nro_asientos: number; // v.nro_asientos
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

        id_vehiculo: number; // v.id_vehiculo
        id_resolucion: number
        id_detalle_ruta_itinerario: number; // i.itinerario
        id_empresa_servicio: number
        id_tuc: number; // v.id_tuc
        placa: string; // v.placa
        categoria: string; // v.categoria
        anio_fabricacion: number; // v.anio_fabricacion
        peso: number; // v.peso
        carga: string; // v.carga
        serie: string; // v.serie
        nro_asientos: number; // v.nro_asientos
        color: string; // v.color
        carroceria: string; // v.carroceria
        modalidad: string; // v.modalidad
        nro_part_reg: string; // v.nro_part_reg
        estado: string; // v.estado
        nro_chasis: string; // v.nro_chasis
        marca: string; // v.marca
        modelo: string; // v.modelo   
}

export interface CrearVehiculoMessageResponse {
        text: string
}

export interface DarBajaVehiculoMessageResponse {
        text: string
}