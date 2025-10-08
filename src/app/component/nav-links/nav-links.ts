import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
  icon: string;
}
@Component({
  selector: 'app-nav-links',
  imports: [RouterModule],
  templateUrl: './nav-links.html',
})
export class NavLinks {
  links: NavLink[] = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Tasks', path: '/task', icon: '📝' },
  ];
}
