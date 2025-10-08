import { Component, inject, signal } from '@angular/core';
import { Task } from '../../core/services/task/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
})
export class TaskList {
  editMode = signal<number | null>(null);
  editTitle = signal<string>('');

  store = inject(Task);

  startEdit(taskId: number, currentTitle: string) {
    this.editMode.set(taskId);
    this.editTitle.set(currentTitle);
  }

  saveEdit(taskId: number) {
    const newTitle = this.editTitle().trim();
    if (!newTitle) return;
    this.store.editTask(taskId, newTitle);
    this.cancelEdit();
  }

  cancelEdit() {
    this.editMode.set(null);
    this.editTitle.set('');
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.deleteTask(id);
    }
  }
}
