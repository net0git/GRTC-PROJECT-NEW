import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './infraestructure/pages/login/login.component';
import { PrincipalComponent } from './infraestructure/pages/principal/principal.component';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
      },
      { path:'login', component: LoginComponent},
      { path:'principal', component: PrincipalComponent},
      { path: '**', redirectTo: '/login' } 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }