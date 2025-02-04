export interface ListaCertificadoResponse {
  id_certificado: number;
  nro_certificado: number;
  anio_certificado: string;
  fecha_certificado: Date;
  nombre_certificado: string;
  tomo_certificado: number;
  documento: string;
}

export interface CertificadoResponse {
  id_certificado: number;
  nro_certificado: number | null;
  anio_certificado: string;
  fecha_certificado: Date | string;
  nombre_certificado: string;
  tomo_certificado: number | null;
  documento: string;
}

export interface CrearCertificadoMessageResponse {
  id_certificado: number
  text: string
}

export interface ModificarCertificadoMessageResponse{
  text:string
}

export interface CrearCertificadoInfraestructuraMessageResponse{
  text:string
}
