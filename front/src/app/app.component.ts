import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Jean-Louis';

  constructor() {
    interval(1000).subscribe((x) => {
      if (this.name === 'Jean-Louis') {
        this.name = 'Jean-Marc';
      } else {
        this.name = 'Jean-Louis';
      }
    });
  }
}
