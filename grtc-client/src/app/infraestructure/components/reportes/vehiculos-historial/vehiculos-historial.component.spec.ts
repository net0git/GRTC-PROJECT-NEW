import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosHistorialComponent } from './vehiculos-historial.component';

describe('VehiculosHistorialComponent', () => {
  let component: VehiculosHistorialComponent;
  let fixture: ComponentFixture<VehiculosHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
