import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaHistorialComponent } from './busqueda-historial.component';

describe('BusquedaHistorialComponent', () => {
  let component: BusquedaHistorialComponent;
  let fixture: ComponentFixture<BusquedaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
