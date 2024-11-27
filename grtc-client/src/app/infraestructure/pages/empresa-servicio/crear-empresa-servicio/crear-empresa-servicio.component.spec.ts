import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpresaServicioComponent } from './crear-empresa-servicio.component';

describe('CrearEmpresaServicioComponent', () => {
  let component: CrearEmpresaServicioComponent;
  let fixture: ComponentFixture<CrearEmpresaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEmpresaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEmpresaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
