import { Component } from '@angular/core';
import { NavLinks } from '../nav-links/nav-links';
import { UserMenu } from '../user-menu/user-menu';

@Component({
  selector: 'app-header',
  imports: [NavLinks, UserMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
