import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteConductoresComponent } from './reporte-conductores.component';

describe('ReporteConductoresComponent', () => {
  let component: ReporteConductoresComponent;
  let fixture: ComponentFixture<ReporteConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteConductoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
