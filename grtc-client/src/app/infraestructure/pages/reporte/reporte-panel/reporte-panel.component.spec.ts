import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePanelComponent } from './reporte-panel.component';

describe('ReportePanelComponent', () => {
  let component: ReportePanelComponent;
  let fixture: ComponentFixture<ReportePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
