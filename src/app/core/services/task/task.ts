import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../../../types/task';
import { catchError, finalize, tap } from 'rxjs';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Task {
  private http = inject(HttpClient);

  private _tasks = signal<ITask[]>([]);
  private _filter = signal<'all' | 'completed' | 'pending'>('all');
  private _loading = signal(false);

  readonly loading = this._loading.asReadonly();

  readonly tasks = computed(() => {
    const filter = this._filter();
    const tasks = this._tasks();
    switch (filter) {
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'pending':
        return tasks.filter((t) => !t.completed);
      default:
        return tasks;
    }
  });

  constructor() {
    effect(() => {
      console.log(`Current filter: ${this._filter()}`);
    });
  }

  loadTasks() {
    this._loading.set(true);
    this.http
      .get<ITask[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .pipe(
        tap((tasks) => this._tasks.set(tasks)),
        catchError((err) => {
          console.error('Error loading tasks', err);
          return of([]);
        }),
        finalize(() => this._loading.set(false)),
      )
      .subscribe();
  }

  addTask(title: string) {
    const newTask: Partial<ITask> = { title, completed: false, userId: 1 };
    this._loading.set(true);
    this.http
      .post<ITask>('https://jsonplaceholder.typicode.com/todos', newTask)
      .pipe(
        tap((task) => this._tasks.update((tasks) => [...tasks, task])),
        finalize(() => this._loading.set(false)),
        catchError((err) => {
          console.error('Error adding task', err);
          return of(null);
        }),
      )
      .subscribe();
  }

  toggleTask(id: number) {
    const task = this._tasks().find((t) => t.id === id);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };
    this._loading.set(true);

    this.http
      .put<ITask>(`https://jsonplaceholder.typicode.com/todos/${id}`, updated)
      .pipe(
        tap(() => this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? updated : t)))),
        finalize(() => this._loading.set(false)),
        catchError((err) => {
          console.error('Error toggling task', err);
          return of(null);
        }),
      )
      .subscribe();
  }

  deleteTask(id: number) {
    this._loading.set(true);
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        tap(() => this._tasks.update((tasks) => tasks.filter((t) => t.id !== id))),
        finalize(() => this._loading.set(false)),
        catchError((err) => {
          console.error('Error deleting task', err);
          return of(null);
        }),
      )
      .subscribe();
  }

  editTask(id: number, newTitle: string) {
    const task = this._tasks().find((t) => t.id === id);
    if (!task) return;

    const updated = { ...task, title: newTitle };
    this._loading.set(true);
    console.log('id', id);
    this.http
      .put<ITask>(`https://jsonplaceholder.typicode.com/todos/${id}`, updated)
      .pipe(
        tap(() => this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? updated : t)))),
        finalize(() => this._loading.set(false)),
        catchError((err) => {
          console.error('Error editing task', err);
          return of(null);
        }),
      )
      .subscribe();
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this._filter.set(filter);
  }

  get currentFilter() {
    return this._filter.asReadonly();
  }
}
