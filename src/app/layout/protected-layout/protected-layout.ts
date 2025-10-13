import { Component } from '@angular/core';
import { Header } from '../../component/header/header';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from '../../component/nav-links/bottom-nav/bottom-nav';

@Component({
  selector: 'app-protected-layout',
  imports: [RouterOutlet, Header, BottomNav],
  templateUrl: './protected-layout.html',
})
export class ProtectedLayout {}
