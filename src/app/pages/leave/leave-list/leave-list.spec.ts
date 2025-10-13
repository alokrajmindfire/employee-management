import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveList } from './leave-list';
import { Leave } from '../../../core/services/leave/leave';
import { RoleGuards } from '../../../core/guards/role/role-guards';

class LeaveStub {
  loadLeaves = jasmine.createSpy('loadLeaves');
  updateLeave = jasmine.createSpy('updateLeave');
  deleteLeave = jasmine.createSpy('deleteLeave');
  leaves = jasmine.createSpy('leaves').and.returnValue([]);
  loading = jasmine.createSpy('loading').and.returnValue(false);
}

// Stub RoleGuards service
class RoleGuardsStub {
  isAdmin = jasmine.createSpy('isAdmin');
}

describe('LeaveList', () => {
  let component: LeaveList;
  let fixture: ComponentFixture<LeaveList>;
  let leaveService: LeaveStub;
  let roleService: RoleGuardsStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveList],
      providers: [
        { provide: Leave, useClass: LeaveStub },
        { provide: RoleGuards, useClass: RoleGuardsStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveList);
    component = fixture.componentInstance;

    leaveService = TestBed.inject(Leave) as unknown as LeaveStub;
    roleService = TestBed.inject(RoleGuards) as unknown as RoleGuardsStub;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadLeaves on ngOnInit', () => {
    component.ngOnInit();
    expect(leaveService.loadLeaves).toHaveBeenCalled();
  });

  describe('approve', () => {
    it('should call updateLeave with status Approved if user is admin', () => {
      roleService.isAdmin.and.returnValue(true);
      component.approve(1);
      expect(leaveService.updateLeave).toHaveBeenCalledWith(1, { status: 'Approved' });
    });

    it('should NOT call updateLeave if user is not admin', () => {
      roleService.isAdmin.and.returnValue(false);
      component.approve(1);
      expect(leaveService.updateLeave).not.toHaveBeenCalled();
    });
  });

  describe('reject', () => {
    it('should call updateLeave with status Rejected if user is admin', () => {
      roleService.isAdmin.and.returnValue(true);
      component.reject(2);
      expect(leaveService.updateLeave).toHaveBeenCalledWith(2, { status: 'Rejected' });
    });

    it('should NOT call updateLeave if user is not admin', () => {
      roleService.isAdmin.and.returnValue(false);
      component.reject(2);
      expect(leaveService.updateLeave).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call deleteLeave with the provided id', () => {
      component.remove(3);
      expect(leaveService.deleteLeave).toHaveBeenCalledWith(3);
    });
  });
});
