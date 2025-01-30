import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './infraestructure/pages/login/login.component';
import { PrincipalComponent } from './infraestructure/pages/principal/principal.component';
import { ListaUsuarioComponent } from './infraestructure/pages/usuario/lista-usuario/lista-usuario.component';
import { ModUsuarioComponent } from './infraestructure/pages/usuario/mod-usuario/mod-usuario.component';
import { FormUsuarioComponent } from './infraestructure/pages/usuario/form-usuario/form-usuario.component';
import { ListaEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/lista-empresa-servicio/lista-empresa-servicio.component';
import { CrearEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/crear-empresa-servicio/crear-empresa-servicio.component';
import { ConsultasTucComponent } from './infraestructure/pages/consultas-tuc/consultas-tuc.component';
import { ListaInfraestructuraComponent } from './infraestructure/pages/infraestructura/lista-infraestructura/lista-infraestructura.component';
import { VehiculoComponent } from './infraestructure/pages/vehiculo/vehiculo.component';
import { BusquedaHistorialComponent } from './infraestructure/pages/busqueda-historial/busqueda-historial.component';
import { ResolucionComponent } from './infraestructure/pages/resolucion/resolucion.component';
import { ReportePanelComponent } from './infraestructure/pages/reporte/reporte-panel/reporte-panel.component';
import { DetalleEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/detalle-empresa/datos-empresa/detalle-empresa-servicio.component';
import { ModEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/mod-empresa-servicio/mod-empresa-servicio.component';
import { ConductoresComponent } from './infraestructure/pages/empresa-servicio/detalle-empresa/conductores/conductores.component';
import { ArrendamientoComponent } from './infraestructure/pages/empresa-servicio/detalle-empresa/arrendamiento/arrendamiento.component';
import { ItinerarioComponent } from './infraestructure/pages/empresa-servicio/detalle-empresa/itinerario/itinerario.component';
import { VehiculosComponent } from './infraestructure/pages/empresa-servicio/detalle-empresa/vehiculos/vehiculos.component';
import { ModEmpresaServicioResolucionComponent } from './infraestructure/pages/empresa-servicio/mod-empresa-servicio-resolucion/mod-empresa-servicio-resolucion.component';
import { DetalleInfraestructuraComponent } from './infraestructure/pages/infraestructura/detalle-infraestructura/detalle-infraestructura.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
      },
      { path:'login', component: LoginComponent},
      { path:'principal', component: PrincipalComponent},

      { path:'principal/lista-usuarios', component: ListaUsuarioComponent },
      { path:'principal/form-usuario', component: FormUsuarioComponent },
      { path:'principal/form-usuario/modificar/:id_usuario', component: FormUsuarioComponent },
      { path:'principal/mod-usuario/:id_usuario', component: ModUsuarioComponent },

      { path:'principal/lista-empresas-servicio', component: ListaEmpresaServicioComponent },
      { path:'principal/crear-empresa-servicio', component: CrearEmpresaServicioComponent },
      { path:'principal/detalle-empresa-servicio/:id_empresa_servicio', component: DetalleEmpresaServicioComponent },
      { path:'principal/detalle-empresa-servicio/conductores/:id_empresa_servicio', component: ConductoresComponent },
      { path:'principal/detalle-empresa-servicio/arrendamiento/:id_empresa_servicio', component: ArrendamientoComponent },
      { path:'principal/detalle-empresa-servicio/vehiculos/:id_empresa_servicio', component: VehiculosComponent },
      { path:'principal/detalle-empresa-servicio/itineario/:id_empresa_servicio', component: ItinerarioComponent },
      { path:'principal/mod-empresa-servicio/:id_empresa_servicio', component: ModEmpresaServicioComponent },
      { path:'principal/mod-empresa-servicio-resolucion/:id_empresa_servicio/:id_resolucion', component: ModEmpresaServicioResolucionComponent },
      { path:'principal/mod-empresa-servicio-resolucion/:id_empresa_servicio', component: ModEmpresaServicioResolucionComponent },



      { path:'principal/consultas-tuc',component:ConsultasTucComponent },

      { path:'principal/lista-infraestructura', component: ListaInfraestructuraComponent },
      { path:'principal/infraestructura/detalle/:id_infraestructura', component: DetalleInfraestructuraComponent },

      { path:'principal/lista-vehiculos', component:VehiculoComponent},
      { path:'principal/busqueda-historial', component:BusquedaHistorialComponent},
      { path:'principal/resolucion', component:ResolucionComponent},
      { path:'principal/panel-reportes', component:ReportePanelComponent},
     
      { path: '**', redirectTo: '/login' } 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }