import { Component,OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';
import { UsuarioModel } from '../../../../domain/models/usuario.model';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mod-usuario',
  standalone: true,
  imports: [NavegadorComponent],
  templateUrl: './mod-usuario.component.html',
  styleUrl: './mod-usuario.component.css'
})
export class ModUsuarioComponent implements OnInit {

  credenciales: UsuarioModel={
    nombre_usuario:'',
    id_usuario:0,
    rol:'',
  };
  

  dataPersona: PersonaModel={
    nombres:'',
    ap_paterno:'',
    ap_materno:'',
    tipo_doc:'',
    documento:'',
    telefono:'',
    correo:'',
  };
  dataUsuario:UsuarioModel={
    id_usuario:0,
    nombre_usuario:'',
    rol:'',
    estado:'',
  };
  
  constructor(private credencialesService: CredencialesService, private activateRoute:ActivatedRoute) { this.credenciales=this.credencialesService.credenciales }

  ngOnInit(): void {
  }


}
