import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModInfraestructuraComponent } from './mod-infraestructura.component';

describe('ModInfraestructuraComponent', () => {
  let component: ModInfraestructuraComponent;
  let fixture: ComponentFixture<ModInfraestructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModInfraestructuraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModInfraestructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
