import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EncabezadoGrtcImageBase64 } from './imgEncabezadoPdf';
import { formatDate } from '@angular/common';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { ListaVehiculosDetalleResponse } from '../../src/app/domain/dto/VehiculoResponse.dto';
import { EmpresaServicioDetalleResponse } from '../../src/app/domain/dto/EmpresaServicioResponse.dto';
import { ListaResolucionResponse } from '../../src/app/domain/dto/ResolucionResponse.dto';

import { PDFDocument, rgb } from 'pdf-lib';

export function base64ToBytes(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function base64ToPdfBlob(base64: string): Blob {
  const bytes = base64ToBytes(base64);
  return new Blob([bytes], { type: "application/pdf" });
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]); // Extrae solo la parte Base64 después de la coma
      };

      reader.onerror = (error) => {
          reject(error);
      };

      reader.readAsDataURL(file);
  });
}

export function ShowDocumentoPdf(
  documento: string,
  sanitizer: DomSanitizer,
  errorUrl: string = 'public/doc/error_carga.pdf'
): SafeResourceUrl {
  if (documento) {
    const pdfBlob = base64ToPdfBlob(documento);
    return sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));
  } else {
    return sanitizer.bypassSecurityTrustResourceUrl(errorUrl);
  }
}

async function addMessageToPdf(base64: string, message: string): Promise<Uint8Array> {
  // Si el Base64 tiene encabezado, elimina esa parte.
  if (base64.startsWith('data:application/pdf;base64,')) {
    base64 = base64.split(',')[1];
  }
  try {
    // Convertir Base64 a Uint8Array
    const pdfBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const pdfDoc = await PDFDocument.load(pdfBytes);
    // Obtener la primera página
    const pages = pdfDoc.getPages();
    // Iterar sobre cada página
    pages.forEach(page => {
      page.drawText(message, {
        x: page.getWidth()*0.03,
        y: page.getHeight() - page.getHeight()*0.03, // Ajuste de la posición para que se vea bien en todas las páginas
        size: page.getHeight() * 0.01,
        color: rgb(64 / 255, 64 / 255, 64 / 255), // Plomo
      });
    });
    // const firstPage = pages[0];

    // // Agregar texto superpuesto
    // firstPage.drawText(message, {
    //   x: 20,
    //   y: 820,
    //   size: 14,
    //   color: rgb(1, 0, 0), // Rojo
    // });

    return pdfDoc.save();
  } catch (error) {
    console.error('Error al decodificar el Base64:', error);
    throw error;
  }
}

export async function ShowDocumentoPdfMarcado(
  documento: string,
  message: string,
  sanitizer: DomSanitizer
) {
  try {
    // Modificar el PDF antes de convertirlo en Blob
    const modifiedPdfBytes = await addMessageToPdf(documento, message);

    // Crear un Blob a partir de los bytes del PDF
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

    // Crear una URL segura para el Blob
    const objectUrl = URL.createObjectURL(blob);

    // Usar DomSanitizer para marcar la URL como segura
    return sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

export function generatePDFreporte(
  lista_vehiculos: ListaVehiculosDetalleResponse[],
  empresa_detalle: EmpresaServicioDetalleResponse,
  resoluciones_empresa_servicio: ListaResolucionResponse[],
  nombre_usuario: string,
  sanitizer: DomSanitizer) {
  // Obtener la fecha y hora actual
  const fechaHoraActual = new Date();

  // Obtener la fecha actual (en formato YYYY-MM-DD)
  const fechaActual = fechaHoraActual.toISOString().split('T')[0];

  // Obtener la hora actual (en formato HH:MM:SS)
  const horaActual = fechaHoraActual.toTimeString().split(' ')[0];

  const doc = new jsPDF();




  // **************************************************************************************
  // Datos de la tabla
  const tableDataVehiculos: (string | number)[][] = [
    ['N', 'PLACA', 'AÑO', 'MODELO', 'MARCA', 'CTG', 'DOCUMENTO'],

  ];

  for (let i = 0; i < lista_vehiculos.length; i++) {
    const vehiculo = lista_vehiculos[i];
    const fila = [
      i + 1, // Número de fila
      vehiculo.placa,
      vehiculo.anio_fabricacion,
      vehiculo.modelo,
      vehiculo.marca,
      vehiculo.categoria,
      vehiculo.nombre_resolucion,
    ];
    tableDataVehiculos.push(fila);
  }

  console.log(tableDataVehiculos)
  // *****************************************************************************
  // Agregar una imagen a tu PDF

  // Posición y tamaño de la imagen en el PDF


  let imgData = EncabezadoGrtcImageBase64
  doc.addImage(imgData, 'JPEG', 10, 10, 190, 20);//(x,y,ancho,alto)
  doc.line(10, 35, 200, 35);
  // Establece el tamaño de fuente más pequeño
  doc.setFontSize(11); // Cambia el valor a tu tamaño de fuente deseado
  //textos subtitulos
  const text1 = 'RAZON SOCIAL :';
  const text2 = 'RUC :';
  const text3 = 'DIRECCION :';
  const text4 = 'TELEFONO :';
  const text5 = 'REPRESENTANTE :';
  const text6 = 'VIGENTE HASTA :';
  const text7 = 'DOC. AUTORIZA :';
  //textos constenido
  const contenido1 = empresa_detalle.razon_social;
  const contenido2 = empresa_detalle.ruc;
  const contenido3 = empresa_detalle.direccion;
  const contenido4 = empresa_detalle.telefono || '-';
  const contenido5 = empresa_detalle.representante_legal;
  const contenido6 = formatDate(empresa_detalle.fecha_final, 'dd/MM/yyyy', 'en-US');
  let contenido7 = '-';

  for (let i = 0; i < resoluciones_empresa_servicio.length; i++) {
    const fecha_resolucion = formatDate(resoluciones_empresa_servicio[i].fecha_resolucion, 'dd/MM/yyyy', 'en-US');
    if (formatDate(empresa_detalle.fecha_inicial, 'dd/MM/yyyy', 'en-US') === fecha_resolucion) {
      //console.log(contenido6)
      contenido7 = resoluciones_empresa_servicio[i].nombre_resolucion
      //console.log(this.resoluciones_empresa_servicio[i].nombre_resolucion)
    }

    console.log(empresa_detalle)
  }
  const x = 14; // Posición horizontal
  const y = 40; // Posición vertical
  const rectWidth = 42; // Ancho del rectángulo basado en el texto
  //  const rectWidth = doc.getStringUnitWidth(text) * 12; // Ancho del rectángulo basado en el texto
  const rectHeight = 8; // Altura del rectángulo


  //SUBTITULOS DATOS
  //RAZON SOCIAL
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text1, x + 2, y + rectHeight - 2);
  //RUC
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y + 10, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text2, x + 2, y + 10 + rectHeight - 2);
  //DIRECCION 
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y + 20, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text3, x + 2, y + 20 + rectHeight - 2);
  //TELEFONOS
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y + 30, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text4, x + 2, y + 30 + rectHeight - 2);
  //REPRESENTANTE LEGAL
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y + 40, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text5, x + 2, y + 40 + rectHeight - 2);
  //VEGENCIA HASTA
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y + 50, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text6, x + 2, y + 50 + rectHeight - 2);
  //DOCUMENTO QUE LO AUTORIZA
  // Establece el color de fondo del rectángulo a gris
  doc.setFillColor(140, 140, 140); // Gris en RGB
  doc.rect(x, y + 60, rectWidth, rectHeight, 'F'); //  'F' indica que se debe rellenar
  doc.setTextColor(255, 255, 255); // Blanco en RGB
  doc.text(text7, x + 2, y + 60 + rectHeight - 2);

  //CONTENIDO DATOS
  doc.setTextColor(0, 0, 0); // Blanco en RGB
  //RAZON SOCIAL 
  // Dibuja el rectángulo para ruc
  doc.rect(x + 45, y, rectWidth + 95, rectHeight);
  doc.text(contenido1, x + 47, y + rectHeight - 2);
  //RUC
  doc.rect(x + 45, y + 10, rectWidth + 95, rectHeight);
  doc.text(contenido2, x + 47, y + 10 + rectHeight - 2);
  //DIRECCION
  doc.rect(x + 45, y + 20, rectWidth + 95, rectHeight);
  doc.text(contenido3, x + 47, y + 20 + rectHeight - 2);
  //TELEFONOS
  doc.rect(x + 45, y + 30, rectWidth + 95, rectHeight);
  doc.text(contenido4, x + 47, y + 30 + rectHeight - 2);
  //REPRESENTANTE
  doc.rect(x + 45, y + 40, rectWidth + 95, rectHeight);
  doc.text(contenido5, x + 47, y + 40 + rectHeight - 2);
  //VIGENTE
  doc.rect(x + 45, y + 50, rectWidth + 95, rectHeight);
  doc.text(contenido6, x + 47, y + 50 + rectHeight - 2);
  ////VIGENTE
  doc.rect(x + 45, y + 60, rectWidth + 95, rectHeight);
  doc.text(contenido7, x + 47, y + 60 + rectHeight - 2);

  // Otro contenido
  doc.setFontSize(10)
  doc.text(fechaActual + ' ' + horaActual + ' ' + nombre_usuario, 10, 10);

  ///VEHICULOS ASOCIADOS A LA EMPRESA
  let currentY = 113;
  console.log(currentY)

  const tableStyles = {
    tableLineColor: [192, 192, 192], // Gris
    lineWidth: 0.1, // Grosor de las líneas de la tabla
  };

  // Encabezado de la tabla y datos de la tabla
  autoTable(doc, {
    head: [tableDataVehiculos[0]],
    body: tableDataVehiculos.slice(1),
    startY: currentY,
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 20 },
      2: { cellWidth: 12 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 15 },
      6: { cellWidth: 72 },
    },
    styles: tableStyles,

  },

  );

  for (let i = 1; i <= doc.internal.pages.length - 1; i++) {
    doc.setPage(i); // Cambiar a la página con el índice deseado
    // doc.addImage(imgData, 'JPEG', 10, 10, 190, 20);//(x,y,ancho,alto)
    doc.line(10, doc.internal.pageSize.height - 14, 200, doc.internal.pageSize.height - 14);
    // Realiza operaciones en la página actual, como agregar contenido adicional o modificarla
    doc.text('página ' + i + ' de ' + (doc.internal.pages.length - 1), 170, doc.internal.pageSize.height - 10);
  }
  // Genera una representación en Blob del PDF
  const blob = doc.output('blob');
  return sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
}