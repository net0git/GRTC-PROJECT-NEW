import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../infraestructure/services/remoto/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); // Inyectamos el servicio de autenticación
  const router = inject(Router); // Inyectamos el router para redirigir si es necesario

  if (authService.isAuthenticatedUser()) {
    return true; // Permite acceso si el usuario está autenticado
  } else {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false; // Bloquea la ruta
  }
};

