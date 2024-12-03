import { Component,OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';

import { PersonaModel } from '../../../../domain/models/Persona.model';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { FormsModule } from '@angular/forms';
import { UsuarioModel } from '../../../../domain/models/usuario.model';
import Swal from 'sweetalert2';
import { SweetAlert } from '../../../shared/animated-messages/sweetAlert';

@Component({
  selector: 'app-mod-usuario',
  standalone: true,
  imports: [NavegadorComponent,FormsModule],
  templateUrl: './mod-usuario.component.html',
  styleUrl: './mod-usuario.component.css'
})
export class ModUsuarioComponent implements OnInit {

  credenciales: UsuarioModel={
    nombre_usuario:'',
    id_usuario:0,
    id_persona:0,
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
  
  constructor(private credencialesService: CredencialesService, 
              private activateRoute:ActivatedRoute,
              private personaService:PersonaService,
              private sweetAlert: SweetAlert) { this.credenciales=this.credencialesService.credenciales }

  ngOnInit(): void {
      this.obtenerDatosPersona()
  }

  obtenerDatosPersona(){
    console.log( this.credenciales.id_persona)
    this.personaService.ObtenerDatosPersona(this.credenciales.id_persona).subscribe({
        next: (res: PersonaModel) => {
          this.dataPersona=res
          console.log(res)
        },
        error: (err) => {
          console.error('Error al obtener persona', err);
        },
        complete: () => {
          console.log('Obtención de persona completada');
        }
    })
  }

  modificarDatosPersona(){
    console.log(this.dataPersona)
  this.personaService.ModificarPersona(this.credenciales.id_persona,this.dataPersona).subscribe({
        next: (res) => {
          console.log(res)    
        },
        error: (err) => {
          console.error('Error al modificar persona', err);
        },
        complete: () => {
          console.log('Modificación de persona completada');
          this.sweetAlert.MensajeToast('Modificación exitosa')
        }
    })
  }
}
