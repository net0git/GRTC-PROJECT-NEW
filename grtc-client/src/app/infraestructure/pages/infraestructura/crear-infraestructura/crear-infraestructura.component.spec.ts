import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInfraestructuraComponent } from './crear-infraestructura.component';

describe('CrearInfraestructuraComponent', () => {
  let component: CrearInfraestructuraComponent;
  let fixture: ComponentFixture<CrearInfraestructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearInfraestructuraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInfraestructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
