import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { CredencialesService } from '../../services/local/credenciales/credenciales.service';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavegadorComponent, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  disableInvitado='display: block';

  constructor(private router: Router, private credencialesService: CredencialesService, ) { }

  ngOnInit(): void {
    this.verPerfil()
  }
  verPerfil(){
    if(this.credencialesService.isEditor() || this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
  }

  empresas_por_servicio() {
    this.router.navigate(['/principal/lista-empresas-servicio']);
  }

  infraestructura() {
    this.router.navigate(['/principal/lista-infraestructura']);
  }

  usuarios() {
    this.router.navigate(['/principal/lista-usuarios']);
  }

  vehiculos() {
    this.router.navigate(['/principal/lista-vehiculos'])
  }

  tuc() {
    this.router.navigate(['/principal/consultas-tuc'])
  }

  reporte() {
    this.router.navigate(['/principal/panel-reportes'])
  }

  busqueda_por_historial() {
    this.router.navigate(['/principal/busqueda-historial'])
  }

  resoluciones() {
    this.router.navigate(['principal/resolucion'])
  }
}
