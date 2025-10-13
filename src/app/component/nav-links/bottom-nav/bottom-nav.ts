import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  icon: string;
}
@Component({
  selector: 'app-bottom-nav',
  imports: [RouterModule],
  templateUrl: './bottom-nav.html',
})
export class BottomNav {
  links: NavLink[] = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Tasks', path: '/tasks', icon: '📝' },
    { label: 'Leave', path: '/leaves', icon: '📝' },
  ];
}
