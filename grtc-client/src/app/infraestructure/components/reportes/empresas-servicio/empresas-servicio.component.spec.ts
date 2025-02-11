import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasServicioComponent } from './empresas-servicio.component';

describe('EmpresasServicioComponent', () => {
  let component: EmpresasServicioComponent;
  let fixture: ComponentFixture<EmpresasServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresasServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
