import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './infraestructure/pages/login/login.component';
import { PrincipalComponent } from './infraestructure/pages/principal/principal.component';
import { ListaUsuarioComponent } from './infraestructure/pages/usuario/lista-usuario/lista-usuario.component';
import { ModUsuarioComponent } from './infraestructure/pages/usuario/mod-usuario/mod-usuario.component';
import { FormUsuarioComponent } from './infraestructure/pages/usuario/form-usuario/form-usuario.component';
import { ListaEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/lista-empresa-servicio/lista-empresa-servicio.component';
import { CrearEmpresaServicioComponent } from './infraestructure/pages/empresa-servicio/crear-empresa-servicio/crear-empresa-servicio.component';



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
      { path:'principal/mod-usuario/:id_usuario', component: ModUsuarioComponent },

      { path:'principal/lista-empresas-servicio', component: ListaEmpresaServicioComponent },
      { path:'principal/crear-empresa-servicio', component: CrearEmpresaServicioComponent },
     
      { path: '**', redirectTo: '/login' } 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }