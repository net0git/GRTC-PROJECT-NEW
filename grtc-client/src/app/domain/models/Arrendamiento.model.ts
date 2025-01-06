export interface ArrendamientoModel {

    id_contrato: number;
    id_empresa_servicio: number;
    direccion: string;
    arrendador: string;
    dni: string | null;
    fecha_fin: Date| string; // Puede usarse `Date` si se parseará antes de asignar
    fecha_inicio: Date| string; // Igual que `fecha_fin`, se puede usar `Date`
    propiedad: string;
    departamento: string;
    provincia: string;
    distrito: string;

}