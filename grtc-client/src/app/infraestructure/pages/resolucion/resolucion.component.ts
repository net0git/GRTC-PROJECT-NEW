import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../shared/components/subnavegador/subnavegador.component';

@Component({
  selector: 'app-resolucion',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent],
  templateUrl: './resolucion.component.html',
  styleUrl: './resolucion.component.css'
})


export class ResolucionComponent implements OnInit {

  pdfUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`/doc/error_carga.pdf`);

  }
}
