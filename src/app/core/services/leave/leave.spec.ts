import { TestBed } from '@angular/core/testing';
import { Leave } from './leave';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ILeave } from '../../../types/leave';

describe('Leave', () => {
  let service: Leave;
  let httpMock: HttpTestingController;
  const api = 'https://68e663b421dd31f22cc5668f.mockapi.io/leaves';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Leave],
    });
    service = TestBed.inject(Leave);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load leaves and update signals accordingly', () => {
    const mockLeaves: ILeave[] = [
      {
        id: 1,
        type: 'Annual',
        date: '2024-10-01',
        reason: 'Vacation',
        status: 'Approved',
      },
      {
        id: 2,
        type: 'Sick',
        date: '2024-11-10',
        reason: 'Flu',
        status: 'Pending',
      },
    ];

    expect(service.loading()).toBe(false);
    expect(service.leaves()).toEqual([]);

    service.loadLeaves();

    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');

    req.flush(mockLeaves);

    expect(service.loading()).toBe(false);
    expect(service.leaves()).toEqual(mockLeaves);
  });

  it('should handle error in loadLeaves and set leaves to empty array', () => {
    service.loadLeaves();

    const req = httpMock.expectOne(api);
    req.error(new ErrorEvent('Network error'));

    expect(service.loading()).toBe(false);
    expect(service.leaves()).toEqual([]);
  });

  it('should add leave and update leaves signal', () => {
    const initialLeaves: ILeave[] = [
      {
        id: 1,
        type: 'Annual',
        date: '2024-10-01',
        reason: 'Vacation',
        status: 'Approved',
      },
    ];
    service['_leaves'].set(initialLeaves);

    const newLeave: ILeave = {
      type: 'Casual',
      date: '2024-12-01',
      reason: 'Personal',
      status: 'Pending',
    };

    const returnedLeave = { ...newLeave, id: 2 };

    service.addLeave(newLeave);

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newLeave);

    req.flush(returnedLeave);

    const updatedLeaves = service.leaves();
    expect(updatedLeaves.length).toBe(2);
    expect(updatedLeaves.find((l) => l.id === returnedLeave.id)).toEqual({
      ...newLeave,
      id: returnedLeave.id,
      status: 'Pending',
    });
  });

  it('should update leave and update leaves signal', () => {
    const initialLeaves: ILeave[] = [
      {
        id: 1,
        type: 'Annual',
        date: '2024-10-01',
        reason: 'Vacation',
        status: 'Approved',
      },
      {
        id: 2,
        type: 'Sick',
        date: '2024-11-10',
        reason: 'Flu',
        status: 'Pending',
      },
    ];
    service['_leaves'].set(initialLeaves);

    const changes: Partial<ILeave> = { status: 'Approved', reason: 'Medical update' };
    service.updateLeave(2, changes);

    const req = httpMock.expectOne(`${api}/2`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(changes);

    req.flush({}); // mock empty response

    const updatedLeaves = service.leaves();
    const updatedLeave = updatedLeaves.find((l) => l.id === 2);
    expect(updatedLeave).toEqual({ ...initialLeaves[1], ...changes });
  });

  it('should delete leave and update leaves signal', () => {
    const initialLeaves: ILeave[] = [
      {
        id: 1,
        type: 'Annual',
        date: '2024-10-01',
        reason: 'Vacation',
        status: 'Approved',
      },
      {
        id: 2,
        type: 'Sick',
        date: '2024-11-10',
        reason: 'Flu',
        status: 'Pending',
      },
    ];
    service['_leaves'].set(initialLeaves);

    service.deleteLeave(1);

    const req = httpMock.expectOne(`${api}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}); // mock empty response

    const updatedLeaves = service.leaves();
    expect(updatedLeaves.length).toBe(1);
    expect(updatedLeaves.find((l) => l.id === 1)).toBeUndefined();
  });
});
