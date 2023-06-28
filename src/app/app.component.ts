import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'bhavana';

  mostraMenu: boolean = false;

  constructor(private guard: AuthGuard) {}

  ngOnInit() {
    this.guard.menu.subscribe(
      mostrar => this.mostraMenu = mostrar 
    );
  }

}
