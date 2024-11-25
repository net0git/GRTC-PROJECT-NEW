export interface TipoInfraestructura{
    id_tipo_infraestructura?: number | undefined | null;
    denominacion: string;
}

export interface TipoEmpresaServicio{
    id_tipo_servicio?: number | undefined | null;
    denominacion: string;
}

export interface MarcaVehiculo{
    id_marca?: number | undefined | null;
    nombre_marca: string;
}

export interface ModeloVehiculo{
    id_modelo?: number | undefined | null;
    nombre_modelo: string;
    id_marca: number | undefined | null;
}

//--------------------------------------------------------------------------------------------------

export interface TipoInfraestructuraResponse {
    data: TipoInfraestructura[]
}

export interface TipoEmpresaServicioResponse {
    data: TipoEmpresaServicio[]
}

export interface TipoMarcaResponse {
    data: MarcaVehiculo[]
}

export interface TipoModeloResponse {
    data: ModeloVehiculo[]
}
