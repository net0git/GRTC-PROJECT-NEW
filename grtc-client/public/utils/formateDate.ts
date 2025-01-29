export function FechaConFormato(fechaISO: string | Date ): string {
    // Convierte la fecha ISO a formato "yyyy-mm-dd"
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtiene el día
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes
    const anio = fecha.getFullYear(); // Obtiene el año
    // Retorna la fecha formateada en "yyyy-mm-dd"
    return `${anio}-${mes}-${dia}`;
  }


  export function FechaConFormato_ddMMyyyy(fechaISO: string | Date): string {
    // Convierte la fecha ISO a formato "yyyy-mm-dd"
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0'); // Obtiene el día
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes
    const anio = fecha.getFullYear(); // Obtiene el año
    // Retorna la fecha formateada en "yyyy-mm-dd"
    return `${dia}/${mes}/${anio}`;
  }