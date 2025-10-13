import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth-service/auth';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<Auth>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('Auth', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Auth, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to /login if the user is not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
