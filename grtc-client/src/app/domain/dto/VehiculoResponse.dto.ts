export interface ListaVehiculosResponse {
    
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