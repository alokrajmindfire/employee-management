import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../core/services/task/task';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
})
export class TaskForm {
  title = signal('');

  private store = inject(Task);

  addTask() {
    if (!this.title().trim()) return;
    this.store.addTask(this.title());
    this.title.set('');
  }
}
