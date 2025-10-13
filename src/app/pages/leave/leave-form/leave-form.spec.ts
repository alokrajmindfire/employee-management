import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveForm } from './leave-form';
import { Leave } from '../../../core/services/leave/leave';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../../component/card/card';

class LeaveStub {
  addLeave = jasmine.createSpy('addLeave');
}

class LocationStub {
  back = jasmine.createSpy('back');
}

describe('LeaveForm', () => {
  let component: LeaveForm;
  let fixture: ComponentFixture<LeaveForm>;
  let leaveService: LeaveStub;
  let location: LocationStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveForm, ReactiveFormsModule, Card],
      providers: [
        { provide: Leave, useClass: LeaveStub },
        { provide: Location, useClass: LocationStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveForm);
    component = fixture.componentInstance;

    leaveService = TestBed.inject(Leave) as unknown as LeaveStub;
    location = TestBed.inject(Location) as unknown as LocationStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('form should be valid when filled correctly', () => {
    component.form.setValue({
      date: '2099-12-31',
      type: 'Sick',
      reason: 'Feeling ill for a few days',
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should call addLeave and reset form on submit if form is valid', () => {
    const leaveData = {
      date: '2099-12-31',
      type: 'Annual',
      reason: 'Vacation time',
    };

    component.form.setValue(leaveData);
    component.submit();

    expect(leaveService.addLeave).toHaveBeenCalledWith({
      ...leaveData,
      status: 'Pending',
    });

    expect(component.form.value).toEqual({
      date: '',
      type: 'Sick',
      reason: '',
    });
  });

  it('should NOT call addLeave on submit if form is invalid', () => {
    component.form.setValue({
      date: '',
      type: '',
      reason: '',
    });
    component.submit();
    expect(leaveService.addLeave).not.toHaveBeenCalled();
  });

  it('goBack() should call location.back()', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
