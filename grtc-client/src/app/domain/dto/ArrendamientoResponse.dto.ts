export interface ListaArrendamientoResponse {
    id_contrato: number
    id_empresa_servicio: number
    arrendador: string
    fecha_inicio: Date | string
    fecha_fin: Date | string
    propiedad: string
    direccion: string
    dni: string | null
    departamento: string
    provincia: string
    distrito: string

}

export interface CrearArrendamientoMessageResponse{
    id_contrato: number
    text: string
}

export interface ModificarArrendamientoMessageResponse{
    text: string
}

export interface EliminarArrendamientoMessageResponse{
    text: string
}