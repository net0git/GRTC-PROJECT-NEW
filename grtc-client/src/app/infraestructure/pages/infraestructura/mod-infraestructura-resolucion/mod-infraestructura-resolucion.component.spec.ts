import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModInfraestructuraResolucionComponent } from './mod-infraestructura-resolucion.component';

describe('ModInfraestructuraResolucionComponent', () => {
  let component: ModInfraestructuraResolucionComponent;
  let fixture: ComponentFixture<ModInfraestructuraResolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModInfraestructuraResolucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModInfraestructuraResolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
