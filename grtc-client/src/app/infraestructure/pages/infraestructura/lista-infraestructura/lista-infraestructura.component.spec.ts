import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInfraestructuraComponent } from './lista-infraestructura.component';

describe('ListaInfraestructuraComponent', () => {
  let component: ListaInfraestructuraComponent;
  let fixture: ComponentFixture<ListaInfraestructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaInfraestructuraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaInfraestructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
