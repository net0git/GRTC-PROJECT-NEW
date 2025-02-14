import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosRutaComponent } from './vehiculos-ruta.component';

describe('VehiculosRutaComponent', () => {
  let component: VehiculosRutaComponent;
  let fixture: ComponentFixture<VehiculosRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
