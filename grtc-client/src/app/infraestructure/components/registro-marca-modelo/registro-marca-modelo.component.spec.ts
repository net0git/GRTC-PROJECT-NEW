import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMarcaModeloComponent } from './registro-marca-modelo.component';

describe('RegistroMarcaModeloComponent', () => {
  let component: RegistroMarcaModeloComponent;
  let fixture: ComponentFixture<RegistroMarcaModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMarcaModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMarcaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
