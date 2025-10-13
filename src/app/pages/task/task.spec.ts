import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPage } from './task';
import { Task } from '../../core/services/task/task';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let taskServiceSpy: jasmine.SpyObj<Task>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Task', ['loadTasks', 'setFilter']);

    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [{ provide: Task, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(Task) as jasmine.SpyObj<Task>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTasks on init', () => {
    component.ngOnInit();
    expect(taskServiceSpy.loadTasks).toHaveBeenCalled();
  });

  it('should call setFilter when onFilterChange is called', () => {
    component.onFilterChange('completed');
    expect(taskServiceSpy.setFilter).toHaveBeenCalledWith('completed');
  });
});
