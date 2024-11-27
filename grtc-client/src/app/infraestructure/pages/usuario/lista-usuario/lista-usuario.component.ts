import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/remoto/usuario/usuario.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ListaUsuariosResponse } from '../../../../domain/dto/UsuariosResponse.dto';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';



@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [CommonModule,NavegadorComponent,SubnavegadorComponent],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  listaUsuarios:ListaUsuariosResponse[]=[];

  ngOnInit(): void {
    this.ObtenerListaUsuarios()
  }

  ObtenerListaUsuarios(): void {
    this.usuarioService.listarUsuarioDetalle().subscribe({
      next: (res: ListaUsuariosResponse[]) => {
        this.listaUsuarios= res; 
        console.log(this.listaUsuarios)
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      },
      complete: () => {
        console.log('Obtención de usuarios completada');
      }
    });
  }

  crearUsuario(){
    this.router.navigate(['principal/form-usuario']);
  }
  volver(){
    this.router.navigate(['/principal']);
  }

}
