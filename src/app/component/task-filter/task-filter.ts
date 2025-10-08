import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Task } from '../../core/services/task/task';

@Component({
  selector: 'app-task-filter',
  imports: [TitleCasePipe],
  templateUrl: './task-filter.html',
})
export class TaskFilter {
  private store = inject(Task);
  @Output() filterChange = new EventEmitter<'all' | 'completed' | 'pending'>();

  filters: ('all' | 'completed' | 'pending')[] = ['all', 'completed', 'pending'];
  activeFilter = this.store.currentFilter;

  apply(filter: 'all' | 'completed' | 'pending') {
    this.filterChange.emit(filter);
  }
}
