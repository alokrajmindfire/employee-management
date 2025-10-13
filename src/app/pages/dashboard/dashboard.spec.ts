import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardService } from '../../core/services/dashboard/dashboard';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: '<div class="loader">Loading...</div>',
})
class MockLoader {}

@Component({
  selector: 'app-card',
  standalone: true,
  template: '<ng-content></ng-content>',
})
class MockCard {}

class MockDashboardService {
  fetchTasks = jasmine.createSpy().and.returnValue(
    of({ total: 8, completed: 5, pending: 3 })
  );
  fetchLeaves = jasmine.createSpy().and.returnValue(
    of({ total: 21, approved: 10, pending: 2, rejected: 9 })
  );
}

describe('Dashboard Component', () => {
  let fixture: ComponentFixture<Dashboard>;
  let component: Dashboard;
  let service: MockDashboardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Dashboard,
        MockLoader,
        MockCard,
      ],
      providers: [{ provide: DashboardService, useClass: MockDashboardService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    service = TestBed.inject(DashboardService) as unknown as MockDashboardService;
  });

  // ✅ Component Creation
  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call service methods on init', () => {
    const spyTasks = spyOn(component, 'loadTasks').and.callThrough();
    const spyLeaves = spyOn(component, 'loadLeaves').and.callThrough();

    fixture.detectChanges(); // triggers ngOnInit

    expect(spyTasks).toHaveBeenCalled();
    expect(spyLeaves).toHaveBeenCalled();
  });

  describe('Tasks Section Rendering', () => {
    // it('should show loader when tasks are loading', fakeAsync(() => {
    //   component.tasksLoading = true;
    //   component.tasksError = null;
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();

    //   const loader = fixture.debugElement.query(By.css('app-loader'));
    //   expect(loader).toBeTruthy();
    // }));

    // it('should show error message when tasksError is set', fakeAsync(() => {
    //   component.tasksLoading = false;
    //   component.tasksError = 'Failed to load tasks';
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();

    //   const error = fixture.debugElement.query(By.css('p.text-red-500'));
    //   expect(error?.nativeElement.textContent).toContain('Failed to load tasks');
    // }));

    it('should show task summary when data is loaded', fakeAsync(() => {
      component.tasksLoading = false;
      component.tasksError = '';
      component.summary.tasks = { total: 8, completed: 5, pending: 3 };
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const values = fixture.debugElement
        .queryAll(By.css('div.text-3xl'))
        .map(el => el.nativeElement.textContent.trim());
      expect(values).toContain('5');
      expect(values).toContain('3');
    }));

    it('should handle fetchTasks error correctly', fakeAsync(() => {
      service.fetchTasks.and.returnValue(throwError(() => new Error('Error loading tasks')));
      component.loadTasks();
      tick();
      expect(component.tasksError).toBe('Error loading tasks');
    }));
  });

  describe('Leaves Section Rendering', () => {
    // it('should show loader when leaves are loading', fakeAsync(() => {
    //   component.leavesLoading = true;
    //   component.leavesError = null;
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();

    //   const loader = fixture.debugElement.query(By.css('app-loader'));
    //   expect(loader).toBeTruthy();
    // }));

    // it('should show error message when leavesError is set', fakeAsync(() => {
    //   component.leavesLoading = false;
    //   component.leavesError = 'Failed to load leaves';
    //   fixture.detectChanges();
    //   tick();
    //   fixture.detectChanges();

    //   const error = fixture.debugElement.query(By.css('p.text-red-500'));
    //   expect(error?.nativeElement.textContent).toContain('Failed to load leaves');
    // }));

    it('should show leaves summary when data is loaded', fakeAsync(() => {
      component.leavesLoading = false;
      component.leavesError = '';
      component.summary.leaves = { total: 21, approved: 10, pending: 2, rejected: 9 };
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const values = fixture.debugElement
        .queryAll(By.css('div.text-3xl'))
        .map(el => el.nativeElement.textContent.trim());
      expect(values).toContain('10');
      expect(values).toContain('2');
    }));

    it('should handle fetchLeaves error correctly', fakeAsync(() => {
      service.fetchLeaves.and.returnValue(throwError(() => new Error('Error loading leaves')));
      component.loadLeaves();
      tick();
      expect(component.leavesError).toBe('Error loading leaves');
    }));
  });
});
