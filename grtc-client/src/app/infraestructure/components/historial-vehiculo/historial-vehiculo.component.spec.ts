import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVehiculoComponent } from './historial-vehiculo.component';

describe('HistorialVehiculoComponent', () => {
  let component: HistorialVehiculoComponent;
  let fixture: ComponentFixture<HistorialVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
