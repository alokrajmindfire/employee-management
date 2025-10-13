import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, finalize, of } from 'rxjs';
import { ILeave } from '../../../types/leave';
import { ToastService } from '../toast/toast.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Leave {
  private api = 'https://68e663b421dd31f22cc5668f.mockapi.io/leaves';
  private _leaves = signal<ILeave[]>([]);
  private _loading = signal(false);
  private http = inject(HttpClient);
  private toast = inject(ToastService);

  leaves = computed(() => this._leaves());
  loading = computed(() => this._loading());

  loadLeaves() {
    this._loading.set(true);
    this.http
      .get<ILeave[]>(this.api)
      .pipe(
        tap((res) => {
          this._leaves.set(res);
          this.toast.show('Leaves loaded successfully', 'success');
        }),
        catchError((err) => {
          this.toast.show('Failed to load leaves', 'error');
          console.error('Load error:', err);
          return of([]);
        }),
        finalize(() => this._loading.set(false)),
      )
      .subscribe();
  }

  addLeave(leave: ILeave) {
    this._loading.set(true);
    this.http
      .post<ILeave>(this.api, leave)
      .pipe(
        tap((res) => {
          this._leaves.update((leaves) => [...leaves, { ...leave, id: res.id, status: 'Pending' }]);
          this.toast.show('Leave added successfully!', 'success');
        }),
        catchError((err) => {
          this.toast.show('Error adding leave', 'error');
          console.error('Add error:', err);
          return of(null);
        }),
        finalize(() => this._loading.set(false)),
      )
      .subscribe();
  }

  updateLeave(id: number, changes: Partial<ILeave>) {
    this.http
      .put<ILeave>(`${this.api}/${id}`, changes)
      .pipe(
        tap(() => {
          this._leaves.update((leaves) =>
            leaves.map((l) => (l.id === id ? { ...l, ...changes } : l)),
          );
          this.toast.show('Leave updated successfully', 'success');
        }),
        catchError((err) => {
          this.toast.show('Error updating leave', 'error');
          console.error('Update error:', err);
          return of(null);
        }),
      )
      .subscribe();
  }

  deleteLeave(id: number) {
    this.http
      .delete(`${this.api}/${id}`)
      .pipe(
        tap(() => {
          this._leaves.update((leaves) => leaves.filter((l) => l.id !== id));
          this.toast.show('Leave deleted successfully', 'success');
        }),
        catchError((err) => {
          this.toast.show('Error deleting leave', 'error');
          console.error('Delete error:', err);
          return of(null);
        }),
      )
      .subscribe();
  }
}
