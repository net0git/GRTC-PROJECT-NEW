export interface ListaInfraestructuraResponse {

  id_tipo_infraestructura: number
  id_infraestructura: number
  expediente: string
  provincia: string
  distrito: string
  departamento: string
  nombre_infraestructura: string
  tipo_infraestructura: string
  direccion: string
  fecha_act: Date
  nombre_resolucion: string

}

export interface detalleInfraestructuraResponse {

  id_infraestructura: number
  id_tipo_infraestructura: number
  fecha_act: Date | string
  expediente: string
  ruc_empresa: string
  nombre_infraestructura: string
  direccion: string
  provincia: string
  distrito: string
  departamento: string
  mtc: boolean | null
  representante: string
  dni_representante: string
  empresa: string
  tipo_infraestructura: string

}

export interface InfraestructuraResponse {

  id_infraestructura: number;
  id_tipo_infraestructura: number;
  fecha_act: Date | string;
  expediente: string;
  ruc_empresa: string;
  nombre_infraestructura: string;
  direccion: string;
  provincia: string;
  distrito: string;
  departamento: string;
  mtc: boolean | null;
  representante: string;
  dni_representante: string;
  empresa: string;

}

export interface ModifcarInfraestructraMessageResponse {
  text: string
}