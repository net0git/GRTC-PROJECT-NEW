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
import { DetalleEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/detalle-empresa-servicio/detalle-empresa-servicio.component';
import {ModEmpresaServicioComponent} from './infraestructure/pages/empresa-servicio/mod-empresa-servicio/mod-empresa-servicio.component';



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
      { path:'principal/mod-empresa-servicio/:id_empresa_servicio', component: ModEmpresaServicioComponent },

      { path:'principal/consultas-tuc',component:ConsultasTucComponent },

      { path:'principal/lista-infraestructura', component: ListaInfraestructuraComponent },
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