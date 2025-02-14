import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaServicioAnioComponent } from './empresa-servicio-anio.component';

describe('EmpresaServicioAnioComponent', () => {
  let component: EmpresaServicioAnioComponent;
  let fixture: ComponentFixture<EmpresaServicioAnioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaServicioAnioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaServicioAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
