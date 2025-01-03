export interface ListaArrendamientoResponse {
    id_contrato: number
    id_empresa_servicio: number
    arrendador: string
    fecha_inicio: Date
    fecha_fin: Date
    propiedad: string
    direccion: string
    dni: string
    departamento: string
    provincia: string
    distrito: string
}