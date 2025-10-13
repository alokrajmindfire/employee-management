import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavePipe } from '../../../core/pipe/leave-pipe';
import { Leave } from '../../../core/services/leave/leave';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoleGuards } from '../../../core/guards/role/role-guards';
import { Loader } from '../../../component/loader/loader';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule, LeavePipe, FormsModule, RouterModule, Loader],
  templateUrl: './leave-list.html',
})
export class LeaveList implements OnInit {
  leaveService = inject(Leave);
  roleService = inject(RoleGuards);

  ngOnInit() {
    this.leaveService.loadLeaves();
  }

  approve(id: number) {
    if (!this.roleService.isAdmin()) return;
    this.leaveService.updateLeave(id, { status: 'Approved' });
  }

  reject(id: number) {
    if (!this.roleService.isAdmin()) return;
    this.leaveService.updateLeave(id, { status: 'Rejected' });
  }

  remove(id: number) {
    this.leaveService.deleteLeave(id);
  }
}
