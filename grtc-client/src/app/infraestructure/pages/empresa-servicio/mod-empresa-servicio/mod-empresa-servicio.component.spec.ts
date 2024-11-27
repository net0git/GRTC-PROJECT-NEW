import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEmpresaServicioComponent } from './mod-empresa-servicio.component';

describe('ModEmpresaServicioComponent', () => {
  let component: ModEmpresaServicioComponent;
  let fixture: ComponentFixture<ModEmpresaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModEmpresaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModEmpresaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
