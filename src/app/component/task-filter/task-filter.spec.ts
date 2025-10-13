import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFilter } from './task-filter';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskFilter', () => {
  let component: TaskFilter;
  let fixture: ComponentFixture<TaskFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilter, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
