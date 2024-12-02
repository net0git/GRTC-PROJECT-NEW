import { Component,OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-p3-datos-resolucion',
  standalone: true,
  imports: [],
  templateUrl: './p3-datos-resolucion.component.html',
  styleUrl: '../steper.component.css'
})
export class P3DatosResolucion implements OnInit {

  pdfUrl: SafeResourceUrl | null =null;
  constructor( private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);
  }
 

}
