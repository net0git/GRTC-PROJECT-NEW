export interface CertificadoModel {
    id_certificado:number;
    nro_certificado:number|null;
    anio_certificado:string;
    fecha_certificado:Date | string;
    nombre_certificado:string;
    tomo_certificado:number | null;
    documento:string;
}