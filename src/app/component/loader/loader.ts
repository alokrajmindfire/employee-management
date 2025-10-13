import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
})
export class Loader {
  @Input() message = 'Loading...';
}
