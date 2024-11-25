import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNoFoundComponent } from './pages-no-found.component';

describe('PagesNoFoundComponent', () => {
  let component: PagesNoFoundComponent;
  let fixture: ComponentFixture<PagesNoFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesNoFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesNoFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
