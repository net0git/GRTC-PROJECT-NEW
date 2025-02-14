import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosEmpresaComponent } from './vehiculos-empresa.component';

describe('VehiculosEmpresaComponent', () => {
  let component: VehiculosEmpresaComponent;
  let fixture: ComponentFixture<VehiculosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
