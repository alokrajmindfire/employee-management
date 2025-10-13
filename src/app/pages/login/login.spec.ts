import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Login } from './login';
import { Auth } from '../../core/services/auth-service/auth';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card } from '../../component/card/card';
import { Theme } from '../../component/theme/theme';

describe('Login Component', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;
  let authSpy: jasmine.SpyObj<Auth>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('Auth', ['login', 'setToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, CommonModule, Card, Theme],
      providers: [
        { provide: Auth, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid with default values', () => {
    expect(component.form.valid).toBeTrue();
  });

  it('form should be invalid when email is empty', () => {
    component.form.controls['email'].setValue('');
    expect(component.form.valid).toBeFalse();
  });

  it('form should be invalid when email is invalid', () => {
    component.form.controls['email'].setValue('invalid-email');
    expect(component.form.valid).toBeFalse();
  });

  // it('should call auth.login and navigate on successful login', fakeAsync(() => {
  //   const tokenResponse = { token: 'fake-token' };
  //   authSpy.login.and.returnValue(of(tokenResponse));

  //   component.onSubmit();

  //   expect(component.loading()).toBeTrue();
  //   expect(authSpy.login).toHaveBeenCalledWith('eve.holt@reqres.in', 'cityslicka');

  //   tick();

  //   expect(authSpy.setToken).toHaveBeenCalledWith('fake-token');
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  //   expect(component.loading()).toBeFalse();
  // }));

  it('should handle login failure and show error message', fakeAsync(() => {
    const errorResponse = { error: { error: 'User not found' } };
    authSpy.login.and.returnValue(throwError(() => errorResponse));

    component.onSubmit();
    tick();

    expect(component.error()).toBe('User not found');
    expect(component.loading()).toBeFalse();
  }));

  it('should not submit if form is invalid', () => {
    component.form.controls['email'].setValue('');
    component.onSubmit();
    expect(authSpy.login).not.toHaveBeenCalled();
  });

  it('submit button should be disabled when loading is true', () => {
    component.loading.set(true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();

    component.loading.set(false);
    fixture.detectChanges();
    expect(button.disabled).toBeFalse();
  });
});
