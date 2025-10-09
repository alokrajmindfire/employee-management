import { Component } from '@angular/core';
import { NavLinks } from '../nav-links/nav-links';
import { UserMenu } from '../user-menu/user-menu';
import { Theme } from '../theme/theme';

@Component({
  selector: 'app-header',
  imports: [NavLinks, UserMenu, Theme],
  templateUrl: './header.html',
})
export class Header {}
