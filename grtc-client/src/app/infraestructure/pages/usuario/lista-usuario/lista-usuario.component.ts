import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/remoto/usuario/usuario.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ListaUsuariosResponse } from '../../../../domain/dto/UsuariosResponse.dto';
import { NavegadorComponent } from '../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../shared/components/subnavegador/subnavegador.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CredencialesService } from '../../../services/local/credenciales/credenciales.service';



@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [CommonModule,NavegadorComponent,SubnavegadorComponent,NgxPaginationModule],
  templateUrl: './lista-usuario.component.html',
  styleUrl: './lista-usuario.component.css'
})
export class ListaUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router, private credencialesService: CredencialesService) { }

  listaUsuarios:ListaUsuariosResponse[]=[];
  listaUsuariosTemp:ListaUsuariosResponse[]=[];

  p: number = 1;

  ngOnInit(): void {
    this.ObtenerListaUsuarios()
    this.verPerfil();
  }

  disableInvitado='display: block';
  verPerfil(){
    if(this.credencialesService.isInvitado()){
      this.disableInvitado='display: none';
    }
  }


  ObtenerListaUsuarios(): void {
    this.usuarioService.listarUsuarioDetalle().subscribe({
      next: (res: ListaUsuariosResponse[]) => {
        this.listaUsuarios= res; 
        this.listaUsuariosTemp= res;
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

  modificarUsuario(id_usuario:number){
    this.router.navigate(['principal/form-usuario/modificar/'+id_usuario]);
  }

  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    let objetosFiltrados: any[] = [];
  
    objetosFiltrados = this.listaUsuariosTemp.filter(
      (objeto: { nombre_usuario: string; rol: string; estado: string }) => {
        const nombre_usuario = objeto.nombre_usuario.toLowerCase();
        const rol = objeto.rol.toLowerCase();
        const estado = objeto.estado.toLowerCase();
  
        // Si textoBusqueda es "activo" o "inactivo", solo buscar por estado
        if (textoBusqueda === 'activo' || textoBusqueda === 'inactivo') {
          return estado === textoBusqueda;
        }
  
        // En otros casos, buscar coincidencias generales
        return (
          nombre_usuario.includes(textoBusqueda) ||
          rol.includes(textoBusqueda) ||
          estado.includes(textoBusqueda)
        );
      }
    );
  
    this.listaUsuarios = objetosFiltrados;
  }
  
}
