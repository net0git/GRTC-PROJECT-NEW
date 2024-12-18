import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpresaServicioComponent } from './detalle-empresa-servicio.component';

describe('DetalleEmpresaServicioComponent', () => {
  let component: DetalleEmpresaServicioComponent;
  let fixture: ComponentFixture<DetalleEmpresaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEmpresaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleEmpresaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
