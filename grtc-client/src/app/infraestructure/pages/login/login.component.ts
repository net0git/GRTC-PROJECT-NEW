import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../../domain/dto/LoginRequest.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  credentials: LoginRequest = {
    username: '',
    password: ''
  };
   
  imagePaths: string[] = [
    '/img/portada_login/portada1.jpg',
    '/img/portada_login/portada2.jpg',
    '/img/portada_login/portada3.jpg',
    '/img/portada_login/portada4.jpg',
    '/img/portada_login/portada5.jpg',
    '/img/portada_login/portada6.jpg',
    '/img/portada_login/portada7.jpg',
    '/img/portada_login/portada8.jpg',
    // Agrega más rutas de imágenes según sea necesario
  ];
  constructor( private renderer: Renderer2) { }

  ngOnInit(): void {
    this.changeBackgroundImage()
  }

  getRandomImageIndex(): number {
    return Math.floor(Math.random() * this.imagePaths.length);
  }

  changeBackgroundImage(): void {
    const backgroundContainer = document.getElementById('background-container');
    const randomImageIndex = this.getRandomImageIndex();
    const randomImagePath = this.imagePaths[randomImageIndex];
    if (backgroundContainer) {
      backgroundContainer.style.backgroundImage = `url(${randomImagePath})`;
    }
  }

  async login() {
    // console.log(this.credentials)
    // try {
    //   const authResponse = await this.authService.login(this.credentials); //el valor que devuelve login es verdadero o falso
    //       this.datosCompartidosService.credentials.nombre_usuario=this.credentials.nombre_usuario;//pasamos los valosres del usuairo a datos compartidos
    //       this.datosCompartidosService.credentials.password=this.credentials.password; //pasamos los valores a datos compartidos
        

    //   if (authResponse) {
    //     console.log('se logueo corectamente:'+this.authService.isAuthenticatedUser())
    //     this.router.navigate(['principal']);
    //   } else {
    //     alert('Credenciales incorrectas');
    //     console.log('estamos dentro del else de login:')
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert('Error al intentar autenticar');
    // }
   }
  
  preloadImages(imageSrcList: string[]): void {
    imageSrcList.forEach(src => {
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', src);
      this.renderer.setStyle(img, 'display', 'none');
      this.renderer.appendChild(document.body, img);
    });
  }




}
