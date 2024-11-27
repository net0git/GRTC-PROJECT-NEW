import { Component } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { UsuarioModel } from '../../../../domain/models/usuario.model';

@Component({
  selector: 'app-mod-usuario',
  standalone: true,
  imports: [NavegadorComponent],
  templateUrl: './mod-usuario.component.html',
  styleUrl: './mod-usuario.component.css'
})
export class ModUsuarioComponent {

  credenciales: UsuarioModel={
    nombre_usuario:'',
    id_usuario:0,
    rol:'',
  };
  
  constructor(private credencialesService: CredencialesService) { this.credenciales=this.credencialesService.credenciales }

}
