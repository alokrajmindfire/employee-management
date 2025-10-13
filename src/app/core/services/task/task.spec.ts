import { TestBed } from '@angular/core/testing';
import { Task } from './task';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ITask } from '../../../types/task';
import { WritableSignal } from '@angular/core';

describe('Task', () => {
  let service: Task;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Task],
    });
    service = TestBed.inject(Task);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks and update loading and tasks signals', () => {
    const mockTasks: ITask[] = [
      { id: 1, userId: 1, title: 'Task 1', completed: false },
      { id: 2, userId: 1, title: 'Task 2', completed: true },
    ];

    expect(service.loading()).toBe(false);
    expect(service.tasks()).toEqual([]);

    service.loadTasks();
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos?_limit=10');
    expect(req.request.method).toBe('GET');

    req.flush(mockTasks);

    expect(service.loading()).toBe(false);
    expect(service.tasks()).toEqual(mockTasks);
  });

  it('should handle error in loadTasks and set tasks to empty array', () => {
    service.loadTasks();

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos?_limit=10');
    req.error(new ErrorEvent('Network error'));

    expect(service.loading()).toBe(false);
    expect(service.tasks()).toEqual([]);
  });

  it('should add task and update tasks signal', () => {
    const initialTasks: ITask[] = [{ id: 1, userId: 1, title: 'Existing Task', completed: false }];
    (service as unknown as { _tasks: WritableSignal<ITask[]> })._tasks.set(initialTasks);

    const newTitle = 'New Task';
    const returnedTask: ITask = { id: 2, userId: 1, title: newTitle, completed: false };

    service.addTask(newTitle);
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: newTitle, completed: false, userId: 1 });

    req.flush(returnedTask);

    expect(service.loading()).toBe(false);
    expect(service.tasks().length).toBe(2);
    expect(service.tasks().some((t) => t.id === 2 && t.title === newTitle)).toBeTrue();
  });

  it('should toggle task completed status and update tasks signal', () => {
    const initialTasks: ITask[] = [
      { id: 1, userId: 1, title: 'Task 1', completed: false },
      { id: 2, userId: 1, title: 'Task 2', completed: true },
    ];
    (service as unknown as { _tasks: WritableSignal<ITask[]> })._tasks.set(initialTasks);

    service.toggleTask(1);
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('PUT');

    // The updated task should have completed toggled from false to true
    expect(req.request.body.completed).toBe(true);

    req.flush({ ...req.request.body });

    expect(service.loading()).toBe(false);

    const updatedTask = service.tasks().find((t) => t.id === 1);
    expect(updatedTask?.completed).toBe(true);
  });

  it('should edit task title and update tasks signal', () => {
    const initialTasks: ITask[] = [{ id: 1, userId: 1, title: 'Old Title', completed: false }];
    (service as unknown as { _tasks: WritableSignal<ITask[]> })._tasks.set(initialTasks);

    const newTitle = 'Updated Title';
    service.editTask(1, newTitle);
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.title).toBe(newTitle);

    req.flush({ ...req.request.body });

    expect(service.loading()).toBe(false);

    expect(service.tasks()[0].title).toBe(newTitle);
  });

  it('should delete task and update tasks signal', () => {
    const initialTasks: ITask[] = [
      { id: 1, userId: 1, title: 'Task to delete', completed: false },
      { id: 2, userId: 1, title: 'Other Task', completed: true },
    ];
    (service as unknown as { _tasks: WritableSignal<ITask[]> })._tasks.set(initialTasks);

    service.deleteTask(1);
    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('DELETE');

    req.flush({});

    expect(service.loading()).toBe(false);
    expect(service.tasks().length).toBe(1);
    expect(service.tasks().find((t) => t.id === 1)).toBeUndefined();
  });

  it('should filter tasks correctly based on filter', () => {
    const mockTasks: ITask[] = [
      { id: 1, userId: 1, title: 'Task 1', completed: false },
      { id: 2, userId: 1, title: 'Task 2', completed: true },
      { id: 3, userId: 1, title: 'Task 3', completed: false },
    ];
    (service as unknown as { _tasks: WritableSignal<ITask[]> })._tasks.set(mockTasks);

    service.setFilter('all');
    expect(service.tasks().length).toBe(3);

    service.setFilter('completed');
    expect(service.tasks().every((t) => t.completed)).toBeTrue();

    service.setFilter('pending');
    expect(service.tasks().every((t) => !t.completed)).toBeTrue();
  });
});
