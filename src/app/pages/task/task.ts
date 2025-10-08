import { Component, inject, OnInit } from '@angular/core';
import { TaskFilter } from '../../component/task-filter/task-filter';
import { TaskForm } from '../../component/task-form/task-form';
import { TaskList } from '../../component/task-list/task-list';
import { Task } from '../../core/services/task/task';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskList, TaskForm, TaskFilter],
  templateUrl: './task.html',
})
export class TasksPage implements OnInit {
  private store = inject(Task);
  ngOnInit() {
    this.store.loadTasks();
  }

  onFilterChange(filter: 'all' | 'completed' | 'pending') {
    this.store.setFilter(filter);
  }
}
