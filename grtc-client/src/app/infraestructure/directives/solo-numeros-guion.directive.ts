import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSoloNumerosGuion]',
  standalone: true,
})
export class SoloNumerosGuionDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    // Reemplazar cualquier carácter que no sea un dígito
    const valor = event.target.value.replace(/[^0-9-]+/g, '').replace(/-{2,}/g, '-');
    this.ngControl.control?.setValue(valor); // Actualizar el control con el valor filtrado
  }
}