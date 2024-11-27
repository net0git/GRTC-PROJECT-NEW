import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavegadorComponent, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  empresas_por_servicio() {
    this.router.navigate(['/principal/lista-empresas-servicio']);
  }

  empresas_por_infraestructura() {
    this.router.navigate(['/principal/empresas/infraestructura']);
  }

  usuarios() {
    this.router.navigate(['principal/lista-usuarios']);
  }

  vehiculos() {
    this.router.navigate(['/principal/vehiculos'])
  }

  tuc() {
    this.router.navigate(['/principal/tuc'])
  }

  reporte() {
    this.router.navigate(['/principal/reportes'])
  }

  busqueda_por_historial() {
    this.router.navigate(['principal/busqueda'])
  }

  resoluciones() {
    this.router.navigate(['principal/resoluciones'])
  }
}
