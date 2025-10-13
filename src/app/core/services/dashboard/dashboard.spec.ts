import { TestBed } from '@angular/core/testing';
import { DashboardService, Task, Leave } from './dashboard';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#fetchTasks', () => {
    it('should return task summary (total, completed, pending)', () => {
      const mockTasks: Task[] = [
        { userId: 1, id: 1, title: 'Task 1', completed: true },
        { userId: 1, id: 2, title: 'Task 2', completed: false },
        { userId: 1, id: 3, title: 'Task 3', completed: true },
      ];

      service.fetchTasks().subscribe((summary) => {
        expect(summary.total).toBe(3);
        expect(summary.completed).toBe(2);
        expect(summary.pending).toBe(1);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });

    it('should handle task fetch error', () => {
      service.fetchTasks().subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch tasks');
        },
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
      req.flush('Error loading tasks', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#fetchLeaves', () => {
    it('should return leave summary (total, approved, pending, rejected)', () => {
      const mockLeaves: Leave[] = [
        { id: 1, date: '2025-10-01', type: 'Sick', status: 'Approved' },
        { id: 2, date: '2025-10-02', type: 'Casual', status: 'Pending' },
        { id: 3, date: '2025-10-03', type: 'Annual', status: 'Rejected' },
        { id: 4, date: '2025-10-04', type: 'Sick', status: 'Approved' },
      ];

      service.fetchLeaves().subscribe((summary) => {
        expect(summary.total).toBe(4);
        expect(summary.approved).toBe(2);
        expect(summary.pending).toBe(1);
        expect(summary.rejected).toBe(1);
      });

      const req = httpMock.expectOne('https://68e663b421dd31f22cc5668f.mockapi.io/leaves');
      expect(req.request.method).toBe('GET');
      req.flush(mockLeaves);
    });

    it('should handle leave fetch error', () => {
      service.fetchLeaves().subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error.message).toBe('Failed to fetch leaves');
        },
      });

      const req = httpMock.expectOne('https://68e663b421dd31f22cc5668f.mockapi.io/leaves');
      req.flush('Error loading leaves', { status: 500, statusText: 'Server Error' });
    });
  });
});
