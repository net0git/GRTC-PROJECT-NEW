export interface ListaEmpresaServicioReporteResponse {

  id_empresa_servicio: number;      // ID único del servicio de la empresa
  id_tipo_servicio: number; 
  razon_social: string;                  // Razón social de la empresa
  ruc: string;   
  departamento: string;
  distrito: string;
  documento: string; 
  provincia: string;                  // RUC de la empresa
  tipo_servicio: string;            // Denominación del tipo de servicio
  fecha_inicial: Date;            // Fecha de inicio del servicio (ISO 8601)
  fecha_final: Date;              // Fecha de finalización del servicio (ISO 8601)
  expediente: string;               // Expediente asociado al servicio
  estado: 'Activo' | 'Alerta' | 'Inactivo';  // Estado del servicio
  porcentaje: number;        
  nombres: string;
  ap_materno: string;
  ap_paterno: string;
  telefono: string; 

}

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

export interface EmpresaServicioDetalleResponse {
  id_empresa_servicio: number;      // ID del servicio
  id_tipo_servicio: number;         // ID del tipo de servicio
  tipo_servicio: string;            // Denominación del tipo de servicio
  id_empres: number;                // ID del empresa
  razon_social: string;             // Razon social de la empresa
  ruc: string;                      // RUC de la empresa
  direccion: string;                // Direccion de la empresa
  correo: string;                   // Correo de la empresa
  telefono: string;                 // Telefono de la empresa
  distrito: string;                  // distrito de la empresa
  provincia: string;                // provincia de la empresa
  departamento: string;             // departamento de la empresa
  nota: string;                      // nota de la empresa
  representante_legal: string;      // representante legal de la empresa
  fecha_inicial: Date;            // Fecha de inicio del servicio (ISO 8601)
  fecha_final: Date;              // Fecha de finalización del servicio (ISO 8601)
  expediente: string;               // Expediente asociado al servicio
  estado: string;  // Estado del servicio
  porcentaje: number;               // Porcentaje de avance del servicio
  notas: string; // notas de la empresa por servicio
}

export interface EmpresaServicioResponse {
  id_empresa_servicio: number;
  id_tipo_servicio: number;
  id_empresa: number;
  fecha_inicial: Date | string;
  fecha_final: Date | string;
  expediente: string;
}

export interface modificarEmpresaServicioResponse{
  text:string
}

export interface crearEmpresaServicioResponse{
  id_empresa_servicio: number
}

export interface modificarNotasEmpresaServicioResponse{
  text:string
}