import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent, ApexChart, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexPlotOptions, ApexDataLabels } from "ng-apexcharts";
import { EmpresasServicioComponent } from '../../components/reportes/empresas-servicio/empresas-servicio.component';
import { InfraestructuraComponent } from '../../components/reportes/infraestructura/infraestructura.component';
import { VehiculosComponent } from '../../components/reportes/vehiculos/vehiculos.component';
import { ConductoresComponent } from '../../components/reportes/conductores/conductores.component';
import { VehiculosRutaComponent } from '../../components/reportes/vehiculos-ruta/vehiculos-ruta.component';
import { EmpresaServicioRutaComponent } from '../../components/reportes/empresa-servicio-ruta/empresa-servicio-ruta.component';
import { VehiculosHistorialComponent } from '../../components/reportes/vehiculos-historial/vehiculos-historial.component';
import { EmpresaServicioAnioComponent } from '../../components/reportes/empresa-servicio-anio/empresa-servicio-anio.component';
import { HistorialVehiculoComponent } from '../../components/historial-vehiculo/historial-vehiculo.component';
import { ReporteService } from '../../../infraestructure/services/remoto/reporte/reporte.service';
import { AllReportComponent } from '../../components/reportes/all-report/all-report.component';

declare var bootstrap: any;

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [
    NavegadorComponent,
    SubnavegadorComponent,
    NgApexchartsModule,
    EmpresasServicioComponent,
    InfraestructuraComponent,
    VehiculosComponent,
    ConductoresComponent,
    VehiculosRutaComponent,
    EmpresaServicioRutaComponent,
    VehiculosHistorialComponent,
    EmpresaServicioAnioComponent,
    HistorialVehiculoComponent,
    AllReportComponent
  ],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit {

  private myModal: any;
  cantidadEmpresasSercicio: any;

  cantidad_t_Personas: number = 0;
  cantidad_t_Turismo: number = 0;
  cantidad_t_Estudiantes: number = 0;
  cantidad_t_Trabajadores: number = 0;

  cantidad_v_personas: number = 0;
  cantidad_v_turismo: number = 0;
  cantidad_v_trabajadores: number = 0;
  cantidad_v_estudiantes: number = 0;

  cantidad_t_terrestre: number = 0;
  cantidad_er_tipo1: number = 0;
  cantidad_er_tipo2: number = 0;
  cantidad_er_tipo3: number = 0;

  totalEmpresas: number = 0;
  totalVehiculos: number = 0;
  totalInfraestructura: number = 0;
  totalConductores: number = 0;
  cantidad_estado_empresas: any = {}

  barOptionsColor: any
  PieOptions: any
  DonutOptions: any
  barOptions: any




  constructor(private reporteService: ReporteService) { }
  ngOnInit(): void {
    this.cantidadEmpresasPorTipoServicio()
    this.cantidadEstadoEmpresas()
    this.cantidadVehiculosPorTipoServicio()
    this.cantidadDeInfraestructura()
    this.cantidoConductores()

  }

  cantidadEmpresasPorTipoServicio() {
    this.reporteService.CantidadEmpresasPorTipoServicio().subscribe({
      next: (data: any) => {
        this.cantidad_t_Personas = Number(data[0].cantidad_empresas)
        this.cantidad_t_Turismo = Number(data[1].cantidad_empresas)
        this.cantidad_t_Trabajadores = Number(data[2].cantidad_empresas)
        this.cantidad_t_Estudiantes = Number(data[3].cantidad_empresas)
        this.totalEmpresas = this.cantidad_t_Personas + this.cantidad_t_Turismo + this.cantidad_t_Trabajadores + this.cantidad_t_Estudiantes


      },
      error: (err) => {
        console.error('Error al obtener cantidad de empresas por tipo de servicio:', err);
      },
      complete: () => {
        console.log('cantidad de empresas por tipo de servicio obtenida');
        this.GraficarEmpreasServicio()

      }
    });
  }

  cantidadDeInfraestructura() {
    this.reporteService.CantidadDeInfraestructura().subscribe({
      next: (data: any) => {
        this.cantidad_t_terrestre = Number(data[0].cantidad_infraestructuras)
        this.cantidad_er_tipo1 = Number(data[1].cantidad_infraestructuras)
        this.cantidad_er_tipo2 = Number(data[2].cantidad_infraestructuras)
        this.cantidad_er_tipo3 = Number(data[3].cantidad_infraestructuras)
        this.totalInfraestructura = this.cantidad_t_terrestre + this.cantidad_er_tipo1 + this.cantidad_er_tipo2 + this.cantidad_er_tipo3

      },
      error: (err) => {
        console.error('Error al obtener cantidades de infraestructura:', err);
      },
      complete: () => {
        console.log('cantidades de infraestructura obtenidas');
        this.graficaInfraestructura()
      }
    });
  }

  cantidadEstadoEmpresas() {
    this.reporteService.CantidadEstadoEmpresas().subscribe({
      next: (data: any) => {
        this.cantidad_estado_empresas = data
        console.log(this.cantidad_estado_empresas)
      },
      error: (err) => {
        console.error('Error al obtener cantidades de estado de empresas:', err);
      },
      complete: () => {
        console.log('cantidades de estado de empresas obtenidas');
        this.graficaEstadosEmpresasServicio()
      }
    });
  }

  cantidadVehiculosPorTipoServicio() {
    this.reporteService.CantidadVehiculosPorTipoServicio().subscribe({
      next: (data: any) => {
        this.cantidad_v_personas = Number(data[0].cantidad_vehiculos)
        this.cantidad_v_turismo = Number(data[1].cantidad_vehiculos)
        this.cantidad_v_trabajadores = Number(data[2].cantidad_vehiculos)
        this.cantidad_v_estudiantes = Number(data[3].cantidad_vehiculos)
        this.totalVehiculos = this.cantidad_v_personas + this.cantidad_v_turismo + this.cantidad_v_trabajadores + this.cantidad_v_estudiantes

      },
      error: (err) => {
        console.error('Error al obtener cantidades de vehiculos por tipo de sercio:', err);
      },
      complete: () => {
        console.log('cantidades de vehiculos por tipo de servicio obtenidas');
        this.graficaVehiculos()
      }
    });
  }

  cantidoConductores() {
    this.reporteService.CantidadDeConductores().subscribe({
      next: (res) => {
        console.log('cantidad de conductores:', res);
        this.totalConductores=res.cantidad_conductores;
     
      },
      error: (err) => {
        console.error('Error al obtener cantidad de conductores:', err);
      },
      complete: () => {
        console.log('cantidad de conductores obtenida');

      }
    });
  }

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

  openModalInfraestructura() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalInfraestructura'));
    this.myModal.show();
  }

  openModalVehiculosRutas() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalVehiculosRutas'));
    this.myModal.show();
  }

  openModalEmpresasRutas() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalEmpresasRutas'));
    this.myModal.show();
  }

  openModalEmpresasAnio() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalEmpresasAnio'));
    this.myModal.show();
  }

  openModalhistorialVehiculo() {
    this.myModal = new bootstrap.Modal(document.getElementById('modalhistorialVehiculo'));
    this.myModal.show();
  }

  closeModal() {
    this.myModal.hide();
  }



  // barOptionsColor:any = {
  //   series: [
  //     { name: 'PERSONAS', data: [this.cantidad_t_Personas || 0, 0, 0, 0] },
  //     { name: 'TURISMO', data: [0, this.cantidad_t_Turismo || 0, 0, 0] },
  //     { name: 'ESTUDIANTES', data: [0, 0, this.cantidad_t_Estudiantes || 0, 0] },
  //     { name: 'TRABAJADORES', data: [0, 0, 0, this.cantidad_t_Trabajadores || 0] }
  //   ],
  //   chart: {
  //     height: 250,
  //     type: 'bar',
  //     stacked: true
  //   } as ApexChart,
  //   title: {
  //     text: 'EMPRESAS POR SERVICIO'
  //   } as ApexTitleSubtitle,
  //   xaxis: {
  //     categories: ['PERSONAS', 'TURISMO', 'ESTUDIANTES', 'TRABAJADORES']
  //   } as ApexXAxis,
  // };

  GraficarEmpreasServicio() {
    this.barOptionsColor = {
      series: [
        { name: 'PERSONAS', data: [this.cantidad_t_Personas || 0, 0, 0, 0] },
        { name: 'TURISMO', data: [0, this.cantidad_t_Turismo || 0, 0, 0] },
        { name: 'ESTUDIANTES', data: [0, 0, this.cantidad_t_Estudiantes || 0, 0] },
        { name: 'TRABAJADORES', data: [0, 0, 0, this.cantidad_t_Trabajadores || 0] }
      ],
      chart: {
        height: 250,
        type: 'bar',
        stacked: true
      } as ApexChart,
      title: {
        text: 'EMPRESAS POR SERVICIO'
      } as ApexTitleSubtitle,
      xaxis: {
        categories: ['PERSONAS', 'TURISMO', 'ESTUDIANTES', 'TRABAJADORES']
      } as ApexXAxis,
    };
  }




  graficaInfraestructura() {
    this.barOptions = {
      series: [
        {
          name: 'Cantidad',
          data: [this.cantidad_t_terrestre, this.cantidad_er_tipo1, this.cantidad_er_tipo2, this.cantidad_er_tipo3]
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
  }
  

  graficaEstadosEmpresasServicio() {
    this.PieOptions = {
      series: [Number(this.cantidad_estado_empresas.activo), Number(this.cantidad_estado_empresas.inactivo), Number(this.cantidad_estado_empresas.alerta)],
      chart: {
        height: 250,
        type: 'pie'
      } as ApexChart,
      labels: ['ACTIVO', 'INACTIVO', 'ALERTA'],
      title: {
        text: 'ESTADO DE EMPRESAS POR SERVICIO'
      } as ApexTitleSubtitle
    };
  }


  graficaVehiculos() {
    this.DonutOptions = {
      series: [this.cantidad_v_personas, this.cantidad_v_turismo, this.cantidad_v_estudiantes, this.cantidad_v_trabajadores],
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



}
