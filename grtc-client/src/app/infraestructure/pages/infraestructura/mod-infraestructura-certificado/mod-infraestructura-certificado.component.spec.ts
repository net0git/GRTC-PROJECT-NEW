import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModInfraestructuraCertificadoComponent } from './mod-infraestructura-certificado.component';

describe('ModInfraestructuraCertificadoComponent', () => {
  let component: ModInfraestructuraCertificadoComponent;
  let fixture: ComponentFixture<ModInfraestructuraCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModInfraestructuraCertificadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModInfraestructuraCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
