import { Component } from '@angular/core';
import { Header } from '../../component/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-protected-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './protected-layout.html',
})
export class ProtectedLayout {}
