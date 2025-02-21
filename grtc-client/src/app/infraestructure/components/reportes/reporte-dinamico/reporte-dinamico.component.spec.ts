import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDinamicoComponent } from './reporte-dinamico.component';

describe('ReporteDinamicoComponent', () => {
  let component: ReporteDinamicoComponent;
  let fixture: ComponentFixture<ReporteDinamicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteDinamicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDinamicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
