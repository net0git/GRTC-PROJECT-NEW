import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSoloPlaca]',
  standalone: true,
})
export class PlacaDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    // Reemplazar cualquier carácter que no sea un dígito
    const valor = event.target.value.replace(/[^A-Z0-9-]/gi, '');
    this.ngControl.control?.setValue(valor); // Actualizar el control con el valor filtrado
  }
}
