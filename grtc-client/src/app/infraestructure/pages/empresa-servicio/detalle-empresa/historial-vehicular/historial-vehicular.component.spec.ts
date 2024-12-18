import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVehicularComponent } from './historial-vehicular.component';

describe('HistorialVehicularComponent', () => {
  let component: HistorialVehicularComponent;
  let fixture: ComponentFixture<HistorialVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialVehicularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
