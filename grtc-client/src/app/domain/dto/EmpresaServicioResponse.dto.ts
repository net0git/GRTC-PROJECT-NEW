export interface ListaEmpresaServicioResponse {

    id_empresa_servicio: number;      // ID único del servicio de la empresa
    empresa: string;                  // Razón social de la empresa
    ruc: string;                      // RUC de la empresa
    id_tipo_servicio: number;         // ID del tipo de servicio
    tipo_servicio: string;            // Denominación del tipo de servicio
    fecha_inicial: Date;            // Fecha de inicio del servicio (ISO 8601)
    fecha_final: Date;              // Fecha de finalización del servicio (ISO 8601)
    expediente: string;               // Expediente asociado al servicio
    estado: 'Activo' | 'Alerta' | 'Inactivo';  // Estado del servicio
    porcentaje: number;               // Porcentaje de avance del servicio

  }