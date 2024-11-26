import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasTucComponent } from './consultas-tuc.component';

describe('ConsultasTucComponent', () => {
  let component: ConsultasTucComponent;
  let fixture: ComponentFixture<ConsultasTucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasTucComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasTucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
