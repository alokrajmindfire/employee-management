import { TestBed } from '@angular/core/testing';

import { RoleGuards } from './role-guards';

describe('RoleGuards', () => {
  let service: RoleGuards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGuards);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for isAdmin if role is admin', () => {
    service.setRole('admin');
    expect(service.isAdmin()).toBeTrue();
  });

  it('should return false for isAdmin if role is not admin', () => {
    service.setRole('user');
    expect(service.isAdmin()).toBeFalse();
  });

  it('should have default role as admin', () => {
    expect(service.isAdmin()).toBeTrue();
  });
});
