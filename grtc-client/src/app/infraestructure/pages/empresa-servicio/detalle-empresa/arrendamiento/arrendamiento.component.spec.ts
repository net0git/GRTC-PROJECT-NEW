import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendamientoComponent } from './arrendamiento.component';

describe('ArrendamientoComponent', () => {
  let component: ArrendamientoComponent;
  let fixture: ComponentFixture<ArrendamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
