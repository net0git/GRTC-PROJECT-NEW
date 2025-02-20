import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReportComponent } from './all-report.component';

describe('AllReportComponent', () => {
  let component: AllReportComponent;
  let fixture: ComponentFixture<AllReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
