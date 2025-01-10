import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';


@Directive({
  selector: '[appSoloLetrasGuion]',
  standalone: true
})
export class SoloLetrasGuionDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    // Reemplazar cualquier carácter que no sea letra o espacio
    const valor = event.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s-]/g, '');
    this.ngControl.control?.setValue(valor); // Actualizar el control con el valor filtrado
  }

}
