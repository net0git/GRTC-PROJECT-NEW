import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/remoto/login/login.service';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { UsuarioModel } from '../../../../domain/models/usuario.model';



@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.css'
})
export class NavegadorComponent {

  credenciales: UsuarioModel={
    nombre_usuario:'',
    id_usuario:0,
    rol:'',
  };

  constructor( private router:Router, private loginService: LoginService, private credencialesService: CredencialesService) {
     this.credenciales=this.credencialesService.credenciales
     console.log(this.credenciales)
   }
  

  confirmarSalida() {
    Swal.fire({
      title: '¿Desea salir del sistema?',
      text: 'Se cerrará la sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza la acción para salir del sistema, redirección y cierre de sesión
        console.log('Saliendo del sistema...');
        this.loginService.logout();
        this.router.navigate(['/login'])
        
      }
    });
  }
}
