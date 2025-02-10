import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';


@Component({
  selector: 'app-reporte-panel',
  standalone: true,
  imports: [NavegadorComponent,SubnavegadorComponent, NgApexchartsModule],
  templateUrl: './reporte-panel.component.html',
  styleUrl: './reporte-panel.component.css'
})
export class ReportePanelComponent {
//Configuración del gráfico


barOptionsColor = {
  series: [
    { name: 'PERSONAS', data: [106, 0, 0, 0] },
    { name: 'TURISMO', data: [0, 50, 0, 0] },
    { name: 'ESTUDIANTES', data: [0, 0, 6, 0] },
    { name: 'TRABAJADORES', data: [0, 0, 0, 1] }
  ],
  chart: {
    height: 250,
    type: 'bar',
    stacked: true // Esto evitará que las barras se solapen
  } as ApexChart,
  title: {
    text: 'TIPO DE TRANSPORTE'
  } as ApexTitleSubtitle,
  xaxis: {
    categories: ['PERSONAS', 'TURISMO', 'ESTUDIANTES', 'TRABAJADORES']
  } as ApexXAxis,
  
};

barOptions = {
  series: [
    {
      name: 'Cantidad',
      data: [106, 30, 6, 10] // Antes estaban en xaxis, ahora en yaxis
    }
  ],
  chart: {
    height: 250,
    type: 'bar'
  } as ApexChart,
  title: {
    text: 'TIPO DE TRANSPORTE'
  } as ApexTitleSubtitle,
  yaxis: { // Se usa yaxis en lugar de xaxis
    categories: ['T. TERRESTRE', 'E.R TIPO I', 'E.R TIPO II', 'E.R TIPO III']
  } as ApexYAxis,
  xaxis: {
    labels: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%' // Ajusta el ancho de las barras para mejor visualización
    }
  }
};


// barOptions = {
//   series: [
//     {
//       name: 'Cantidad',
//       data: [106, 30, 6, 10]
//     }
//   ],
//   chart: {
//     height: 250,
//     type: 'bar'
//   } as ApexChart,
//   title: {
//     text: 'TIPO DE TRANSPORTE'
//   } as ApexTitleSubtitle,
//   xaxis: {
//     categories: ['T. TERRESTRE', 'E.R TIPO I', 'E.R TIPO II', 'E.R TIPO III']
//   } as ApexXAxis,
// };









DonutOptions = {
  series: [56, 30, 10], // ✅ Debe ser un array de números, NO de objetos
  chart: {
    height: 260,
    type: 'donut'
  } as ApexChart,
  labels: ['Activo', 'Inactivo', 'Alerta'], // ✅ Se usa "labels" en lugar de "xaxis.categories"
  title: {
    text: 'ESTADO DE EMPRESAS POR SERVICIO'
  } as ApexTitleSubtitle
};

PieOptions = {
  series: [106, 40, 30, 10], // ✅ Debe ser un array de números, NO de objetos
  chart: {
    height: 250,
    type: 'pie'
  } as ApexChart,
  labels: ['T. TERRESTRE', 'E.R TIPO I', 'E.R TIPO II', 'E.R TIPO III'], // ✅ Se usa "labels" en lugar de "xaxis.categories"
  title: {
    text: 'ESTADO DE EMPRESAS POR SERVICIO'
  } as ApexTitleSubtitle
};


PieMonoOptions = {
  series: [106, 40, 30, 10], // ✅ Array de números para el gráfico de pastel
  theme: {
    monochrome: {
      enabled: true,
      color: '#008FFB', // 🔹 Color base para el modo monocromático
      shadeTo: 'light', // 🔹 Puede ser 'light' o 'dark'
      shadeIntensity: 0.65 // 🔹 Ajusta la intensidad de los tonos
    }
  },
  chart: {
    height: 250,
    type: 'pie'
  } as ApexChart,
  labels: ['T. TERRESTRE', 'E.R TIPO I', 'E.R TIPO II', 'E.R TIPO III'], // ✅ Etiquetas correctas
 
  title: {
    text: 'TERMINALES Y ESTACIONES DE RUTA'
  } as ApexTitleSubtitle
};


}
