import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioRutaComponent } from './empresa-servicio-ruta.component';

describe('EmpresaServicioRutaComponent', () => {
  let component: EmpresaServicioRutaComponent;
  let fixture: ComponentFixture<EmpresaServicioRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaServicioRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
