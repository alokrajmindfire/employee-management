import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Mock Loader Component to replace <app-loader>
@Component({
  selector: 'app-loader',
  template: '<div class="loader">Loading...</div>',
})
class MockLoader {}

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [Dashboard, MockLoader], // Declare mock loader here
      // Removed NO_ERRORS_SCHEMA to catch template issues
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  describe('Tasks Section Rendering', () => {
    it('should show loader when tasks are loading', () => {
      component.tasksLoading = true;
      fixture.detectChanges();

      // Now we have MockLoader rendering, we query for its div.loader
      const loader = fixture.debugElement.query(By.css('app-loader .loader'));
      expect(loader).toBeTruthy();
    });

    it('should show error message if tasksError is set and not loading', () => {
      component.tasksLoading = false;
      component.tasksError = 'Failed to load tasks';
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('p.text-red-500'));
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Failed to load tasks');
    });

    it('should show task summary when data is loaded successfully', () => {
      component.tasksLoading = false;
      component.tasksError = '';
      component.summary = {
        tasks: { total: 8, completed: 5, pending: 3 },
        leaves: { total: 21, approved: 10, pending: 2, rejected: 9 },
      };
      fixture.detectChanges();

      // Grab all summary number elements
      const summaryValues = fixture.debugElement
        .queryAll(By.css('div.text-3xl'))
        .map((el) => el.nativeElement.textContent.trim());

      // Check that completed and pending tasks are displayed correctly
      expect(summaryValues).toContain('5'); // completed tasks
      expect(summaryValues).toContain('3'); // pending tasks
    });
  });

  describe('Leaves Section Rendering', () => {
    it('should show loader when leaves are loading', () => {
      component.leavesLoading = true;
      fixture.detectChanges();

      const loader = fixture.debugElement.query(By.css('app-loader .loader'));
      expect(loader).toBeTruthy();
    });

    it('should show error message if leavesError is set and not loading', () => {
      component.leavesLoading = false;
      component.leavesError = 'Failed to load leaves';
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('p.text-red-500'));
      expect(error).toBeTruthy();
      expect(error.nativeElement.textContent).toContain('Failed to load leaves');
    });

    it('should show leaves summary when data is loaded successfully', () => {
      component.leavesLoading = false;
      component.leavesError = '';
      component.summary = {
        tasks: { total: 8, completed: 5, pending: 3 },
        leaves: { total: 21, approved: 10, pending: 2, rejected: 9 },
      };
      fixture.detectChanges();

      const summaryValues = fixture.debugElement
        .queryAll(By.css('div.text-3xl'))
        .map((el) => el.nativeElement.textContent.trim());

      expect(summaryValues).toContain('10'); // approved leaves
      expect(summaryValues).toContain('2'); // pending leaves
    });
  });
});
