import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth, { provide: Router, useValue: routerSpy }],
    });

    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login HTTP POST with correct headers and body', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockToken = 'abc123token';

    service.login(email, password).subscribe((res) => {
      expect(res.token).toBe(mockToken);
    });

    const req = httpMock.expectOne('https://reqres.in/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-api-key')).toBe('reqres-free-v1');
    expect(req.request.body).toEqual({ email, password });

    // Respond with mock token
    req.flush({ token: mockToken });
  });

  it('should set token in localStorage and signal', () => {
    const token = 'sample-token';
    service.setToken(token);

    expect(localStorage.getItem('token')).toBe(token);
    expect(service.token()).toBe(token);
  });

  it('should logout: clear token, reset signal and navigate to /login', () => {
    // Pre-set token
    service.setToken('token-to-clear');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(service.token()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('isAuthenticated should return true if token exists', () => {
    service.setToken('token-exists');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('isAuthenticated should return false if token is null', () => {
    service.token.set(null);
    expect(service.isAuthenticated()).toBeFalse();
  });
});
