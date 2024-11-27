import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpresaServicioComponent } from './lista-empresa-servicio.component';

describe('ListaEmpresaServicioComponent', () => {
  let component: ListaEmpresaServicioComponent;
  let fixture: ComponentFixture<ListaEmpresaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmpresaServicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaEmpresaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
