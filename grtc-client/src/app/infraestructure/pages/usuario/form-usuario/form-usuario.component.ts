import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { PersonaModel } from '../../../../domain/models/Persona.model';
import { UsuarioModel } from '../../../../domain/models/usuario.model';
import { PersonaService } from '../../../services/remoto/persona/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/remoto/usuario/usuario.service';
import { personaMessageResponse } from '../../../../domain/dto/PersonasResponse.dto';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Importa FormsModule



@Component({
  selector: 'app-form-usuario',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent,FormsModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent implements OnInit {

  dataPersona: PersonaModel = {
    nombres: '',
    ap_paterno: '',
    ap_materno: '',
    tipo_doc: '',
    documento: '',
    telefono: '',
    correo: '',
  };

  dataUsuario: UsuarioModel = {
    id_usuario: 0,
    nombre_usuario: '',
    rol: '',
    estado: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private personaService: PersonaService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

  }

  crearUsuario() {
    this.personaService.CrearPersona(this.dataPersona).pipe(
      switchMap((personaResponse: personaMessageResponse) => {
        // Usar el id_persona devuelto por la API
        const idPersona = personaResponse.id_persona;
        this.dataUsuario.id_persona = idPersona;
        return this.usuarioService.crearUsuario(this.dataUsuario);
      })
    ).subscribe({
      next: (usuarioResponse) => {
        console.log('Usuario creado con éxito:', usuarioResponse);
      },
      error: (err) => {
        console.error('Error en el proceso de creación:', err);
      },
      complete: () => {
        console.log('Proceso de creación completado');
      }
    });
  }
  
}
