import { TestBed } from '@angular/core/testing';

import { HistorialVehicularService } from './historial-vehicular.service';

describe('HistorialVehicularService', () => {
  let service: HistorialVehicularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialVehicularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
