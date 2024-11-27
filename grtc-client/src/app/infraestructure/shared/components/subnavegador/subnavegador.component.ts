import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-subnavegador',
  standalone: true,
  imports: [],
  templateUrl: './subnavegador.component.html',
  styleUrl: './subnavegador.component.css'
})
export class SubnavegadorComponent {

  @Input() ruta:string='/principal';

  constructor(private router:Router) { }

  volver(){
    this.router.navigate([this.ruta]);
  }

}
