/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SqliteServiceService } from './sqlite-service.service';

describe('Service: SqliteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SqliteServiceService]
    });
  });

  it('should ...', inject([SqliteServiceService], (service: SqliteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
