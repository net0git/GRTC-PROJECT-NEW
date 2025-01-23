export interface VehiculoModel {
    id_vehiculo: number;
    placa: string;
    nro_part_reg: string;
    modalidad: string;
    estado: string;

    carga: string;
    peso: string;
    categoria: string;
    anio_fabricacion: string;
    color: string;
    nro_chasis: string;
    nro_asientos: string;
    marca: string;
    modelo: string;
    serie: string;
    carroceria: string;

    id_empresa_servicio: number;
    id_detalle_ruta_itinerario: number;
    id_resolucion: number;
    id_tuc?: number;
  }
  