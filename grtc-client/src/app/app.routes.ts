import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './infraestructure/pages/login/login.component';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
      },
      { path:'login', component: LoginComponent},
      { path: '**', redirectTo: '/login' } 
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }