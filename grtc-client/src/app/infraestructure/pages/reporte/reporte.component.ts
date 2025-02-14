import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexPlotOptions, ApexDataLabels } from "ng-apexcharts";
import { EmpresasServicioComponent } from '../../components/reportes/empresas-servicio/empresas-servicio.component';
import { InfraestructuraComponent } from '../../components/reportes/infraestructura/infraestructura.component';
import { VehiculosComponent } from '../../components/reportes/vehiculos/vehiculos.component';
import { ConductoresComponent } from '../../components/reportes/conductores/conductores.component';
declare var bootstrap: any;

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, NgApexchartsModule, EmpresasServicioComponent, InfraestructuraComponent, VehiculosComponent, ConductoresComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  private myModal: any;

  openModal() {
    this.myModal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    this.myModal.show();
  }

  openModalEmpresaServicio() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalEmpresasServicio'));
    this.myModal.show();
  }

  openModalVehiculos() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalVehiculos'));
    this.myModal.show();
  }

  openModalConductores() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalConductores'));
    this.myModal.show();
  }

  openModalInfraestructura(){
    this.myModal = new bootstrap.Modal(document.getElementById('modalInfraestructura'));
    this.myModal.show();
  }

  openModalVehiculosRutas(){
    this.myModal = new bootstrap.Modal(document.getElementById('modalVehiculosRutas'));
    this.myModal.show();
  }

  openModalEmpresasRutas(){
    this.myModal = new bootstrap.Modal(document.getElementById('modalEmpresasRutas'));
    this.myModal.show();
  }

  openModalEmpresasAnio(){
    this.myModal = new bootstrap.Modal(document.getElementById('modalEmpresasAnio'));
    this.myModal.show();
  }

  openModalVehiculosEmpresa(){
    this.myModal = new bootstrap.Modal(document.getElementById('modalVehiculosEmpresa'));
    this.myModal.show();
  }

  openModalhistorialVehiculo(){
    this.myModal = new bootstrap.Modal(document.getElementById('modalhistorialVehiculo'));
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }

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
      text: 'EMPRESAS POR SERVICIO'
    } as ApexTitleSubtitle,
    xaxis: {
      categories: ['PERSONAS', 'TURISMO', 'ESTUDIANTES', 'TRABAJADORES']
    } as ApexXAxis,

  };

  barOptions: any = {
    series: [
      {
        name: 'Cantidad',
        data: [106, 30, 6, 10]
      }
    ],
    chart: {
      type: 'bar',
      height: 250
    } as ApexChart,
    title: {
      text: 'INFRAESTRUCTURA'
    } as ApexTitleSubtitle,
    plotOptions: {
      bar: {
        horizontal: true // ✅ Activa el modo horizontal
      }
    } as ApexPlotOptions,
    dataLabels: {
      enabled: false
    } as ApexDataLabels,
    xaxis: {
      categories: ['T. TERRESTRE', 'E.R TIPO I', 'E.R TIPO II', 'E.R TIPO III']
    } as ApexXAxis,
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    } as ApexYAxis
  };

  PieOptions = {
    series: [106, 40, 30],
    chart: {
      height: 250,
      type: 'pie'
    } as ApexChart,
    labels: ['ACTIVO', 'INACTIVO', 'ALERTA'],
    title: {
      text: 'ESTADO DE EMPRESAS POR SERVICIO'
    } as ApexTitleSubtitle
  };

  DonutOptions = {
    series: [56, 30, 10, 14],
    chart: {
      height: 250,
      type: 'donut'
    } as ApexChart,
    labels: [`PERSONAS`, 'TURISMO', 'ESTUDIANTES', 'TRABAJADORES'],
    title: {
      text: 'VEHICULOS POR SERVICIO'
    } as ApexTitleSubtitle
  };

}
