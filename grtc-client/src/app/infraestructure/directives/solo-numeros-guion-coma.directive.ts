import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSoloNumerosGuionComa]',
  standalone: true,
})
export class SoloNumerosGuionComaDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    // Reemplazar cualquier carácter que no sea número, coma o guion
    let valor = event.target.value.replace(/[^0-9,-]+/g, ''); // Permitir números, comas y guion
    valor = valor.replace(/-{2,}/g, '-'); // Asegurarse de que no haya más de un guion consecutivo
    valor = valor.replace(/^-/g, ''); // Eliminar el guion al inicio si está presente (si no es necesario)

    this.ngControl.control?.setValue(valor); // Actualizar el control con el valor filtrado
  }
}