import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEmpresaServicioResolucionComponent } from './mod-empresa-servicio-resolucion.component';

describe('ModEmpresaServicioResolucionComponent', () => {
  let component: ModEmpresaServicioResolucionComponent;
  let fixture: ComponentFixture<ModEmpresaServicioResolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModEmpresaServicioResolucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModEmpresaServicioResolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
